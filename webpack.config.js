const NODE_ENV = process.env.NODE_ENV;
const webpack = require('webpack');
const path = require('path');

module.exports = {
    context: path.resolve(__dirname, 'src'),
    entry: './app/index.js',
    output: {
        filename: 'app.[hash:6].js',
    },
    // watch: true,
    module: {
        rules: [{
            test: /\.(js)$/,
            exclude: /node_modules/,
            use: ['babel-loader'],
        }, ],
    },
    resolve: {
        extensions: ['*', '.js'],
    },
}