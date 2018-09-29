const path = require('path');
const TSDocgenPlugin = require('react-docgen-typescript-webpack-plugin');
const webpack = require('webpack');

// you can use this file to add your custom webpack plugins, loaders and anything you like.
// This is just the basic way to add additional webpack configurations.
// For more information refer the docs: https://storybook.js.org/configurations/custom-webpack-config

// IMPORTANT
// When you add this file, we won't add the default configurations which is similar
// to "React Create App". This only has babel loader to load JavaScript.

module.exports = (baseConfig, env, defaultConfig) => {
  // plugins: [
  //   // your custom plugins
  // ],
  // module: {
  //   rules: [
  //     // add your custom rules.
  //   ],
  // },
  defaultConfig.resolve.extensions.push('.ts', '.tsx');
  defaultConfig.plugins.push(
    new TSDocgenPlugin(),
    new webpack.NamedModulesPlugin()
  );
  defaultConfig.module.rules.push({
    test: /\.tsx?$/,
    loaders: 'ts-loader',
    exclude: path.resolve(__dirname, 'node_modules'),
  },
  {
    test: /\.css$/,
    loaders: [
      'style-loader',
      'css-loader?modules&importLoaders=1&localIdentName=[local]',
    ],
  },
  {
    test: /\.scss$/,
    loaders: [
      {
        loader: 'style-loader',
      },
      {
        loader:
          'css-loader?modules&importLoaders=1&localIdentName=[path]_[name]_[local]',
      },
      {
        loader: 'sass-loader',
        options: {
          includePaths: [
            path.resolve(
              __dirname,
              '../node_modules/@microsoft/azure-iot-ux-fluent-css/src/'
            ),
          ],
        },
      }
    ]
  });

  return defaultConfig;
};
