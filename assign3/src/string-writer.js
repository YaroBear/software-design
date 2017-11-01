class StringWriter{  //Venkat: extends Writer. We can move all common things between StringWriter and FileWriter into Writer
	constructor(){
		this.contents = "";
		this.open = true;
	}

	write(string){
		return new Promise((resolve, reject) => {
			if(this.open){
				this.contents += string;
			}
			resolve();
		});
	}

	read(){
		return new Promise((resolve, reject)=>{
			resolve(this.contents);
		});
	}
	
	close(){
		this.open = false;
	}
}

module.exports = StringWriter;