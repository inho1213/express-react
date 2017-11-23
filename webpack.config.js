const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: './src/index.js',

    output: {
        path: path.resolve(__dirname, './public/js/'),
        filename: 'bundle.js'
    },

    plugins:[
        new webpack.DefinePlugin({
            'process.env':{
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress:{
                warnings: true
            }
        })
    ],
    
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: "babel-loader"
        }, {
            test: /\.css$/,
            loaders: ['style-loader', 'css-loader']
        }]
    }
};