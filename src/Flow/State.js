class State {
	
	constructor(name) {
        this.name = name;// unique identifier
		this.controller = controller;
		
		// prevents an instance of State from being created
		if(this.constructor === State)
			throw new Error("FYI: Instance of Abstract class cannot be instantiated");
	}
	
	getName() {
		return this.name;
	}

	askQuestion(query) {
		// const readline = rl.createInterface({
		// 	input: process.stdin,
		// 	output: process.stdout,
		// });
	
		// return new Promise(resolve => rl.question(query, ans => {
		// 	readline.close();
		// 	resolve(ans);
		// }))

		return this.controller.askQuestion(query);
	}

	writeStart() {
		console.log("\n");
	}
	
	write(data) {
		console.log(data);
	}
	
	// called before the first run(), the input acc is
	// any the Account the last state has passed along
	start(account) {throw new Error("State.start must be overridden by inheriting class");}
	
	// called every loop until this.controller.changeState
	// is called from within
	run() {throw new Error("State.run must be overridden by inheriting class");}
}

module.exports = State;