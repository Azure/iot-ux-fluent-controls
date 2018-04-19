const path = require('path');

module.exports = {
  title: 'Azure IoT Fluent Controls Documentation',
  components: 'lib/components/**/*.{ts,tsx}',
  ignore: ['**/*.spec.{js,jsx,ts,tsx}', '**/*.d.ts', '**/index.ts'],
  resolver: require('react-docgen').resolver.findAllComponentDefinitions,

  propsParser: require('react-docgen-typescript').parse,

  assetsDir: './docs/',
  webpackConfig: require('./webpack.styleguide.js'),

  styleguideDir: './dist/',
  styleguideComponents: {
    Wrapper: path.join(__dirname, 'lib/components/Shell/Shell'),
  },

  require: [
    path.join(__dirname, './docs/css/icons.css'),
    path.join(__dirname, './docs/css/examples.css'),
  ],
};
