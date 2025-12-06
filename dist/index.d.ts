import { default as default_2 } from 'react';
import { JSX } from 'react/jsx-runtime';

/**
 * Represents a single activity/event in the stream
 */
export declare interface ActivityEvent {
    /**
     * Unique identifier for the event
     */
    id: string | number;
    /**
     * Type/category of the event (e.g., 'commit', 'issue', 'pr', 'comment')
     */
    type: string;
    /**
     * Display title for the event
     */
    title: string;
    /**
     * Optional description or content
     */
    description?: string;
    /**
     * Timestamp of the event
     */
    timestamp: Date | string;
    /**
     * Icon to display (can be emoji, React node, or icon class)
     */
    icon?: default_2.ReactNode;
    /**
     * Optional metadata for the event (e.g., repository name, user, etc.)
     */
    metadata?: Record<string, unknown>;
    /**
     * Whether the event is initially expanded
     */
    initiallyExpanded?: boolean;
    /**
     * Child events for grouped activities
     */
    children?: ActivityEvent[];
}

export declare const ActivityIcons: {
    commit: default_2.FC<IconProps>;
    pr: default_2.FC<IconProps>;
    issue: default_2.FC<IconProps>;
    comment: default_2.FC<IconProps>;
    star: default_2.FC<IconProps>;
    fork: default_2.FC<IconProps>;
    merge: default_2.FC<IconProps>;
    release: default_2.FC<IconProps>;
    deploy: default_2.FC<IconProps>;
};

/**
 * Pagination configuration for loading more events
 */
export declare interface ActivityStreamPagination {
    currentPage: number;
    pageSize: number;
    totalItems?: number;
    hasMore?: boolean;
}

export declare const AlienIcon: default_2.FC<IconProps>;

/**
 * Convert blocks to HTML
 */
export declare function blocksToHTML(blocks: ContentBlock[]): string;

/**
 * Convert blocks to JSON string
 */
export declare function blocksToJSON(blocks: ContentBlock[]): string;

/**
 * Convert blocks to Markdown
 */
export declare function blocksToMarkdown(blocks: ContentBlock[]): string;

/**
 * Block types supported by the editor
 */
export declare type BlockType = 'paragraph' | 'heading1' | 'heading2' | 'heading3' | 'list' | 'quote' | 'code' | 'image' | 'container';

export declare const BriefcaseIcon: default_2.FC<IconProps>;

export declare const BugIcon: default_2.FC<IconProps>;

export declare const BuildIcon: default_2.FC<IconProps>;

export declare const BusinessIcons: {
    chart: default_2.FC<IconProps>;
    meeting: default_2.FC<IconProps>;
    document: default_2.FC<IconProps>;
    calendar: default_2.FC<IconProps>;
    briefcase: default_2.FC<IconProps>;
};

/**
 * A customizable button component
 */
export declare const Button: default_2.FC<ButtonProps>;

export declare interface ButtonProps extends default_2.ButtonHTMLAttributes<HTMLButtonElement> {
    /**
     * Variant style of the button
     */
    variant?: 'primary' | 'secondary' | 'outline';
    /**
     * Size of the button
     */
    size?: 'small' | 'medium' | 'large';
    /**
     * Button contents
     */
    children: default_2.ReactNode;
}

export declare const CalendarIcon: default_2.FC<IconProps>;

export declare const ChartIcon: default_2.FC<IconProps>;

export declare const CheckIcon: default_2.FC<IconProps>;

export declare const CloseIcon: default_2.FC<IconProps>;

export declare const CloudIcon: default_2.FC<IconProps>;

export declare const CodeIcon: default_2.FC<IconProps>;

/**
 * Represents a single option in the combo box
 */
export declare interface ComboBoxOption {
    /**
     * Unique value for this option
     */
    value: string | number;
    /**
     * Display label for this option
     */
    label: string;
    /**
     * Optional icon to display (can be a URL or React node)
     */
    icon?: default_2.ReactNode;
    /**
     * Whether this option is disabled/non-selectable (for headers/dividers)
     */
    disabled?: boolean;
    /**
     * Nesting level for hierarchical display (0 = root level)
     */
    level?: number;
    /**
     * Child options for tree/hierarchical structure
     */
    children?: ComboBoxOption[];
    /**
     * Optional custom data
     */
    data?: unknown;
}

export declare const CommentIcon: default_2.FC<IconProps>;

export declare const CommitIcon: default_2.FC<IconProps>;

/**
 * Container layout types
 */
export declare type ContainerLayout = 'plain' | 'columns' | 'grid' | 'cards';

/**
 * Individual content block
 */
