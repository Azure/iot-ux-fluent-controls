const path = require('path');

module.exports = {
  entry: ['./src/index.ts'],
  output: {
    filename: 'method.js',
    libraryTarget: 'commonjs2',
    path: path.join(__dirname, 'static', 'dist')
  },
  target: 'node',

  devtool: 'source-map',

  resolve: {
    extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js']
  },

  module: {
      rules: [
        {
            test: /\.js$/,
            loader: 'babel-loader?presets=' + require.resolve('babel-preset-es2015')
        },
        { test: /\.scss$/, loaders: ['style-loader', 'css-loader?modules&importLoaders=1&localIdentName=[path]_[name]_[local]', 'sass-loader'] },
        { test: /\.tsx?$/, loader: 'awesome-typescript-loader' }
    ],
  },

  // externals: [
  //   {
  //     'react': 'React',
  //   },
  //   {
  //     'react-dom': 'ReactDOM'
  //   }
  // ],

};