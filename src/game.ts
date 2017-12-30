import 'p2';
import 'pixi';
import 'phaser';
import {Asset, loadAssetsInto} from './assets';

const game = new Phaser.Game(800, 600, Phaser.AUTO, '', {preload, create, update});
let ship : Phaser.Sprite;


// declare module PIXI.EarCut {
//   export function Triangulate(p: number[]): number[];
// }
// var triangles = PIXI.EarCut.Triangulate(points);


function preload () {
  loadAssetsInto(game);
}



function create () {

  var bounds = new Phaser.Rectangle(100, 100, 400, 400);

	game.physics.startSystem(Phaser.Physics.P2JS);
  game.physics.p2.gravity.y = 100;
  game.physics.p2.restitution = 0.8;

  ship = game.add.sprite(game.world.centerX, game.world.centerY, Asset.SHIP);
  ship.anchor.setTo(0.5, 0.5);

  game.physics.enable(ship, Phaser.Physics.P2JS, true);

  // let points = [
  //   20, 0,
  //   100, 0,
  //   80, 50,
  //   0, 50,
  // ];

  // const shape1 = createShape(points, 50, 50);
  // const shape2 = createShape(points, 500, 300);

  const terrainPoints = createTerrainPoints(game.world.width, game.world.height, 200);
  const terrain = createTerrainSprite(terrainPoints);

  // console.log(groundPoints);
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

function createTerrainPoints(width, height, maxHeight) {

  const MAX_Y_DELTA = 50;
  const MAX_Y_DELTA_CHANGE = 20;
  const STEPS = 50;
  const xStep = width / STEPS;

  const points = [];
  let y = game.rnd.integerInRange(0, maxHeight);
  let yDelta = 0;

  points.push(0, height);

  for (let i = 0; i <= STEPS; i++) {
    let x = i * xStep;

    yDelta += game.rnd.integerInRange(-MAX_Y_DELTA_CHANGE, MAX_Y_DELTA_CHANGE);
    yDelta = Phaser.Math.clamp(yDelta, -MAX_Y_DELTA, MAX_Y_DELTA);
    y += yDelta;

    if (y > maxHeight) {
      y = maxHeight;
      yDelta = -game.rnd.integerInRange(0, MAX_Y_DELTA_CHANGE);
    } else if (y < 20) {
      y = 20;
      yDelta = game.rnd.integerInRange(0, MAX_Y_DELTA_CHANGE);
    }

    points.push(x, game.height - y);
  }

  points.push(width, height);
  points.push(0, height);

  return points;
}

function createTerrainSprite(points: number[]) {

  // Draw the ground polygon and convert it to a texture.
  const graphics = game.add.graphics(0 , 0);
  graphics.beginFill(0xeaeaea);
  graphics.drawPolygon(points);
  graphics.endFill();
  const texture = graphics.generateTexture();
  graphics.destroy();

  // Create a sprite for the ground.
  const sprite = game.add.sprite(0, 0, texture);

  // Enable physics and give it bounds the same polygon grounds
  game.physics.enable(sprite, Phaser.Physics.P2JS, true);
  sprite.body.static = true;
  sprite.body.clearShapes();
  sprite.body.addPolygon({}, points);

  // Phaser and P2 Physics have some odd quirks when used together.
  // Mainly, the sprite texture is always displayed relative to the 
  // body's center of mass. This results in the texture only
  // aligning up correctly with the body if the center of mass is
  // also the center of the texture. Unfortuantly, with odd shapes
  // (like our terrain), this is never the case. We compensate for
  // this by determing where the center of the texture should be
  // relative to the current center of mass and setting an offset
  // so Phaser shifts the the texture and displays it correctly.
  const offX = sprite.body.x - sprite.width / 2;
  const offY = game.height - sprite.body.y - sprite.height / 2;

  sprite.body.offset.x = -offX;
  sprite.body.offset.y = +offY;

  // For debugging: Renders a circle on the body's center of mass.
  const g = game.add.graphics(sprite.body.x , sprite.body.y);
  g.beginFill(0xfeafea);
  g.drawCircle(0, 0, 20);
  g.endFill();
}

function random(min, max) {
  return Math.random() * (max - min) + min;
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




