const NODE_ENV = process.env.NODE_ENV;
const webpack = require('webpack');
const path = require('path');

module.exports = {
    context: path.resolve(__dirname, 'src'),
    entry: './app/index.js',
    output: {
        filename: 'app.[hash:6].js',
    },
    module: {
        rules: [{
                test: /\.(js)$/,
                exclude: /(node_modules)/,
                use: ['babel-loader'],
            },
            {
                test: /\.(css)$/,
                use: ['style-loader', 'css-loader'],
            }
        ],
    },
    resolve: {
        extensions: ['*', '.js'],
    },
}