const path = require('path');
const glob = require('glob');

module.exports = {
  title: 'Microsoft Method UI Framework Documentation',
  components: function () {
    return glob.sync(path.resolve(__dirname, 'src/components/**/*.tsx'))
      .filter(function (module) {
        return /\/[A-Z]\w*\.tsx$/.test(module);
      });
  },
  resolver: require('react-docgen').resolver.findAllComponentDefinitions,

  propsParser: require('react-docgen-typescript').parse,

  assetsDir: './static/',
  webpackConfig: require('./webpack.styleguide.js'),

  require: [
    path.join(__dirname, './static/css/icons.css'),
  ]
};