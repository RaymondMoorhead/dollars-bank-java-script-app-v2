const State = require('./../State.js');

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
	}

	run() {
		switch(this.subState) {
			case 0:
				id = this.askQuestion("User Id:" + ConsoleExtras.ANSI_GREEN);
				System.out.print(ConsoleExtras.ANSI_RESET);
				break;
			case 1:
				password = this.askQuestion("Password:" + ConsoleExtras.ANSI_GREEN);
				acc = this.controller.dao.getAccount(id, password);
				if(acc != null)
					this.controller.changeState("WelcomeCustomerState", acc);
				else {
					this.write(ConsoleExtras.ANSI_RED + DollarsBankDao.getError() + ". Try Again!");
					subState = 0;
				}
				this.write(ConsoleExtras.ANSI_RESET);
				break;
			default:
				this.controller.changeState("ErrorState");
				break;
				
		}
	}
}

module.exports = LoginState;