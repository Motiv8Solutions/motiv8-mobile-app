module.exports = {
    entry: ['./index.tsx'],
    module: {
        rules: [
            {
                test: /\.ts(x?)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'awesome-typescript-loader'
                    }
                ]
            }/*,
            {
                enforce: 'pre',
                test: /\.js$/,
                loader: 'source-map-loader'
            }*/
        ]
    },
    resolve: {
        extensions: ['.json', '.ts', '.tsx', '.js', '.jsx']
    }
};
