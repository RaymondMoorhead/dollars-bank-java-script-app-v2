//import State from './State.js'
const State = require('./../State.js');

class WelcomeState extends State{

	constructor() {
		super("WelcomeState");
	}

	start(account) {
		this.writeStart();
		this.write("+---------------------------+");
		this.write("| DOLLARSBANK Welcomes You! |");
		this.write("+---------------------------+");
		this.write("1. Create New Account");
		this.write("2. Login");
        this.write("3. Exit");
	}

	run() {
		var message = "Bad Message";
		message = this.askQuestion("Please enter a number 1 - 5");
		this.write("Received Input: \"" + message + "\"");
        var input;
        input = parseInt(message);
        if(isNaN(input))
            return;

		switch(selection) {
			case 1:
				this.controller.changeState("NewAccountState");
				break;
			case 2:
				this.controller.changeState("LoginState");
				break;
			case 3:
				this.controller.shutdown();
				this.write("Goodbye");
				break;
			default:
				this.controller.changeState("ErrorState");
		}
	}

	stop() {
	}

}

module.exports = WelcomeState;