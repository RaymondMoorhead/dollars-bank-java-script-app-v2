const State = require('./../State.js');
const ConsoleExtras = require('./../../Utility/ConsoleExtras.js');
const Utility = require('./../../Utility/Utility.js');

class WelcomeCustomerState extends State{
	constructor() {
        super("WelcomeCustomerState");
        this.account = null;
	}

	start(account) {
		this.account = account;
		this.printHeaderText();
	}

	run() {
		var input = this.askQuestion(ConsoleExtras.ANSI_GREEN + "\nEnter Choice (1,2,3,4,5 or 6) :" + ConsoleExtras.ANSI_RESET);
        input = parseInt(input);
        switch(input) {
			case 1:
				this.controller.changeState("DepositState", this.account);
				break;
			case 2:
				this.controller.changeState("WithdrawState", this.account);
				break;
			case 3:
				this.controller.changeState("TransferState", this.account);
				break;
			case 4:
				var recent = this.account.transactions;
				this.writeStart();
				this.write("+------------------------+");
				this.write("| 5 Recent Transactions: |");
				this.write("+------------------------+");
				for(var i = 0; i < recent.size(); ++i)
					this.write(recent.at(i));
                this.write("Balance - " + Utility.parseAmountToString(this.account.balance) + " as on " + Utility.getTime());
                this.askQuestion(ConsoleExtras.ANSI_YELLOW + "Press Enter To Continue" + ConsoleExtras.ANSI_RESET);
				this.printHeaderText();
				break;
			case 5:
				this.writeStart();
				this.write("+-----------------------+");
				this.write("| Customer Information: |");
				this.write("+-----------------------+");
				this.write("Name: " + this.account.name);
				this.write("Address: " + this.account.address);
				this.write("Contact Number: " + this.account.contactNumber);
				this.askQuestion(ConsoleExtras.ANSI_YELLOW + "Press Enter To Continue" + ConsoleExtras.ANSI_RESET);
				this.printHeaderText();
				break;
			case 6:
                this.account = null;
				this.controller.changeState("WelcomeState");
				break;
			default:
				this.write(ConsoleExtras.ANSI_RED + "Invalid Choice" + ConsoleExtras.ANSI_RESET);
		}
	}
	
	printHeaderText() {
		this.writeStart();
		this.write("+---------------------+");
		this.write("| WELCOME Customer!!! |");
		this.write("+---------------------+");
		this.write("1. Deposit Amount");
		this.write("2. Withdraw Amount");
		this.write("3. Funds Transfer");
		this.write("4. View 5 Recent Transactions");
		this.write("5. Display Customer Information");
		this.write("6. Sign Out");
	}
}

module.exports = WelcomeCustomerState;