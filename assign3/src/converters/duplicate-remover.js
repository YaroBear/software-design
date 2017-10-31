class DuplicateRemover{

	static removeDuplicates(string){
		return string.split(" ")
            .filter((word, index, array) => {if (word != array[index + 1]) return word})
            .join(" ");
	}
}

module.exports = DuplicateRemover;