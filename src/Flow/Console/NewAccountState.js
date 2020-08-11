const Account = require('./../../Data/Account.js');
const State = require('./../State.js');
const ConsoleExtras = require('./../../Utility/ConsoleExtras.js');
const Utility = require('./../../Utility/Utility.js');

class NewAccountState extends State{

	constructor() {
		super("NewAccountState");
	}

	start(account) {
        this.writeStart();
		this.write("+-------------------------------+");
		this.write("| Enter Details For New Account |");
		this.write("+-------------------------------+");
		this.newAcc = new Account();
		this.subState = 0;
	}

	run() {
        var input;
		switch(this.subState) {
			case 0:
				input = this.askQuestion("Customer Name:" + ConsoleExtras.ANSI_GREEN);
				this.newAcc.name = input;
				++this.subState;
				this.write(ConsoleExtras.ANSI_RESET);
				break;
			case 1:
				input = this.askQuestion("Customer Address:" + ConsoleExtras.ANSI_GREEN);
				this.newAcc.address = input;
				++this.subState;
				this.write(ConsoleExtras.ANSI_RESET);
				break;
			case 2:
				input = this.askQuestion("Customer Contact Number:" + ConsoleExtras.ANSI_GREEN);
				if(Account.validPhone(input)) {
					this.newAcc.contactNumber = input;
					++this.subState;
				}
				else
                    this.write(ConsoleExtras.ANSI_RED + "Invalid Phone Number\n");
                this.write(ConsoleExtras.ANSI_RESET);
				break;
			case 3:
				input = this.askQuestion("User Id :" + ConsoleExtras.ANSI_GREEN);
				if(this.controller.dao.idIsUnique(input)) {
					this.newAcc.userId = input;
					++this.subState;
				}
				else
                    this.write(ConsoleExtras.ANSI_RED + "Please Use A Unique Id\n");
                this.write(ConsoleExtras.ANSI_RESET);
				break;
			case 4:
				input = this.askQuestion("Password : 8 Characters With Lower, Upper & Special" + ConsoleExtras.ANSI_GREEN);
				this.error = Account.validPassword(input);
				if(this.error == null) {
					this.newAcc.setPassword(input);
					++this.subState;
				}
				else
                    this.write(ConsoleExtras.ANSI_RED + this.error + "\n");
                this.write(ConsoleExtras.ANSI_RESET);
				break;
			case 5:
				input = this.askQuestion("Initial Deposit Amount:" + ConsoleExtras.ANSI_GREEN);
				if(Utility.validAmount(input)) {
					this.newAcc.addAmount(Utility.parseAmountToInt(input), "Initial Balance");
					this.controller.dao.addAccount(this.newAcc);
					this.controller.changeState("WelcomeCustomerState", this.newAcc);
				}
				else
                    this.write(ConsoleExtras.ANSI_RED + "Please Enter A Valid Amount\n");
				this.write(ConsoleExtras.ANSI_RESET);
				break;
			default:
				this.controller.changeState("ErrorState");
				break;
				
		}
	}

	stop() {
		input = null;
		if(!DollarsBankDao.addAccount(newAcc))
			System.out.println(ConsoleExtras.ANSI_RED + "User Cannot Be Added For An Unknown Reason" + ConsoleExtras.ANSI_RESET);
		newAcc = null;
	}
}

module.exports = NewAccountState;