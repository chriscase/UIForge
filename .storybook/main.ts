import type { StorybookConfig } from '@storybook/react-vite'

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-docs',
    '@storybook/addon-a11y',
    '@storybook/addon-onboarding',
    '@chromatic-com/storybook',
  ],
  framework: '@storybook/react-vite',
  viteFinal: async (config) => {
    // Remove vite-plugin-dts from storybook builds since it's only needed for library builds
    config.plugins = (config.plugins || []).filter((plugin) => {
      if (plugin && typeof plugin === 'object' && 'name' in plugin) {
        return plugin.name !== 'vite:dts'
      }
      return true
    })
    // Remove library build config
    if (config.build) {
      delete config.build.lib
      delete config.build.rollupOptions
    }
    return config
  },
}
export default config
