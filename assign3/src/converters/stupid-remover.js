class StupidRemover{

	static removeStupid(string){
		return string.split(" ").filter(word => {if (word.toLowerCase() != 'stupid') return word}).join(" ");
	}
}

module.exports = StupidRemover;