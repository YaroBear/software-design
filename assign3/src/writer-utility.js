class WriterUtility{

	static toLowerCase(string){
		return string.toLowerCase();
	}

	static toUpperCase(string){
		return string.toUpperCase();
	}

	static removeDuplicates(string){
		return string.split(" ")
            .filter((word, index, array) => {if (word != array[index + 1]) return word})
            .join(" ");
	}

	static removeStupid(string){
		return string.split(" ")
			.filter((word) => {if (word != "stupid") return word;})
			.join(" ");
	}
}

module.exports = WriterUtility;