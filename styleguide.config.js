const path = require('path');
const glob = require('glob');

module.exports = {
  title: 'Azure Iot React Controls Documentation',
  components: 'lib/components/**/*.{ts,tsx}',
  resolver: require('react-docgen').resolver.findAllComponentDefinitions,

  propsParser: require('react-docgen-typescript').parse,

  assetsDir: './docs/',
  webpackConfig: require('./webpack.styleguide.js'),

  styleguideDir: './docs/',

  require: [
    path.join(__dirname, './docs/css/icons.css'),
    path.join(__dirname, './docs/css/examples.css'),
  ],
};
