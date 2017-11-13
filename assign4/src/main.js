const Player = require('./player');
const Transformations = require('./transformations');

let avatars = require('require.all')('./avatars');

Object.values(avatars).forEach((avatar) =>{
    avatar.prototype.action = function(){console.log("Calling action of : " + this.constructor.name);}
});

let avatar = Object.values(avatars)[0];

let defaultRules = Object.keys(avatars);

let transformations = new Transformations(defaultRules);

let player = new Player(new avatar, transformations);

for(let i = 0; i < 6; i++){
    player.performAction();
    player.transformUp();
}

let newRules = defaultRules.sort(function(a,b) {
	return 0.5 - Math.random();
});

transformations = new Transformations(newRules);

player.changeTransformations(transformations);

for(let i = 0; i < 6; i++){
    player.performAction();
    player.transformUp();
}