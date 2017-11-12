const Player = require('./player');
const Transformations = require('./transformations');

let avatars = require('require.all')('./avatars');

avatars.bike.prototype.action = function(){console.log('driving through narrow lanes');}
avatars.car.prototype.action = function(){console.log('driving fast');}
avatars.plane.prototype.action = function(){console.log('flying fast');}
avatars.rocket.prototype.action = function(){console.log('flying really fast');}

let player = new Player('bike', new Transformations(['bike', 'car', 'plane', 'rocket'])); //Venkat: if we add a new avatar we have to change this code. If we want to change the sequence we have to change this code. Let's avoid having to change "code"

for(let i = 0; i < 6; i++){
	player.performAction();
	player.transformUp();
}