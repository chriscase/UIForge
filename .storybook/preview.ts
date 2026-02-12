import type { Preview } from '@storybook/react-vite'

// Import design tokens and all component styles
import '../src/components/Tokens.css'
import '../src/components/Button.css'
import '../src/components/HamburgerButton.css'
import '../src/components/IconButton.css'
import '../src/components/Grid.css'
import '../src/components/BlocksEditor.css'
import '../src/components/ComboBox.css'
import '../src/components/ActivityStream.css'
import '../src/components/ActivityItem.css'
import '../src/components/Video.css'
import '../src/components/Sidebar.css'
import '../src/components/SafeAreaContainer.css'
import '../src/components/MobileHeaderLayout.css'
import '../src/components/OverflowMenu.css'
import '../src/components/MediaCard.css'
import '../src/components/MediaPlaceholder.css'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: 'todo',
    },
  },
}

export default preview
