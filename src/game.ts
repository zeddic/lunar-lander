import 'p2';
import 'pixi';
import 'phaser';
import {Asset, loadAssetsInto} from './assets';

const game = new Phaser.Game(800, 600, Phaser.AUTO, '', {preload, create, update});
let ship : Phaser.Sprite;

// declare module PIXI.EarCut {
//   export function Triangulate(p: number[]): number[];
// }


function preload () {
  loadAssetsInto(game);
}


function createShape(points: number[], x, y) {
  //var triangles = PIXI.EarCut.Triangulate(points);

  const poly = new Phaser.Polygon(points);
  const graphics = new Phaser.Graphics(game); //game.add.graphics(0, 0);
  graphics.beginFill(0xeaeaea);
  graphics.drawPolygon(poly.points);
  graphics.endFill();

  const sprite = game.add.sprite(x, y, graphics.generateTexture());

  game.physics.enable(sprite, Phaser.Physics.P2JS, true);
  sprite.body.clearShapes();
  sprite.body.addPolygon({}, points);
  sprite.body.static = true;

  return sprite;
}

function create () {

  var bounds = new Phaser.Rectangle(100, 100, 400, 400);

	game.physics.startSystem(Phaser.Physics.P2JS);
  game.physics.p2.gravity.y = 1;
  game.physics.p2.restitution = 0.8;

  ship = game.add.sprite(game.world.centerX, game.world.centerY, Asset.SHIP);
  ship.anchor.setTo(0.5, 0.5);

  game.physics.enable(ship, Phaser.Physics.P2JS, true);

  let points = [
    20, 0,
    100, 0,
    80, 50,
    0, 50,
  ];

  const shape1 = createShape(points, 50, 50);
  const shape2 = createShape(points, 500, 300);
  // const shape3 = createShape([
  //   0, 0,
  //   20, 0,
  //   20, 40,
  //   40, 40,
  //   40, 0,
  //   60, 0,
  //   100, 100,
  //   50, 100,
  //   30, 90,
  //   50, 60,
  //   20, 60,
  //   10, 60,
  //   0, 40,
  //   0, 0,
  // ], 20, 500);
  // shape3.body.mass = 50;

  game.input.keyboard.addKeyCapture([
    Phaser.Keyboard.LEFT,
    Phaser.Keyboard.RIGHT,
    Phaser.Keyboard.UP
  ])
}

function update() {

  if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
    ship.body.rotateLeft(100);
  } else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
    ship.body.rotateRight(100);
  } else {
    ship.body.setZeroRotation();
  }

  if (game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
    ship.body.thrust(200)
  }
}
