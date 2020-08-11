const State = require('./../State.js');
const ConsoleExtras = require('./../../Utility/ConsoleExtras.js');
const Utility = require('./../../Utility/Utility.js');

class TransferState extends State{

	constructor() {
        super("TransferState");
        this.account = null;
        this.targetId = "";
        this.amount = 0;
        this.subState = 0;
	}

	start(account) {
		this.writeStart();
		this.write("+-----------------------+");
		this.write("| Enter Withdraw Details|");
		this.write("+-----------------------+");
		this.account = account;
		this.subState = 0;
	}

	run() {
        var input;
		switch(this.subState) {
			case 0:
				input = this.askQuestion("Account Id You Like To Transfer Funds To:" + ConsoleExtras.ANSI_GREEN);
				this.targetId = input;
				if(this.controller.dao.idExists(this.targetId))
					++this.subState;
				else
                    this.write(ConsoleExtras.ANSI_RED + "Please Enter A Valid Target Id");
				this.write(ConsoleExtras.ANSI_RESET);
				break;
			case 1:
				input = this.askQuestion("Amount:" + ConsoleExtras.ANSI_GREEN);
				if(Utility.validAmount(input) && this.controller.dao.transferToId(this.account, this.targetId, Utility.parseAmountToInt(input))) {
					this.controller.changeState("WelcomeCustomerState", this.account);
					this.account = null;
				}
				else
                    this.write(ConsoleExtras.ANSI_RED + "Please Enter A Valid Amount");
				this.write(ConsoleExtras.ANSI_RESET);
				break;
			default:
                this.account = null;
				this.controller.changeState("ErrorState");
		}

	}
}

module.exports = TransferState;