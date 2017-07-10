const path = require('path');

module.exports = {
    entry: './src/game.ts',
    output: {
        path: path.resolve(__dirname, 'dist'),  
        filename: 'bundle.js',
        publicPath: '/dist/'
    },
    resolve: {
        // Add `.ts` as a resolvable extension.
        extensions: ['.webpack.js', '.web.js', '.ts', '.js']
    },
    module: {
        loaders: [
            // all files with a `.ts` extension will be handled by `ts-loader`
            { test: /\.ts$/, loader: 'ts-loader' }
        ]
    }
}
