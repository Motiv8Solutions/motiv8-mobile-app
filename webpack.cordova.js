const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = merge(common, {
    output: {
        filename: '[name].bundle.js',
        /* eslint-disable no-undef */
        path: path.join(__dirname, 'app/www/js')
        /* eslint-enable no-undef */
    },
    devtool: 'inlin-source-map'
});