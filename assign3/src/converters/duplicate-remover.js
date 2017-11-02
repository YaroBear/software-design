class DuplicateRemover{

	static removeDuplicates(string){   //Venkat: should not do any case conversions here
		let lowerCaseWords = string.toLowerCase().split(" ");

		return string.split(" ")
            .filter((word, index, array) => {if (word.toLowerCase() != lowerCaseWords[index + 1]) return word})
            .join(" ");
	}

}

module.exports = DuplicateRemover;