const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(common, {
    output: {
        filename: '[name].bundle.js',
        /* eslint-disable no-undef */
        path: path.resolve(__dirname, 'dist')
        /* eslint-enable no-undef */
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist'
    },
    plugins: [new HtmlWebpackPlugin({
        title: 'Dev Server HTML Template',
        template: 'devServer.html'
    })]
});