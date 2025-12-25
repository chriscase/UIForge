import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import './ComboBox.css'

/**
 * Represents a single option in the combo box
 */
export interface ComboBoxOption {
  /**
   * Unique value for this option
   */
  value: string | number
  /**
   * Display label for this option
   */
  label: string
  /**
   * Optional icon to display (can be a URL or React node)
   */
  icon?: React.ReactNode
  /**
   * Whether this option is disabled/non-selectable (for headers/dividers)
   */
  disabled?: boolean
  /**
   * Nesting level for hierarchical display (0 = root level)
   */
  level?: number
  /**
   * Child options for tree/hierarchical structure
   */
  children?: ComboBoxOption[]
  /**
   * Optional custom data
   */
  data?: unknown
}

/**
 * Props for the UIForgeComboBox component
 */
export interface UIForgeComboBoxProps {
  /**
   * Static list of options
   */
  options?: ComboBoxOption[]
  /**
   * Selected value
   */
  value?: string | number | null
  /**
   * Callback when selection changes
   */
  onChange?: (value: string | number | null, option: ComboBoxOption | null) => void
  /**
   * Async callback for dynamic suggestions (receives search text)
   */
  // onSearch optionally accepts an AbortSignal to allow cancellation of inflight requests
  onSearch?: (searchText: string, signal?: AbortSignal) => Promise<ComboBoxOption[]>
  /**
   * Theme variant ('light' or 'dark')
   */
  theme?: 'light' | 'dark'
  /**
   * Placeholder text
   */
  placeholder?: string
  /**
   * Whether the combo box is disabled
   */
  disabled?: boolean
  /**
   * Whether to allow clearing the selection
   */
  clearable?: boolean
  /**
   * Custom class name
   */
  className?: string
  /**
   * Custom rendering for options
   */
  renderOption?: (option: ComboBoxOption) => React.ReactNode
  /**
   * Custom rendering for selected value
   */
  renderValue?: (option: ComboBoxOption | null) => React.ReactNode
  /**
   * Loading state
   */
  loading?: boolean
  /**
   * Maximum height for dropdown (CSS value)
   */
  maxHeight?: string
  /**
   * Debounce delay for async search (ms)
   */
  debounceMs?: number
  /**
   * Whether to show the search/filter input
   */
  searchable?: boolean
  /**
   * Whether to cache identical search results in-memory (per component instance)
   */
  enableCache?: boolean
  /**
   * Time-to-live for cached entries in milliseconds (default: no expiration)
   */
  cacheTTL?: number
  /**
   * Whether to refresh results on dropdown open even if search text hasn't changed
   */
  refreshOnOpen?: boolean
  /**
   * Callback to clear the internal cache (call this function to clear)
   */
  onClearCache?: (clearFn: () => void) => void
  /**
   * Callback to receive a function to force refresh current search
   */
  onForceRefresh?: (forceFn: () => void) => void
  /**
   * Message to show when no options match
   */
  noOptionsMessage?: string
  /**
   * ARIA label for accessibility
   */
  ariaLabel?: string
}

/**
 * UIForgeComboBox - A rich, powerful select/combo box component
 *
 * Features:
 * - Static and dynamic data support
 * - Icons per option
 * - Hierarchical/tree view
 * - Non-selectable headers
 * - Async callback support
 * - Keyboard navigation
 * - Accessibility (ARIA)
 */
