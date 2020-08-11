const Account = require('./Account.js');

class DollarsBankDao {
    
    constructor() {
        this.accounts = new Map();
        this.error = null;
    }
	
	idExists(id) {
		return this.accounts.containsKey(id);
	}
	
	idIsUnique(id) {
		return !this.accounts.containsKey(id);
	}
	
	addAccount(account) {
		if(this.accounts.containsKey(account.getUserId()))
			return false;
		accounts.put(account.getUserId(), account);
		return true;
	}
	
	getAccount(userId, password) {
		account = this.accounts.get(userId);
		
		if((account != null) && (account.correctPassword(password)))
			return account;
		
		error = "Invalid Credentials";
		return null;
	}
	
	deposit(acc, amount) {
		acc.addAmount(amount, "local deposit");
	}
	
	withdraw(acc, amount) {
		if(validateTransaction(acc, amount)) {
			acc.subtractAmount(amount, "local withdrawal");
			return true;
		}
		return false;
	}
	
	transferToId(from, toId, amount) {
		return this.transfer(from, accounts.get(toId), amount);
	}
	
	transfer(from, to, amount) {
		if(validateTransaction(from, amount)) {
			if(to == null)
            this.error = "Target Account Does Not Exist";
			else {
				from.subtractAmount(amount, "transfer to " + to.getUserId().toString());
				to.addAmount(amount, "transfer from " + from.getUserId().toString());
				return true;
			}
		}
		else
			error = "Source Account Does Not Have Sufficient Funds";
		return false;
	}
	
	getError() {
		temp = error;
		this.error = null;
		return temp;
	}
	
	validateTransaction(account, amount) {
		
		if(account.getBalance() < amount) {
			this.error = account.getUserId() + " does not have sufficient funds";
			return false;
		}
		return true;
	}
}

module.exports = DollarsBankDao;