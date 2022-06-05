/* eslint-disable */

const {
  override,
  useBabelRc,
} = require('customize-cra');
const path = require('path')

/**
 * Little helper that remove webpack plugins.
 *
 * @param config - Webpack original config.
 * @param pluginsToRemove - List of plugins to remove.
 * @returns - New plugin list.
 */
const removePlugins = (config, pluginsToRemove) => config.plugins.filter(plugin => !pluginsToRemove.includes(plugin.constructor.name));

module.exports = override(
  (config) =>  ({
    ...config,
    plugins: removePlugins(config, [
      // Disable ESlint while building since it's verified on another branch of the pipeline.
      'ESLintWebpackPlugin',
    ]),
    module: {
      ...config.module,
      rules: [
        ...config.module.rules,
        {
          test: /\.intl.json$/i,
          use: [
            {
              // Compile messages to AST for react-intl.
              loader: path.resolve(__dirname, './scripts/compileReactIntlMessagesLoader'),
            }
          ],
        }
      ]
    }
  }),
  useBabelRc(),
);
