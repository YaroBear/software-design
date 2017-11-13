const Player = require('./player');
const Transformations = require('./transformations');

let avatars = require('require.all')('./avatars');

Object.values(avatars).forEach((avatar) =>{
    avatar.prototype.action = function(){console.log("Calling action of : " + this.constructor.name);}
});

let player = new Player('bike', new Transformations(Object.keys(avatars)));

for(let i = 0; i < 6; i++){
    player.performAction();
    player.transformUp();
}