export declare interface ContentBlock {
    id: string;
    type: BlockType;
    content: string;
    format?: TextFormat;
    layout?: ContainerLayout;
    children?: ContentBlock[];
    imageUrl?: string;
    imageAlt?: string;
}

export declare const DatabaseIcon: default_2.FC<IconProps>;

export declare const DeployIcon: default_2.FC<IconProps>;

export declare const DeploymentIcon: default_2.FC<IconProps>;

export declare const DevProcessIcons: {
    gitbranch: default_2.FC<IconProps>;
    prdraft: default_2.FC<IconProps>;
    testing: default_2.FC<IconProps>;
    deployment: default_2.FC<IconProps>;
    review: default_2.FC<IconProps>;
    build: default_2.FC<IconProps>;
};

export declare const DocumentIcon: default_2.FC<IconProps>;

export declare const DumbbellIcon: default_2.FC<IconProps>;

/**
 * Export format options
 */
export declare type ExportFormat = 'json' | 'html' | 'markdown';

export declare const FitnessIcons: {
    dumbbell: default_2.FC<IconProps>;
    running: default_2.FC<IconProps>;
    heartrate: default_2.FC<IconProps>;
    strength: default_2.FC<IconProps>;
};

export declare const FoldIcon: default_2.FC<IconProps>;

export declare const ForkIcon: default_2.FC<IconProps>;

export declare const GitBranchIcon: default_2.FC<IconProps>;

/**
 * Action button configuration
 */
export declare interface GridActionButton {
    /**
     * Button label
     */
    label: string;
    /**
     * Button variant (using Button component variants)
     */
    variant?: 'primary' | 'secondary' | 'outline';
    /**
     * Click handler for the button
     */
    onClick: (selectedRows: Record<string, unknown>[]) => void;
    /**
     * Whether button is disabled
     */
    disabled?: boolean;
    /**
     * Only enable when rows are selected
     */
    requiresSelection?: boolean;
}

/**
 * Column definition for the grid
 */
export declare interface GridColumn<T = Record<string, unknown>> {
    /**
     * Unique identifier for the column
     */
    key: string;
    /**
     * Display header text for the column
     */
    header: string;
    /**
     * Field name in the data object
     */
    field?: keyof T;
    /**
     * Custom render function for the cell
     */
    render?: (value: unknown, row: T, rowIndex: number) => default_2.ReactNode;
    /**
     * Whether this column is editable
     */
    editable?: boolean;
    /**
     * Width of the column (CSS value)
     */
    width?: string;
    /**
     * Whether this column is sortable
     */
    sortable?: boolean;
}

/**
 * Pagination configuration
 */
export declare interface GridPaginationConfig {
    /**
     * Current page (0-indexed)
     */
    currentPage: number;
    /**
     * Number of items per page
     */
    pageSize: number;
    /**
     * Total number of items (for server-side pagination)
     */
    totalItems?: number;
    /**
     * Whether pagination is server-side
     */
    serverSide?: boolean;
}

export declare const HeartRateIcon: default_2.FC<IconProps>;

/**
 * UIForge Icon Library
 * A collection of monochrome SVG icons for use across UIForge components
 */
export declare interface IconProps {
    size?: number;
    className?: string;
    color?: string;
}

export declare const IssueIcon: default_2.FC<IconProps>;

export declare const MeditationIcon: default_2.FC<IconProps>;

export declare const MeetingIcon: default_2.FC<IconProps>;

export declare const MergeIcon: default_2.FC<IconProps>;

export declare const PlanetIcon: default_2.FC<IconProps>;

export declare const PullRequestDraftIcon: default_2.FC<IconProps>;

export declare const PullRequestIcon: default_2.FC<IconProps>;

export declare const ReleaseIcon: default_2.FC<IconProps>;

export declare const ReviewIcon: default_2.FC<IconProps>;

export declare const RocketIcon: default_2.FC<IconProps>;

export declare const RunningIcon: default_2.FC<IconProps>;

export declare const SatelliteIcon: default_2.FC<IconProps>;

export declare const ServerIcon: default_2.FC<IconProps>;

export declare const SpaceIcons: {
    rocket: default_2.FC<IconProps>;
    satellite: default_2.FC<IconProps>;
    alien: default_2.FC<IconProps>;
    planet: default_2.FC<IconProps>;
    telescope: default_2.FC<IconProps>;
};

export declare const StarIcon: default_2.FC<IconProps>;

export declare const StrengthIcon: default_2.FC<IconProps>;

export declare const TaiChiIcon: default_2.FC<IconProps>;

export declare const TechIcons: {
    server: default_2.FC<IconProps>;
    database: default_2.FC<IconProps>;
    cloud: default_2.FC<IconProps>;
    terminal: default_2.FC<IconProps>;
    bug: default_2.FC<IconProps>;
    code: default_2.FC<IconProps>;
};

