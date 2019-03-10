module.exports = {
    entry: ['./index.jsx'],
    module: {
        rules: [
            {
                // Include js and jsx files
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.(jpe?p|png|gif|svg)$/i,
                exclude: /node_modules/,
                loader: 'url-loader',
                options: {
                    limit: 204800
                }
            },
            {
                test: /\.(jpe?p|png|gif|svg)$/i,
                exclude: /node_modules/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]'
                }
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json']
    }
};
