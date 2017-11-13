const Player = require('./player');
const Transformations = require('./transformations');

let avatars = require('require.all')('./avatars');

Object.values(avatars).forEach((avatar) =>{
    avatar.prototype.action = function(){console.log("Calling action of : " + this.constructor.name);}
});

let avatar = Object.values(avatars)[0];

let player = new Player(new avatar, new Transformations(Object.keys(avatars))); //Venkat: The order in which the files are loaded/required is not necessarily the order of transformation.

for(let i = 0; i < 6; i++){
    player.performAction();
    player.transformUp();
}