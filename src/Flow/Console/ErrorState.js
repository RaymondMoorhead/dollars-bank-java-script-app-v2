const State = require('./../State.js');

class ErrorState extends State {

	constructor() {
		super("ErrorState");
	}

	start(account) {
	}

	run() {
		write(ConsoleExtras.ANSI_RED + "\nAn Unknown Error Has Occurred" + ConsoleExtras.ANSI_RESET);
		this.controller.changeState("WelcomeState");
	}

	stop() {
		
	}

}

module.exports = ErrorState;