class StupidRemover{

	static removeStupid(string){
		return string.split(" ").filter(word => {if (word.toLowerCase() != 'stupid') return word}).join(" ");    //Venkat: no toLowerCase conversion here. Only handle what is already lowercase Also, use replace insted of filter, etc.
	}
}

module.exports = StupidRemover;