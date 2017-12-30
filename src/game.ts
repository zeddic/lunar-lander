import 'p2';
import 'pixi';
import 'phaser';
import {Asset, loadAssetsInto} from './assets';

const game = new Phaser.Game(800, 600, Phaser.AUTO, '', {preload, create, update});
let ship : Phaser.Sprite;

let poly : Phaser.Polygon;
let graphics: Phaser.Graphics;

function preload () {
  loadAssetsInto(game);
}

function create () {

	game.physics.startSystem(Phaser.Physics.P2JS);
  game.physics.p2.gravity.y = 80;
  game.physics.p2.restitution = 0.8;


  ship = game.add.sprite(game.world.centerX, game.world.centerY, Asset.SHIP);
  ship.anchor.setTo(0.5, 0.5);

  game.physics.enable(ship, Phaser.Physics.P2JS, true);

  // let points = [
  //   0, 0,
  //   game.world.width, 0,
  //   game.world.width, 50,
  //   0, 50,
  // ];

  // poly = new Phaser.Polygon(points);
  // graphics = game.add.graphics(0, game.world.height - 50);
  // graphics.beginFill(0xFFFF00);
  // graphics.drawPolygon(poly.points);
  // graphics.endFill();

  // game.physics.enable(graphics, Phaser.Physics.P2JS);
  // graphics.body.immovable = true;
  // graphics.body.allowGravity = false;
  // ship.body.maxVelocity.setTo(250, 250);
  
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
