const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    mode: 'production',
    output: {
        filename: '[name].bundle.js',
        /* eslint-disable no-undef */
        path: path.join(__dirname, 'app/www/js')
        /* eslint-enable no-undef */
    },
    devtool: 'inlin-source-map'
});