const Player = require('./player');
const Transformations = require('./transformations');

let avatars = require('require.all')('./avatars');

avatars.bike.prototype.action = function(){console.log('driving through narrow lanes');}
avatars.car.prototype.action = function(){console.log('driving fast');}
avatars.plane.prototype.action = function(){console.log('flying fast');}
avatars.rocket.prototype.action = function(){console.log('flying really fast');}

let player = new Player('bike', new Transformations(['bike', 'car', 'plane', 'rocket']));

for(let i = 0; i < 6; i++){
	player.performAction();
	player.transformUp();
}