const StateController = require('./Flow/StateController.js');

const WelcomeState = require('./Flow/Console/WelcomeState.js');
const ErrorState = require('./Flow/Console/ErrorState.js');
const DepositState = require('./Flow/Console/DepositState.js');
const WithdrawState = require('./Flow/Console/WithdrawState.js');
const TransferState = require('./Flow/Console/TransferState.js');
const LoginState = require('./Flow/Console/LoginState.js');
const NewAccountState = require('./Flow/Console/NewAccountState.js');
const WelcomeCustomerState = require('./Flow/Console/WelcomeCustomerState.js');
const Account = require('./Data/Account.js');

controller = new StateController();

// add States
controller.addState(new ErrorState());
controller.addState(new WelcomeState());
controller.addState(new DepositState());
controller.addState(new WithdrawState());
controller.addState(new TransferState());
controller.addState(new LoginState());
controller.addState(new NewAccountState());
controller.addState(new WelcomeCustomerState());

// add initial data for testing

// Karl = ShieldBash!
var account = new Account();
account.name = "Karrejahl Jigneison";
account.contactNumber = "9999999999";
account.address = "The Open Road";
account.userId = "Karl";
account.setPassword("ShieldBash!");
account.addAmount(1000, "New Shield Money");
controller.dao.addAccount(account);

// BigG = The8th!!
account = new Account();
account.name = "King George";
account.contactNumber = "1234567890";
account.address = "The Castle";
account.userId = "BigG";
account.setPassword("The8th!!");
account.addAmount(1000000000, "Treasury");
controller.dao.addAccount(account);

// begin
controller.start("WelcomeState");