export const UIForgeComboBox: React.FC<UIForgeComboBoxProps> = ({
  options = [],
  value,
  onChange,
  onSearch,
  theme = 'light',
  placeholder = 'Select an option...',
  disabled = false,
  clearable = false,
  className = '',
  renderOption,
  renderValue,
  loading = false,
  maxHeight = '300px',
  debounceMs = 300,
  searchable = true,
  noOptionsMessage = 'No options found',
  ariaLabel,
  enableCache = false,
  cacheTTL,
  refreshOnOpen = false,
  onClearCache,
  onForceRefresh,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [searchText, setSearchText] = useState('')
  const [filteredOptions, setFilteredOptions] = useState<ComboBoxOption[]>([])
  const [highlightedIndex, setHighlightedIndex] = useState(0)
  const [asyncLoading, setAsyncLoading] = useState(false)

  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const lastSearchTextRef = useRef<string | null>(null)
  const onSearchRef = useRef(onSearch)
  const controllerRef = useRef<AbortController | null>(null)
  const prevIsOpenRef = useRef<boolean>(false)
  // Cache stores { data, timestamp } for TTL support
  const cacheRef = useRef<Map<string, { data: ComboBoxOption[]; timestamp: number }>>(new Map())
  const enableCacheRef = useRef<boolean>(enableCache)
  const cacheTTLRef = useRef<number | undefined>(cacheTTL)

  // Flatten hierarchical options for easier navigation
  const flattenOptions = useCallback((opts: ComboBoxOption[], level = 0): ComboBoxOption[] => {
    return opts.reduce<ComboBoxOption[]>((acc, opt) => {
      const flatOption = { ...opt, level }
      acc.push(flatOption)
      if (opt.children && opt.children.length > 0) {
        acc.push(...flattenOptions(opt.children, level + 1))
      }
      return acc
    }, [])
  }, [])

  // Helper to check if icon is a URL
  const isIconUrl = (icon: React.ReactNode): boolean => {
    return (
      typeof icon === 'string' &&
      (icon.startsWith('http://') ||
        icon.startsWith('https://') ||
        icon.startsWith('data:') ||
        icon.startsWith('/'))
    )
  }

  // Get the selected option
  const selectedOption = useMemo(() => {
    const allOptions = flattenOptions(filteredOptions.length > 0 ? filteredOptions : options)
    return allOptions.find((opt) => opt.value === value) || null
  }, [value, options, filteredOptions, flattenOptions])

  // Filter options based on search text
  const filterOptions = useCallback((opts: ComboBoxOption[], text: string): ComboBoxOption[] => {
    if (!text.trim()) return opts

    const lowerText = text.toLowerCase()

    const filterRecursive = (options: ComboBoxOption[]): ComboBoxOption[] => {
      return options.reduce<ComboBoxOption[]>((acc, opt) => {
        const matches = opt.label.toLowerCase().includes(lowerText)
        const childMatches = opt.children ? filterRecursive(opt.children) : []

        if (matches || childMatches.length > 0) {
          acc.push({
            ...opt,
            children: childMatches.length > 0 ? childMatches : opt.children,
          })
        }

        return acc
      }, [])
    }

    return filterRecursive(opts)
  }, [])

  // Keep a stable ref to onSearch and only trigger fetches when the search text actually changes
  useEffect(() => {
    onSearchRef.current = onSearch
    lastSearchTextRef.current = null
  }, [onSearch])

  // Keep a stable ref for enableCache value
  useEffect(() => {
    enableCacheRef.current = enableCache
  }, [enableCache])

  // Keep a stable ref for cacheTTL value
  useEffect(() => {
    cacheTTLRef.current = cacheTTL
  }, [cacheTTL])

  // Provide clearCache function to parent via callback
  useEffect(() => {
    if (onClearCache) {
      onClearCache(() => {
        cacheRef.current.clear()
      })
    }
    if (onForceRefresh) {
      onForceRefresh(() => {
        // Simple force refresh: abort and trigger a new search immediately
        if (!onSearchRef.current) return
        if (controllerRef.current) controllerRef.current.abort()
        controllerRef.current = new AbortController()
        const signal = controllerRef.current.signal
        setAsyncLoading(true)
        ;(async () => {
          try {
            const now = Date.now()
            const cacheKey = searchText
            const cachedEntry = cacheRef.current.get(cacheKey)
            const isCacheValid =
              cachedEntry &&
              (!cacheTTLRef.current || now - cachedEntry.timestamp < cacheTTLRef.current)
            let results: ComboBoxOption[]
            if (enableCacheRef.current && isCacheValid) {
              results = cachedEntry!.data
            } else {
              results = await (onSearchRef.current
                ? onSearchRef.current(searchText, signal)
                : (onSearch?.(searchText, signal) ?? []))
              if (!signal.aborted && enableCacheRef.current) {
                cacheRef.current.set(cacheKey, { data: results, timestamp: now })
              }
            }
            if (!signal.aborted) {
              setFilteredOptions(results)
              lastSearchTextRef.current = searchText
            }
          } catch (err) {
            console.error(err)
            setFilteredOptions([])
          } finally {
            setAsyncLoading(false)
          }
        })()
      })
    }
  }, [onClearCache, onForceRefresh, searchText, onSearch])

  // Handle async search with debounce
  useEffect(() => {
    if (onSearch && isOpen) {
      // If we've already searched for the same text, don't re-run the search
      const skipDueToSameText = lastSearchTextRef.current === searchText
      // If refreshOnOpen is enabled and dropdown is opening, we should still re-run the search
      const isOpening = !prevIsOpenRef.current && isOpen
      const allowRefreshOnOpen = refreshOnOpen && isOpening
      if (skipDueToSameText && !allowRefreshOnOpen) return
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current)
      }

      debounceTimerRef.current = setTimeout(async () => {
        // Abort previous in-flight request
        if (controllerRef.current) {
          controllerRef.current.abort()
        }
        controllerRef.current = new AbortController()
        const signal = controllerRef.current.signal
        setAsyncLoading(true)
        try {
          // Check cache first
          let results: ComboBoxOption[] | undefined
          const cacheKey = searchText
          const cachedEntry = cacheRef.current.get(cacheKey)
          const now = Date.now()
          const isCacheValid =
            cachedEntry &&
            (!cacheTTLRef.current || now - cachedEntry.timestamp < cacheTTLRef.current)
          if (enableCacheRef.current && isCacheValid) {
            results = cachedEntry.data
          } else {
            results = await (onSearchRef.current
              ? onSearchRef.current(searchText, signal)
              : onSearch(searchText, signal))
            if (!signal.aborted && enableCacheRef.current) {
              cacheRef.current.set(cacheKey, { data: results, timestamp: now })
            }
          }
          // Skip applying results if the request was aborted
          if (signal.aborted) return
          setFilteredOptions(results)
          lastSearchTextRef.current = searchText
        } catch (error) {
          console.error('Error fetching options:', error)
          setFilteredOptions([])
        } finally {
          setAsyncLoading(false)
        }
      }, debounceMs)

      return () => {
        if (debounceTimerRef.current) {
          clearTimeout(debounceTimerRef.current)
        }
        // Abort in-flight controller when effect is cleaned up
        if (controllerRef.current) {
          controllerRef.current.abort()
          controllerRef.current = null
        }
      }
    } else if (!onSearch) {
      setFilteredOptions(filterOptions(options, searchText))
    }
    prevIsOpenRef.current = isOpen
  }, [searchText, isOpen, options, debounceMs, filterOptions, refreshOnOpen, onSearch])

  // Initialize filtered options
  useEffect(() => {
    if (!onSearch) {
      setFilteredOptions(options)
    }
  }, [options, onSearch])

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
        setSearchText('')
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Flatten current options for keyboard navigation
  const flatOptions = useMemo(() => {
    const opts = flattenOptions(filteredOptions.length > 0 ? filteredOptions : options)
    return opts.filter((opt) => !opt.disabled)
  }, [filteredOptions, options, flattenOptions])

  // Memoize flattened options for rendering (includes disabled options)
  const flatOptionsForRender = useMemo(() => {
    return flattenOptions(filteredOptions.length > 0 ? filteredOptions : options)
  }, [filteredOptions, options, flattenOptions])

  // Create index mapping for performance in render loop
  const optionIndexMap = useMemo(() => {
    const map = new Map<string, number>()
    flatOptionsForRender.forEach((opt) => {
      // Use JSON.stringify for robust key generation to avoid collisions
      const key = JSON.stringify({ value: opt.value, label: opt.label })
      const selectableIdx = flatOptions.findIndex(
        (fo) => fo.value === opt.value && fo.label === opt.label
      )
      map.set(key, selectableIdx)
    })
    return map
  }, [flatOptionsForRender, flatOptions])

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        if (!isOpen) {
          setIsOpen(true)
        } else {
          setHighlightedIndex((prev) => (prev < flatOptions.length - 1 ? prev + 1 : 0))
        }
        break
      case 'ArrowUp':
        e.preventDefault()
        if (isOpen) {
          setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : flatOptions.length - 1))
        }
        break
      case 'Enter':
        e.preventDefault()
        if (isOpen && flatOptions[highlightedIndex]) {
          handleSelectOption(flatOptions[highlightedIndex])
        } else {
          setIsOpen(!isOpen)
        }
        break
      case 'Escape':
        e.preventDefault()
        setIsOpen(false)
        setSearchText('')
        break
      case 'Tab':
        if (isOpen) {
          setIsOpen(false)
          setSearchText('')
        }
        break
    }
  }

  // Scroll highlighted option into view
  useEffect(() => {
    if (isOpen && dropdownRef.current) {
      const highlightedElement = dropdownRef.current.querySelector(
        `[data-index="${highlightedIndex}"]`
      )
      if (highlightedElement && typeof highlightedElement.scrollIntoView === 'function') {
        highlightedElement.scrollIntoView({ block: 'nearest' })
      }
    }
  }, [highlightedIndex, isOpen])

  const handleSelectOption = (option: ComboBoxOption) => {
    if (option.disabled) return

    onChange?.(option.value, option)
    setIsOpen(false)
    setSearchText('')
    setHighlightedIndex(0)
  }

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation()
    onChange?.(null, null)
    setSearchText('')
  }

  const handleToggle = () => {
    if (disabled) return
    setIsOpen((prev) => {
      const newOpen = !prev
      if (newOpen) setTimeout(() => inputRef.current?.focus(), 0)
      return newOpen
    })
  }

  // Reset last search text when dropdown closes so opening it later will re-run the search
  useEffect(() => {
    if (!isOpen) {
      lastSearchTextRef.current = null
    }
  }, [isOpen])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value)
    if (!isOpen) {
      setIsOpen(true)
    }
    setHighlightedIndex(0)
  }

  const renderDefaultOption = (option: ComboBoxOption) => {
    const indent = (option.level || 0) * 20

    return (
      <div className="uiforge-combobox-option-content" style={{ paddingLeft: `${indent}px` }}>
        {option.icon && (
          <span className="uiforge-combobox-option-icon">
            {isIconUrl(option.icon) ? (
              <img
                src={option.icon as string}
                alt=""
                className="uiforge-combobox-option-icon-img"
              />
            ) : (
              option.icon
            )}
          </span>
        )}
        <span className="uiforge-combobox-option-label">{option.label}</span>
      </div>
    )
  }

  const renderDefaultValue = (option: ComboBoxOption | null) => {
    if (!option) return placeholder

    return (
      <div className="uiforge-combobox-value-content">
        {option.icon && (
          <span className="uiforge-combobox-value-icon">
            {isIconUrl(option.icon) ? (
              <img src={option.icon as string} alt="" className="uiforge-combobox-value-icon-img" />
            ) : (
              option.icon
            )}
          </span>
        )}
        <span className="uiforge-combobox-value-label">{option.label}</span>
      </div>
    )
  }

  const baseClass = 'uiforge-combobox'
  const themeClass = `${baseClass}--${theme}`
  const containerClasses = [
    baseClass,
    themeClass,
    isOpen && `${baseClass}--open`,
    disabled && `${baseClass}--disabled`,
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div
      ref={containerRef}
      className={containerClasses}
      onKeyDown={handleKeyDown}
      role="combobox"
      aria-expanded={isOpen}
      aria-haspopup="listbox"
      aria-label={ariaLabel}
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : 0}
      data-theme={theme}
    >
      <div className={`${baseClass}-control`} onClick={handleToggle}>
        {searchable && isOpen ? (
          <input
            ref={inputRef}
            type="text"
            className={`${baseClass}-input`}
            value={searchText}
            onChange={handleInputChange}
            placeholder={placeholder}
            disabled={disabled}
            aria-autocomplete="list"
            aria-controls={`${baseClass}-listbox`}
          />
        ) : (
          <div className={`${baseClass}-value`}>
            {renderValue ? renderValue(selectedOption) : renderDefaultValue(selectedOption)}
          </div>
        )}

        <div className={`${baseClass}-indicators`}>
          {clearable && value !== null && value !== undefined && !disabled && (
            <button
              type="button"
              className={`${baseClass}-clear`}
              onClick={handleClear}
              aria-label="Clear selection"
              tabIndex={-1}
            >
              ×
            </button>
          )}
          <span className={`${baseClass}-arrow`}>▼</span>
        </div>
      </div>

      {isOpen && (
        <div
          ref={dropdownRef}
          className={`${baseClass}-dropdown`}
          style={{ maxHeight }}
          role="listbox"
          id={`${baseClass}-listbox`}
        >
          {loading || asyncLoading ? (
            <div className={`${baseClass}-loading`}>Loading...</div>
          ) : flatOptions.length === 0 ? (
            <div className={`${baseClass}-no-options`}>{noOptionsMessage}</div>
          ) : (
            flatOptionsForRender.map((option) => {
              const optionKey = JSON.stringify({ value: option.value, label: option.label })
              const selectableIndex = optionIndexMap.get(optionKey) ?? -1
              const isSelected = option.value === value
              const isHighlighted = selectableIndex === highlightedIndex

              const optionClasses = [
                `${baseClass}-option`,
                isSelected && `${baseClass}-option--selected`,
                isHighlighted && `${baseClass}-option--highlighted`,
                option.disabled && `${baseClass}-option--disabled`,
              ]
                .filter(Boolean)
                .join(' ')

              return (
                <div
                  key={optionKey}
                  className={optionClasses}
                  onClick={() => handleSelectOption(option)}
                  role="option"
                  aria-selected={isSelected}
                  aria-disabled={option.disabled}
                  data-index={selectableIndex}
                >
                  {renderOption ? renderOption(option) : renderDefaultOption(option)}
                </div>
              )
            })
          )}
        </div>
      )}
    </div>
  )
}
