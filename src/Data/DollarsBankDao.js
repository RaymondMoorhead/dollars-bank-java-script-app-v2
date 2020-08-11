const Account = require('./Account.js');

class DollarsBankDao {
    
    constructor() {
        this.accounts = new Map();
        this.error = null;
    }
	
	idExists(id) {
		return this.accounts.has(id);
	}
	
	idIsUnique(id) {
		return !this.accounts.has(id);
	}
	
	addAccount(account) {
		if(this.accounts.has(account.userId))
			return false;
		this.accounts.set(account.userId, account);
		return true;
	}
	
	getAccount(userId, password) {
		var account = this.accounts.get(userId);
		
		if((account != null) && (account.correctPassword(password)))
			return account;
		
		this.error = "Invalid Credentials";
		return null;
	}
	
	deposit(acc, amount) {
		acc.addAmount(amount, "local deposit");
	}
	
	withdraw(acc, amount) {
		if(this.validateTransaction(acc, amount)) {
			acc.subtractAmount(amount, "local withdrawal");
			return true;
		}
		return false;
	}
	
	transferToId(from, toId, amount) {
		return this.transfer(from, this.accounts.get(toId), amount);
	}
	
	transfer(from, to, amount) {
		if(this.validateTransaction(from, amount)) {
			if(to == null)
            this.error = "Target Account Does Not Exist";
			else {
				from.subtractAmount(amount, "transfer to " + to.userId);
				to.addAmount(amount, "transfer from " + from.userId);
				return true;
			}
		}
		else
			this.error = "Source Account Does Not Have Sufficient Funds";
		return false;
	}
	
	getError() {
		var temp = this.error;
		this.error = null;
		return temp;
	}
	
	validateTransaction(account, amount) {
		
		if(account.balance < amount) {
			this.error = account.userId + " does not have sufficient funds";
			return false;
		}
		return true;
	}
}

module.exports = DollarsBankDao;