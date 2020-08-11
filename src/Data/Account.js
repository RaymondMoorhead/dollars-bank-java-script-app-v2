const Queue = require('./../Utility/Queue.js');
const utility = require('./../Utility/Utility.js');
const encrypt = require('./../Utility/Encrypt.js');

class Account {

    constructor(){
        this.userId = "NoId";
        this.password = "NoPassword";
        this.name = "NoName";
        this.address = "NoAddress";
        this.contactNumber = "NoContactNumber";
        this.balance = 0;
        this.transactions = new Queue();
	}
	
	static validPhone(phoneNum) {
		var validPhonesRegex = [new RegExp('^(\\+\\d{1,3}( )?)?((\\(\\d{3}\\))|\\d{3})[- .]?\\d{3}[- .]?\\d{4}$'),
								new RegExp('|^(\\+\\d{1,3}( )?)?(\\d{3}[ ]?){2}\\d{3}$'),
								new RegExp('|^(\\+\\d{1,3}( )?)?(\\d{3}[ ]?)(\\d{2}[ ]?){2}\\d{2}$')];
		
		for(var i = 0; i < validPhonesRegex.length; ++i)
			if(!validPhonesRegex[i].exec(phoneNum))
				return false;
		return true;
	}

    static validPassword(password){
		// check for minimum length
		if(password.length < 8)
			return "Less Than 8 Characters";
		
		// check for required characters
		var lower = false, upper = false, special = false;
		for(var i = password.length - 1; i >= 0; --i) {
			if((password.charAt(i) >= 'a') && (password.charAt(i) <= 'z'))
				lower = true;
			else if((password.charAt(i) >= 'A') && (password.charAt(i) <= 'Z'))
				upper = true;
			else
				special = true;
		}
		
		if(!lower)
			return "No Lowercase Characters";
		else if(!upper)
			return "No Uppercase Characters";
		else if(!special)
			return "No Special Characters";
		else
			return null;
	}

	setPassword(password) {
		this.password = encrypt(password, this.name);
	}
	
	addTransaction(message) {
        if(this.transactions.size() === 5)
			this.transactions.pop();
		this.transactions.push(message);
    }

    addAmount(amount, message) {
		this.addTransaction("Added " + utility.parseAmountToString(amount) + " (" + message + ") [" + utility.getTime() + "]");
		this.balance += amount;
    }

    subtractAmount(amount, message) {
		if((this.balance - amount) <= -1)
			this.addTransaction("ERROR - Attempted Negative Result Transaction " + utility.parseAmountToString(amount) + " (" + message + ") [" + utility.getTime() + "]");
		else {
			this.addTransaction("Removed " + utility.parseAmountToString(amount) + " (" + message + ") [" + utility.getTime() + "]");
			this.balance -= amount;
		}
    }
}

module.exports = Account;