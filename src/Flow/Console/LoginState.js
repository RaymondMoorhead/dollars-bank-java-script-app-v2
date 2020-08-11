const State = require('./../State.js');
const ConsoleExtras = require('./../../Utility/ConsoleExtras.js');

class LoginState extends State{

	constructor() {
        super("LoginState");
        this.id;
        this.password;
        this.subState = 0;
	}

	start(account) {
		this.writeStart();
		this.write("+---------------------+");
		this.write("| Enter Login Details |");
		this.write("+---------------------+");
		this.subState = 0;
	}

	run() {
		switch(this.subState) {
			case 0:
				this.id = this.askQuestion("User Id:" + ConsoleExtras.ANSI_GREEN);
				this.write(ConsoleExtras.ANSI_RESET);
				++this.subState;
				break;
			case 1:
				this.password = this.askQuestion("Password:" + ConsoleExtras.ANSI_GREEN);
				var acc = this.controller.dao.getAccount(this.id, this.password);
				if(acc != null)
					this.controller.changeState("WelcomeCustomerState", acc);
				else {
					this.write(ConsoleExtras.ANSI_RED + this.controller.dao.getError() + ". Try Again!");
					this.subState = 0;
				}
				this.write(ConsoleExtras.ANSI_RESET);
				this.id = null;
				this.password = null;
				break;
			default:
				this.controller.changeState("ErrorState");
				break;
				
		}
	}
}

module.exports = LoginState;