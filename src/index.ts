// Export components
export { Button } from './components/Button'
export type { ButtonProps } from './components/Button'

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

// Export all styles
import './components/Tokens.css'
import './components/Button.css'
import './components/Grid.css'
import './components/BlocksEditor.css'
import './components/ComboBox.css'
import './components/ActivityStream.css'
import './components/ActivityItem.css'
import './components/Video.css'
import './components/Sidebar.css'
