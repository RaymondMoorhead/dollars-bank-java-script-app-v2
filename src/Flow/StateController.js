//const prompt = require('prompt');
const prompt = require('prompt-sync')();
const DollarsBankDao = require('./../Data/DollarsBankDao.js');

class StateController {

	constructor() {
		this.states = new Map();
		this.dao = new DollarsBankDao();
        this.running = true;
        this.curState = null;
        this.nextState = null;
		this.passedData = null;
		//prompt.start();
	}

	askQuestion(query) {
		var trueResult;// = new Promise((resolve) => {resolve()});
		// console.log("Just before prompt.get with trueResult " + trueResult);
		// prompt.get(query, function(result) {
		// 	trueResult( () => {
		// 		result[query]
		// 	})
		// });
		// console.log("Just after prompt.get with trueResult " + trueResult);
		console.log(query);
		return prompt();
	}
	
	addState(state) {
		this.states.set(state.getName(), state);
		state.controller = this;
	}
	
	changeState(name, passData) {
		this.passedData = passData;
		this.nextState = this.states.get(name);
	}
	
	start(startStateName) {
		this.curState = this.states.get(startStateName);
		this.curState.start(null);
		this.run();
	}
	
	shutdown() {
		this.running = false;
	}
	
	run() {
		while (this.running) {
			this.curState.run();
			if(this.nextState != null) {
				this.curState = this.nextState;
				this.nextState = null;
				this.curState.start(this.passedData);
				this.passedData = null;
			}
		}
	}
}

module.exports = StateController;