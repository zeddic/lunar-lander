
const SHIP_IMG_URL = require('assets/images/ship.png');

export enum Asset {
  SHIP = 'ship',
}

export function loadAssetsInto(game: Phaser.Game) {
  game.load.image(Asset.SHIP, SHIP_IMG_URL);
}
