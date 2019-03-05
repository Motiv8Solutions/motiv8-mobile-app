module.exports = {
    entry: ['./index.jsx'],
    module: {
        rules: [
            {
                // Include js and jsx files
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json']
    }
};
