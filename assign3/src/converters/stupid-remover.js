class StupidRemover{

	static removeStupid(string){
		return string.replace(/stupid/ig, 's*****');
	}
}

module.exports = StupidRemover;