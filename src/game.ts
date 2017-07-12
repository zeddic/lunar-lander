import 'p2';
import 'pixi';
import 'phaser';
import {blah} from './game2';

let img = require('assets/images/ship.png');

var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create });

function preload () {
  game.load.image('ship', img);
}

function create () {
  var ship = game.add.sprite(game.world.centerX, game.world.centerY, 'ship');
  ship.anchor.setTo(0.5, 0.5);
}

console.log('Hello Lunar Lander!: ' + blah);