export declare const TelescopeIcon: default_2.FC<IconProps>;

export declare const TerminalIcon: default_2.FC<IconProps>;

export declare const TestingIcon: default_2.FC<IconProps>;

/**
 * Text formatting styles
 */
export declare interface TextFormat {
    bold?: boolean;
    italic?: boolean;
    underline?: boolean;
    code?: boolean;
}

/**
 * A GitHub-inspired activity stream component with smart grouping, timeline, and theming
 */
export declare const UIForgeActivityStream: default_2.FC<UIForgeActivityStreamProps>;

/**
 * Props for the UIForgeActivityStream component
 */
export declare interface UIForgeActivityStreamProps {
    /**
     * Array of activity events to display
     */
    events: ActivityEvent[];
    /**
     * Theme variant ('light' or 'dark')
     */
    theme?: 'light' | 'dark';
    /**
     * Custom className for styling
     */
    className?: string;
    /**
     * Whether to show the "Show more" bar
     */
    showLoadMore?: boolean;
    /**
     * Loading state for async operations
     */
    loading?: boolean;
    /**
     * Callback when "Show more" is clicked or triggered
     */
    onLoadMore?: () => void;
    /**
     * Pagination configuration
     */
    pagination?: ActivityStreamPagination;
    /**
     * Maximum height of the stream container (CSS value)
     */
    maxHeight?: string;
    /**
     * Distance from bottom to trigger "Show more" visibility (in pixels)
     */
    showMoreThreshold?: number;
    /**
     * Whether all events should be initially expanded
     */
    initiallyExpandedAll?: boolean;
    /**
     * Empty state message
     */
    emptyMessage?: string;
    /**
     * Callback when an event is expanded/collapsed
     */
    onToggleExpand?: (eventId: string | number, expanded: boolean) => void;
    /**
     * Whether to enable automatic grouping of consecutive events
     */
    enableGrouping?: boolean;
    /**
     * Minimum number of consecutive events to trigger grouping
     */
    groupingThreshold?: number;
    /**
     * Whether to show date separators
     */
    showDateSeparators?: boolean;
    /**
     * Whether to show the timeline line
     */
    showTimeline?: boolean;
    /**
     * Global scale factor (density) for spacing and icon sizes in the stream.
     * Set to values like 0.8 for compact, 1 for default, 1.2 for spacious.
     */
    scale?: number;
    /**
     * Custom icon renderer
     */
    renderIcon?: (event: ActivityEvent) => default_2.ReactNode;
    /**
     * Custom event renderer
     */
    renderEvent?: (event: ActivityEvent) => default_2.ReactNode;
}

/**
 * UIForgeBlocksEditor - A rich, block-based content editor
 *
 * Enables users to format and position content with flexible layouts.
 * Supports multiple block types, drag-and-drop, WYSIWYG formatting,
 * and content export to JSON, HTML, or markdown.
 *
 * @example
 * ```tsx
 * import { UIForgeBlocksEditor } from '@chriscase/uiforge'
 *
 * function MyEditor() {
 *   const [blocks, setBlocks] = useState([])
 *
 *   return (
 *     <UIForgeBlocksEditor
 *       initialBlocks={blocks}
 *       onChange={setBlocks}
 *       placeholder="Start typing..."
 *     />
 *   )
 * }
 * ```
 */
export declare const UIForgeBlocksEditor: default_2.FC<UIForgeBlocksEditorProps>;

/**
 * Props for the UIForgeBlocksEditor component
 */
