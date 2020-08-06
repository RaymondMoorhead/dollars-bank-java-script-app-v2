import React from 'react';
import * as utility from './Utility.js';
import Account from '../Data/Account.js';
import encrypt from './Encrypt.js';

class ViewDebug extends React.Component {
    
    render(){
        var account = new Account();
        account.userId = "CoolGuy";
        account.name = "Karrejahl";
        account.address = "Anywhere";
        account.contactNumber = "9999999999";
        account.addAmount(50000);
        account.setPassword("ShieldBash!");
        return (
            <div>
                <div>
                    Account Functionality<br/>
                    {account.userId.toString()}<br/>
                    {account.password.toString()}<br/>
                    {account.name.toString()}<br/>
                    {account.address.toString()}<br/>
                    {account.contactNumber.toString()}<br/>
                    {account.balance.toString()}<br/>
                    {account.transactions.toString()}<br/>
                </div>

                <br/>

                <div>
                    Encrypt Functionality<br/>
                    {encrypt("password", "username").toString()}<br/>
                    {encrypt("ShieldBash!", "Karrejahl").toString()}<br/>
                    {(account.password === encrypt("ShieldBash!", "Karrejahl")).toString()}<br/>
                </div>

                <br/>

                <div>
                    validAmount Functionality<br/>
                    {utility.validAmount("10").toString()}<br/>
                    {utility.validAmount("10.00").toString()}<br/>
                    {utility.validAmount("$10").toString()}<br/>
                    {utility.validAmount("$10.00").toString()}<br/>
                    {utility.validAmount("-10").toString()}<br/>
                    {utility.validAmount("Hello").toString()}<br/>
                </div>

                <br/>

                <div>
                    parseAmountToInt Functionality<br/>
                    {utility.parseAmountToInt("10")}<br/>
                    {utility.parseAmountToInt("10.00")}<br/>
                    {utility.parseAmountToInt("$10.00")}<br/>
                </div>

                <br/>

                <div>
                    parseAmountToString Functionality<br/>
                    {utility.parseAmountToString(10)}<br/>
                    {utility.parseAmountToString(1000)}<br/>
                </div>

                <br/>

                <div>
                    getTime Functionality<br/>
                    {utility.getTime()}
                </div>
            </div>
        )
    }
}

export default ViewDebug;