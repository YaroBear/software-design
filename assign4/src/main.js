const Player = require('./player');
const Transformations = require('./transformations');

let args;

if (process.argv.length > 3){
	args = process.argv;
}
else{
	args = process.env.npm_package_config_defaultArgs.split(" ");
}

let avatars = require('require.all')('./avatars');

Object.values(avatars).forEach((avatar) =>{
    avatar.prototype.action = function(){console.log("Calling action of : " + this.constructor.name);}
});

let startingAvatar = new avatars[args[2]];

let defaultRules = args.slice(3);

let transformations = new Transformations(defaultRules);

let player = new Player(startingAvatar, transformations);

for(let i = 0; i < 6; i++){
    player.performAction();
    player.transformUp();
}
