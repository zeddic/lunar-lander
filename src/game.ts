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
  ship = game.add.sprite(game.world.centerX, game.world.centerY, Asset.SHIP);
  ship.anchor.setTo(0.5, 0.5);

  game.physics.enable(ship, Phaser.Physics.ARCADE);
  game.physics.arcade.gravity.y = 50;


  let points = [
    0, 0,
    game.world.width, 0,
    game.world.width, 50,
    0, 50,
  ];

  poly = new Phaser.Polygon(points);
  graphics = game.add.graphics(0, game.world.height - 50);
  graphics.beginFill(0xFFFF00);
  graphics.drawPolygon(poly.points);
  graphics.endFill();

  game.physics.enable(graphics, Phaser.Physics.ARCADE);
  graphics.body.immovable = true;
  graphics.body.allowGravity = false;

  ship.body.maxVelocity.setTo(250, 250);
  
  game.input.keyboard.addKeyCapture([
    Phaser.Keyboard.LEFT,
    Phaser.Keyboard.RIGHT,
    Phaser.Keyboard.UP
  ])
}

function update() {

  game.physics.arcade.collide(ship, graphics);

  if (ship.x > game.width) ship.x = 0;
  if (ship.x < 0) ship.x = game.width;
  if (ship.y > game.height) ship.y = 0;
  if (ship.y < 0) ship.y = game.height;

  if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
    ship.body.angularVelocity = -180;
  } else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
    ship.body.angularVelocity = 180;
  } else {
    ship.body.angularVelocity = 0;
  }

  if (game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
    const ACCELERATION = 200;
    ship.body.acceleration.x = Math.sin(ship.rotation) * ACCELERATION;
    ship.body.acceleration.y = -Math.cos(ship.rotation) * ACCELERATION;
  } else {
    ship.body.acceleration.setTo(0, 0);
  }
}
