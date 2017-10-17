var webPack = require('./webpack.config');
var path = require('path');
webPack.devtool = 'inline-source-map';

module.exports = function(config) {
    config.set({
        browsers: ['Chrome'],
        // karma only needs to know about the test bundle
        files: [
            './node_modules/phantomjs-polyfill-object-assign/object-assign-polyfill.js',
            'tests.bundle.js'
        ],
        frameworks: ['chai', 'mocha'],
        plugins: [
            'karma-chrome-launcher',
            'karma-chai',
            'karma-mocha',
            'karma-mocha-reporter',
            'karma-sourcemap-loader',
            'karma-webpack',
            'karma-phantomjs-launcher'
        ],
        // run the bundle through the webpack and sourcemap plugins
        preprocessors: {
            'tests.bundle.js': ['webpack', 'sourcemap']
        },
        reporters: ['mocha'],
        singleRun: false,

        webpack: {
            devtool: 'inline-source-map',
            resolve: {
                extensions: ['.ts', '.tsx', '.js']
            },
            module: {
                loaders: [
                    {
                        test: /\.tsx?$/,
                        loader: 'awesome-typescript-loader',
                        options: {configFileName: 'tsconfig.tests.json'},
                        exclude: path.resolve(__dirname, 'node_modules'),
                        include: path.resolve(__dirname, 'src/'),
                    },
                    {
                        test: /\.json$/,
                        loader: 'json-loader'
                    },
                    {
                        test: /\.scss$/,
                        loaders: ['style-loader', 'css-loader', 'sass-loader']
                    }
                ]
            },
            externals: {
                'react/lib/ExecutionEnvironment': true,
                'react/lib/ReactContext': true,
                'react/addons': true,
            }
        },

        webpackMiddleware: {
            noInfo: true
        }
    });
};
