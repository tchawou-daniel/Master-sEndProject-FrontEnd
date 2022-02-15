module.exports = {
  stories: ['../src/**/*.stories.tsx'],
  addons: ['@storybook/addon-essentials', '@storybook/preset-create-react-app', '@storybook/addon-actions', "@storybook/addon-links"],
  reactDocgen: 'none',
  typescript: {
    reactDocgen: 'none'
  }
};
