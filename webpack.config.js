const path = require('path');

const phaserModule = path.join(__dirname, '/node_modules/phaser/');
const phaserPath = path.join(phaserModule, 'build/custom/phaser-split.js');
const pixiPath = path.join(phaserModule, 'build/custom/pixi.js');
const p2Path = path.join(phaserModule, 'build/custom/p2.js');

module.exports = {
    entry: './src/game.ts',
    output: {
        path: path.resolve(__dirname, 'dist'),  
        filename: 'bundle.js',
        publicPath: '/dist/'
    },
    resolve: {
        // Add `.ts` as a resolvable extension.
        extensions: ['.ts', '.js'],
        alias: {
            'phaser': phaserPath,
            'pixi': pixiPath,
            'p2': p2Path,
        }
    },
    module: {
        rules: [
            // all files with a `.ts` extension will be handled by `ts-loader`
            { test: /\.ts$/, loader: 'ts-loader', exclude: '/node_modules/' },
            { test: /pixi\.js$/, loader: 'expose-loader?PIXI' },
            { test: /phaser-split\.js$/, loader: 'expose-loader?Phaser' },
            { test: /p2\.js$/, loader: 'expose-loader?p2' },
        ]
    }
}
