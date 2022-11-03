// This processing js will act as an adapter between th view layer and storage layer of the app for new account creations.  
// First, it checks that the information given from the View Layer is correct. If it is incorrect we throw a validation error.
// Second, if validation passes, we pass the new account information to the database where it saves this account and assigns it a database key. 
// Third, if there was a problem storing the information, the database will throw a storing error. We will communicate this error to the user to reattempt the account creation. 
// Fourth, if there were no validation/storage errors then the account must have been added correctly, so we pass this new account info, with its associated key, back to the view layer.



import addAccountInTable from '??' // Need to still find out from where to import this function.

class ValidationError extends Error {
    constructor(message) {
      super(message);
      this.name = "ValidationError";
    }
}


class StorageError extends Error {
    constructor(message) {
      super(message);
      this.name = "StorageError";
    }
}

// Our input is the data given from the New Account fields on the view layer. The input has the form:
// const passedInfo = {"account_name":"test account name","account_type":"checking-account","initial_balance":"12345","currency":"USD"}

// First this function checks that the given JSON file has a valid amount, non-empty and a positive number. 
// If it doesn't, the validateNewAccount function will throw a Validation Error.
// If it successfully validates, then we proceed to give the input to the storage layer. 
// If there is a problem in storage, then the addAccountInTable function will throw a Storage Error. 
// If we have no errors, then addAccountInTable() will return the newly added account with its key, in JSON format, which we then return. 

function processNewAccount (passedInfo) {
    try {
        validateNewAccount(passedInfo) 
        const response = addAccountInTable(passedInfo)
        return response
        //broadcast new record to all peers would be added here. 
    } catch (error) {
        if (error instanceof ValidationError ){
            throw new ValidationError ("Please check that your new account has a name and that the 'Initial Balance' is correct");
        } if (error instanceof StorageError ) {
            throw new StorageError ("Whoops, something happened when saving your record. Please try again.");
        } else {
            console.error(error);
            alert(`Unknown Error.`);
        }
    }
}
export function processNewAccount ()



function validateNewAccount (){
  if (typeof passedInfo.account_name === 'string' && passedInfo.account_name !== '' && Number(passedInfo.initial_balance) >= 0 && Number(passedInfo.initial_balance) == Number(passedInfo.initial_balance).toFixed(2)) {
    return // If this returns true then the form was filled correctly and we can our data to the database and get the account's ID. 
  }
  else {
    throw new ValidationError
  }
}



//Testing:
// We can test validateNewAccount() using the following inputs. 
// If they are successfully validated, nothing should happen and we should return.
// If they were unsuccessful, we should get a validation error. 
// If you want to test processNewAccount(), just set 'const response = passedInfo' then you can test on the same values below. 
// If we catch a validation error, it will throw a validation error. If there is no error we return the passedInfo's JSON.


// const goodPassedInfo = {"account_name":"Sample Account Name","account_type":"checking-account","initial_balance":"12345","currency":"USD"}
// const goodPassedInfo = {"account_name":"Sample Account Name","account_type":"checking-account","initial_balance":"12345.67","currency":"USD"}
// const goodPassedInfo = {"account_name":"","account_type":"checking-account","initial_balance":"0","currency":"USD"}

// const badPassedInfo = {"account_name":"","account_type":"checking-account","initial_balance":"0","currency":"USD"}
// const badPassedInfo = {"account_name":"Sample Account Name","account_type":"checking-account","initial_balance":"","currency":"USD"}
// const badPassedInfo = {"account_name":"Sample Account Name","account_type":"checking-account","initial_balance":"-1","currency":"USD"}
// const badPassedInfo = {"account_name":"Sample Account Name","account_type":"checking-account","initial_balance":"11234.234243","currency":"USD"}

