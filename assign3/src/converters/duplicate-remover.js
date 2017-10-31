class DuplicateRemover{

	static removeDuplicates(string){
		let lowerCaseWords = string.toLowerCase().split(" ");

		return string.split(" ")
            .filter((word, index, array) => {if (word.toLowerCase() != lowerCaseWords[index + 1]) return word})
            .join(" ");
	}

}

module.exports = DuplicateRemover;