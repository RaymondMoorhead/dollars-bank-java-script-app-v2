const State = require('./../State.js');
const Account = require('./../../Data/Account.js');

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
		num = this.askQuestion("Amount:" + ConsoleExtras.ANSI_GREEN);
		if(ConsoleExtras.validAmount(num)) {
			DollarsBankDao.deposit(acc, ConsoleExtras.parseAmount(num));
			this.controller.changeState("WelcomeCustomerState", acc);
		}
		else
		write(ConsoleExtras.ANSI_RED + "Please Enter A Valid Amount");
		write(ConsoleExtras.ANSI_RESET);
	}

	stop() {
		input = null;
		acc = null;
	}
}

module.exports = DepositState;