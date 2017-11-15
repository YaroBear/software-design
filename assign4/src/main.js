const Player = require('./player');
const Transformations = require('./transformations');

if (process.argv.length < 4){
	throw new Error("must have at least two args: npm start bike bike car plane rocket...");
	process.exit();
}

let avatars = require('require.all')('./avatars');

Object.values(avatars).forEach((avatar) =>{
    avatar.prototype.action = function(){console.log("Calling action of : " + this.constructor.name);}
});

let startingAvatar = new avatars[process.argv[2]];

let defaultRules = process.argv.slice(3);

let transformations = new Transformations(defaultRules);

let player = new Player(startingAvatar, transformations);

for(let i = 0; i < 6; i++){
    player.performAction();
    player.transformUp();
}
