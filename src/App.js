const StateController = require('./Flow/StateController.js');

const WelcomeState = require('./Flow/Console/WelcomeState.js');
const ErrorState = require('./Flow/Console/ErrorState.js');
const DepositState = require('./Flow/Console/DepositState.js');
const LoginState = require('./Flow/Console/LoginState.js');
const NewAccountState = require('./Flow/Console/NewAccountState.js');
//const TransferState = require('./Flow/Console/TransferState.js');
//const WelcomeCustomerState = require('./Flow/Console/WelcomeCustomerState.js');

controller = new StateController();

// add States
controller.addState(new ErrorState());
controller.addState(new WelcomeState());
controller.addState(new DepositState());
controller.addState(new LoginState());
controller.addState(new NewAccountState());
//controller.addState(new TransferState());
//controller.addState(new WelcomeCustomerState());

// begin
controller.start("WelcomeState");

// const prompt = require('prompt');

// function getData() {
//     var trueResult;
//     prompt.get("Hello", function(error, result) {
//         trueResult = result["Hello"];
//         console.log("Hello from inside of prompt.get with trueResult " + trueResult);
//         getDataSub(trueResult);
//     });
// }

// function getDataSub(arg) {
//     console.log(arg);
//     if(arg === "exit")
//         return;
//     getData();
// }

// var trueResult = null;
// var hasStarted = false;

// console.log("Just before prompt.get with trueResult " + trueResult);

// prompt.start();

// trueResult = getData();

// console.log("Just after prompt.get with trueResult " + trueResult);