module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials', '@luigiminardim/storybook-addon-globals-controls'],
  framework: '@storybook/web-components',
  staticDirs: ['../www'],
};
