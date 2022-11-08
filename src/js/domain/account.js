/*
This processing js will act as an adapter between th view layer and storage layer of the app for new account creations.
First, it checks that the information given from the View Layer is correct. If it is incorrect we throw a validation error.
Second, if validation passes, we pass the new account information to the database where it saves this account and assigns it a database key.
Third, if there was a problem storing the information, the database will throw a storing error. We will communicate this error to the user to reattempt the account creation.
Fourth, if there were no validation/storage errors then the account must have been added correctly, so we pass this new account info, with its associated key, back to the view layer.
*/

import * as accountStore from '../storage/account.js'
import {
  MissingFieldError,
  FormattingError,
  InvalidAmountError
} from './exceptions.js'

/*
Our input is the data given from the New Account fields on the view layer. The input has the form:
const passedInfo = {"name":"test account name","account_type":"checking-account","initial_balance":"12345","currency":"USD"}

First this function checks that the given JSON file has a valid amount, non-empty and a positive number.
If it doesn't, the validateNewAccount function will throw a Validation Error.
If it successfully validates, then we proceed to give the input to the storage layer.
If there is a problem in storage, then the addAccountInTable function will throw a Storage Error.
If we have no errors, then addAccountInTable() will return the newly added account with its key, in JSON format, which we then return.
*/

export async function addAccount (account) {
  validateNewAccount(account)
  account.source = 'USER'
  account.current_balance = account.initial_balance
  return await accountStore.storeAccount(account) // This function comes from the storage layer. Needs to be imported.
  // broadcast new record to all peers would be added here.
}

export async function getAllUserAccounts () {
  const accounts = await accountStore
    .getAccountMulti({ source: 'USER' })
    .then((results) => results.toArray())
  return accounts
}

/*
We assume here that the user is restricted from typing any non-number or decimal values into the initial balance field.
This is a hard lock out on the view layer. So the initial balance is always a string.
 */
function validateNewAccount (passedInfo) {
  if (
    typeof passedInfo.name === 'string' &&
    passedInfo.name !== '' &&
    passedInfo.initial_balance !== '' &&
    Number(passedInfo.initial_balance) >= 0 &&
    Number(passedInfo.initial_balance) ===
      Number(passedInfo.initial_balance).toFixed(2)
  ) {
    // If this returns true then the form was filled correctly and we can our data to the database and get the account's ID.
  }
  if (passedInfo.name === '') {
    throw new MissingFieldError('Account Name')
  }
  if (passedInfo.initial_balance === '') {
    throw new MissingFieldError('Initial Balance')
  }
  if (typeof passedInfo.name !== 'string') {
    throw new FormattingError('Account Name')
  }
  if (
    typeof passedInfo.name !== 'string' ||
    passedInfo.name === '' ||
    passedInfo.initial_balance === ''
  ) {
    throw new InvalidAmountError('Initial Balance')
  }
}
