const State = require('./../State.js');
const ConsoleExtras = require('./../../Utility/ConsoleExtras.js');
const Utility = require('./../../Utility/Utility.js');

class DepositState extends State {

	constructor() {
        super("DepositState");
        this.account = null;
	}

	start(account) {
		this.writeStart();
		this.write("+----------------------+");
		this.write("| Enter Deposit Details|");
		this.write("+----------------------+");
		this.account = account;
	}

	run() {
		var num = this.askQuestion("Amount:" + ConsoleExtras.ANSI_GREEN);
		if(Utility.validAmount(num)) {
			this.controller.dao.deposit(this.account, Utility.parseAmountToInt(num));
			this.controller.changeState("WelcomeCustomerState", this.account);
			this.account = null;
		}
		else
		this.write(ConsoleExtras.ANSI_RED + "Please Enter A Valid Amount");
		this.write(ConsoleExtras.ANSI_RESET);
	}
}

module.exports = DepositState;