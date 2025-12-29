// Export components
export { Button } from './components/Button'
export type { ButtonProps, ButtonDensity } from './components/Button'

export { HamburgerButton } from './components/HamburgerButton'
export type { HamburgerButtonProps } from './components/HamburgerButton'

export { IconButton } from './components/IconButton'
export type { IconButtonProps } from './components/IconButton'

export { UIForgeGrid } from './components/Grid'
export type {
  UIForgeGridProps,
  GridColumn,
  GridActionButton,
  GridPaginationConfig,
} from './components/Grid'

export { UIForgeBlocksEditor } from './components/BlocksEditor'
export type {
  UIForgeBlocksEditorProps,
  ContentBlock,
  BlockType,
  ContainerLayout,
  TextFormat,
  ExportFormat,
} from './components/BlocksEditor'

export { blocksToHTML, blocksToMarkdown, blocksToJSON } from './components/BlocksEditorUtils'

export { UIForgeComboBox } from './components/ComboBox'
export type { UIForgeComboBoxProps, ComboBoxOption } from './components/ComboBox'

export { UIForgeActivityStream } from './components/ActivityStream'
export type {
  UIForgeActivityStreamProps,
  ActivityEvent,
  ActivityStreamPagination,
  ActivityStreamDensity,
} from './components/ActivityStream'

export {
  UIForgeActivityItem,
  ActivityItemProvider,
  useActivityItemContext,
} from './components/ActivityItem'
export type {
  UIForgeActivityItemProps,
  ActivityItemEvent,
  ActivityItemContextValue,
} from './components/ActivityItem'

export { UIForgeVideo, UIForgeVideoPreview } from './components/Video'
export type { UIForgeVideoProps, UIForgeVideoPreviewProps } from './components/Video'

export { UIForgeSidebar } from './components/Sidebar'
export type { UIForgeSidebarProps, SidebarVariant } from './components/Sidebar'

export { SafeAreaContainer } from './components/SafeAreaContainer'
export type { SafeAreaContainerProps } from './components/SafeAreaContainer'

export { MobileHeaderLayout } from './components/MobileHeaderLayout'
export type { MobileHeaderLayoutProps } from './components/MobileHeaderLayout'

export { OverflowMenu } from './components/OverflowMenu'
export type { OverflowMenuProps, OverflowMenuItem } from './components/OverflowMenu'

export { MediaCard } from './components/MediaCard'
export type { MediaCardProps } from './components/MediaCard'

export { MediaPlaceholder } from './components/MediaPlaceholder'
export type { MediaPlaceholderProps } from './components/MediaPlaceholder'

// Export video utilities and providers
export {
  detectProvider,
  extractVideoId,
  getEmbedUrlFromVideoUrl,
  isAdultContent,
  videoProviders,
  providersByName,
} from './video'
export type { VideoProvider, EmbedOptions, VideoProviderTier } from './video'

// Export icon library
export * from './icons'

// Export hooks
export { useResponsive } from './hooks'
export { useDynamicPageCount } from './hooks'
export type { UseDynamicPageCountOptions } from './hooks'
export { useOptimizedImage } from './hooks'
export type { UseOptimizedImageOptions, UseOptimizedImageResult } from './hooks'

// Export all styles
import './components/Tokens.css'
import './components/Button.css'
import './components/HamburgerButton.css'
import './components/IconButton.css'
import './components/Grid.css'
import './components/BlocksEditor.css'
import './components/ComboBox.css'
import './components/ActivityStream.css'
import './components/ActivityItem.css'
import './components/Video.css'
import './components/Sidebar.css'
import './components/SafeAreaContainer.css'
import './components/MobileHeaderLayout.css'
import './components/OverflowMenu.css'
import './components/MediaCard.css'
import './components/MediaPlaceholder.css'
