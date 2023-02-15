module.exports = {
    stories: ['../**/*.stories.mdx', '../**/*.stories.@(js|jsx|ts|tsx)'],
    /** Expose public folder to storybook as static */
    staticDirs: ['../public'],
    addons: [
      '@storybook/addon-links',
      '@storybook/addon-essentials',
      '@storybook/addon-interactions',
      'storybook-css-modules-preset',
      '@chakra-ui/storybook-addon',
      {
        /**
         * Fix Storybook issue with PostCSS@8
         * @see https://github.com/storybookjs/storybook/issues/12668#issuecomment-773958085
         */
        name: '@storybook/addon-postcss',
        options: {
          postcssLoaderOptions: {
            implementation: require('postcss'),
          },
        },
      },
    ],
    framework: '@storybook/react',
    features: {
        emotionAlias: false,
    },
    webpackFinal: async (config) => {
        config.module.rules.push({
          test: /\.mjs$/,
          include: /node_modules/,
          type: 'javascript/auto',
        })
        return config
      },
    core: {
      builder: '@storybook/builder-webpack5',
    },
  };