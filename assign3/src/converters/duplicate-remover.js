class DuplicateRemover{

	static removeDuplicates(string){
		let words = string.split(" ");

		return string.split(" ")
            .filter((word, index, array) => {if (word != words[index + 1]) return word})
            .join(" ");
	}

}

module.exports = DuplicateRemover;