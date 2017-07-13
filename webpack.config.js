const path = require('path');

const phaserModule = path.join(__dirname, '/node_modules/phaser/');
const phaserPath = path.join(phaserModule, 'build/custom/phaser-split.js');
const pixiPath = path.join(phaserModule, 'build/custom/pixi.js');
const p2Path = path.join(phaserModule, 'build/custom/p2.js');
const assetsPath = path.join(__dirname, 'assets');

module.exports = {
    entry: './src/game.ts',
    output: {
        path: path.resolve(__dirname, 'dist/'),  
        filename: 'bundle.js',
    },
    resolve: {
        extensions: ['.ts', '.js'],
        alias: {
            'phaser': phaserPath,
            'pixi': pixiPath,
            'p2': p2Path,
            'assets': assetsPath,
        }
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000,
        inline: true,
        watchOptions: {
            aggregateTimeout: 300,
            poll: true,
            ignored: /node_modules/
        }
    },
    // Enable for Source Maps.
    // devtool: "cheap-eval-source-map",
    module: {
        rules: [
            { test: /\.ts$/, loader: 'ts-loader', exclude: '/node_modules/' },
            { test: /pixi\.js$/, loader: 'expose-loader?PIXI' },
            { test: /phaser-split\.js$/, loader: 'expose-loader?Phaser' },
            { test: /p2\.js$/, loader: 'expose-loader?p2' },
            { 
              test: /\.(png|jpg|gif|svg|pvr|pkm)$/,
              use: ['file-loader?name=assets/[name].[ext]?[hash]']
            }
        ]
    }
}
