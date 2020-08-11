const State = require('./../State.js');
const ConsoleExtras = require('./../../Utility/ConsoleExtras.js');
const Utility = require('./../../Utility/Utility.js');

class WithdrawState extends State{

	constructor() {
        super("WithdrawState");
        this.account = null;
	}

	start(account) {
		this.writeStart();
		this.write("+-----------------------+");
		this.write("| Enter Withdraw Details|");
		this.write("+-----------------------+");
		this.account = account;
	}

	run() {
		var input = this.askQuestion("Amount" + ConsoleExtras.ANSI_GREEN);
		if(Utility.validAmount(input) && this.controller.dao.withdraw(this.account, Utility.parseAmountToInt(input))) {
			this.controller.changeState("WelcomeCustomerState", this.account);
			this.account = null;
		}
		else
			this.write(ConsoleExtras.ANSI_RED + "Please Enter A Valid Amount");
            this.write(ConsoleExtras.ANSI_RESET);
	}
}

module.exports = WithdrawState;