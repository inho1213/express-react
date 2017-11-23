const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: [
        './src/index.js',
        'webpack-dev-server/client?http://0.0.0.0:8081',
        'webpack/hot/only-dev-server'
    ],

    output: {
        path: '/',
        filename: 'bundle.js'
    },

    devServer: {
        hot: true,
        filename: 'bundle.js',
        publicPath: '/js/',
        historyApiFallback: true,
        contentBase: './public',
        proxy: {
            "**": "http://localhost:8080"
        },
        stats: {
            assets: false,
            colors: true,
            version: false,
            hash: false,
            timings: false,
            chunks: false,
            chunkModules: false
        }
    },

    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ],

    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loaders: ['react-hot-loader', 'babel-loader']
        }, {
            test: /\.css$/,
            loaders: ['style-loader', 'css-loader']
        }]
    }
};