export declare interface UIForgeBlocksEditorProps {
    /**
     * Initial blocks to display
     */
    initialBlocks?: ContentBlock[];
    /**
     * Callback when blocks change
     */
    onChange?: (blocks: ContentBlock[]) => void;
    /**
     * Placeholder text for empty editor
     */
    placeholder?: string;
    /**
     * Whether the editor is read-only
     */
    readOnly?: boolean;
    /**
     * Custom CSS class name
     */
    className?: string;
    /**
     * Maximum height of the editor (CSS value)
     */
    maxHeight?: string;
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
export declare const UIForgeComboBox: default_2.FC<UIForgeComboBoxProps>;

/**
 * Props for the UIForgeComboBox component
 */
export declare interface UIForgeComboBoxProps {
    /**
     * Static list of options
     */
    options?: ComboBoxOption[];
    /**
     * Selected value
     */
    value?: string | number | null;
    /**
     * Callback when selection changes
     */
    onChange?: (value: string | number | null, option: ComboBoxOption | null) => void;
    /**
     * Async callback for dynamic suggestions (receives search text)
     */
    onSearch?: (searchText: string, signal?: AbortSignal) => Promise<ComboBoxOption[]>;
    /**
     * Placeholder text
     */
    placeholder?: string;
    /**
     * Whether the combo box is disabled
     */
    disabled?: boolean;
    /**
     * Whether to allow clearing the selection
     */
    clearable?: boolean;
    /**
     * Custom class name
     */
    className?: string;
    /**
     * Custom rendering for options
     */
    renderOption?: (option: ComboBoxOption) => default_2.ReactNode;
    /**
     * Custom rendering for selected value
     */
    renderValue?: (option: ComboBoxOption | null) => default_2.ReactNode;
    /**
     * Loading state
     */
    loading?: boolean;
    /**
     * Maximum height for dropdown (CSS value)
     */
    maxHeight?: string;
    /**
     * Debounce delay for async search (ms)
     */
    debounceMs?: number;
    /**
     * Whether to show the search/filter input
     */
    searchable?: boolean;
    /**
     * Whether to cache identical search results in-memory (per component instance)
     */
    enableCache?: boolean;
    /**
     * Time-to-live for cached entries in milliseconds (default: no expiration)
     */
    cacheTTL?: number;
    /**
     * Whether to refresh results on dropdown open even if search text hasn't changed
     */
    refreshOnOpen?: boolean;
    /**
     * Callback to clear the internal cache (call this function to clear)
     */
    onClearCache?: (clearFn: () => void) => void;
    /**
     * Callback to receive a function to force refresh current search
     */
    onForceRefresh?: (forceFn: () => void) => void;
    /**
     * Message to show when no options match
     */
    noOptionsMessage?: string;
    /**
     * ARIA label for accessibility
     */
    ariaLabel?: string;
}

/**
 * UIForgeGrid - A feature-rich data grid component
 */
export declare const UIForgeGrid: <T extends Record<string, unknown>>({ columns, data, selectable, selectedRows: controlledSelectedRows, getRowKey, onSelectionChange, onCellEdit, actionButtons, searchable, searchPlaceholder, onSearch, customFilter, pagination, onPageChange, onPageSizeChange, pageSizeOptions, className, loading, emptyMessage, }: UIForgeGridProps<T>) => JSX.Element;

/**
 * Props for the UIForgeGrid component
 */
export declare interface UIForgeGridProps<T = Record<string, unknown>> {
    /**
     * Column definitions
     */
    columns: GridColumn<T>[];
    /**
     * Data to display in the grid
     */
    data: T[];
    /**
     * Enable row selection
     */
    selectable?: boolean;
    /**
     * Currently selected row keys
     */
    selectedRows?: Set<string | number>;
    /**
     * Function to get unique key from row data
     */
    getRowKey?: (row: T, index: number) => string | number;
    /**
     * Called when selection changes
     */
    onSelectionChange?: (selectedKeys: Set<string | number>, selectedRows: T[]) => void;
    /**
     * Called when a cell is edited
     */
    onCellEdit?: (rowKey: string | number, columnKey: string, newValue: unknown, row: T) => void;
    /**
     * Action buttons to display
     */
    actionButtons?: GridActionButton[];
    /**
     * Enable search functionality
     */
    searchable?: boolean;
    /**
     * Search placeholder text
     */
    searchPlaceholder?: string;
    /**
     * Called when search value changes
     */
    onSearch?: (searchTerm: string) => void;
    /**
     * Custom filter function
     */
    customFilter?: (row: T, searchTerm: string) => boolean;
    /**
     * Pagination configuration
     */
    pagination?: GridPaginationConfig;
    /**
     * Called when page changes
     */
    onPageChange?: (page: number, pageSize: number) => void;
    /**
     * Called when page size changes
     */
    onPageSizeChange?: (pageSize: number) => void;
    /**
     * Available page sizes
     */
    pageSizeOptions?: number[];
    /**
     * Additional CSS class names
     */
    className?: string;
    /**
     * Whether the grid is in loading state
     */
    loading?: boolean;
    /**
     * Message to display when no data
     */
    emptyMessage?: string;
}

export declare const UIIcons: {
    unfold: default_2.FC<IconProps>;
    fold: default_2.FC<IconProps>;
    close: default_2.FC<IconProps>;
    check: default_2.FC<IconProps>;
};

export declare const UnfoldIcon: default_2.FC<IconProps>;

export declare const WellnessIcons: {
    taichi: default_2.FC<IconProps>;
    meditation: default_2.FC<IconProps>;
    yoga: default_2.FC<IconProps>;
};

export declare const YogaIcon: default_2.FC<IconProps>;

export { }
