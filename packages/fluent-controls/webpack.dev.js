var path = require('path');
var webpack = require('webpack');

module.exports = {
    devtool: 'source-map',
    entry: [
        'webpack-hot-middleware/client',
        './src/gallery/index.tsx'
    ],
    output: {
        path: path.join(__dirname, 'static', 'dist'),
        filename: 'bundle.js',
        publicPath: '/static/'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader?presets=' + require.resolve('babel-preset-es2015')
            },
            {
                test: /\.scss$/,
                loaders: ['style-loader', 'css-loader?modules&importLoaders=1&localIdentName=[path]_[name]_[local]', 'sass-loader']
            },
            {
                test: /\.tsx?$/,
                loaders: ['babel-loader', 'awesome-typescript-loader'],
                include: path.join(__dirname, 'src')
            }
        ]
    },
    resolve: {
        extensions: ['.jsx', '.js', '.tsx', '.ts']
    }
};