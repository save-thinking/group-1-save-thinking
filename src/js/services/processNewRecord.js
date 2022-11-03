// This processing js will act as an adapter between th view layer and storage layer of the app for recoring transactions.  
// First, it checks that the information given from the View Layer is correct. If it is incorrect we throw a validation error.
// Second, if validation passes, we pass the new record information to the database where it saves this record, updating the account balances, and assigning the transaction a database key. 
// Third, if there was a problem storing the information, the database will throw a storing error. We will communicate this error to the user to reattempt the record. 
// Fourth, if there were no validation/storage errors then the record must have been updated correctly, so we pass this new record, with its associated key, back to the view layer.


import addRecordInTable from '??' // Need to still find outfrom where to import this function. 


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

// Our input is the data given from the New Record fields on the view layer. The input has the form:
// const passedInfo = {"record_type":"Expense","record_source_account":"Given Source Account","record_destination_account":"Given Destination Account","record_amount":"123456","currency":"USD/Euro/else","record_note":"Sample Note.","record_created_time":"2018-07-22","record_tag":"Sample Tag"}


// First this function checks that the given JSON file has a valid amount, non-empty and a positive number. 
// If it doesn't, the validateNewRecord function will throw a Validation Error.
// If it successfully validates, then we proceed to give the input to the storage layer. 
// If there is a problem in storage, then the addRecordInTable function will throw a Storage Error. 
// If we have no errors, then addRecordInTable() will return the newly added record with its database key in JSON format, which we then return. 

function processNewRecord (passedInfo) {
    try {
        validateNewRecord(passedInfo) 
        const response = addRecordInTable(passedInfo)
        return response
        //broadcast new record to all peers would be added here. 
    } catch (error) {
        if (error instanceof ValidationError ){
            throw new ValidationError ("Please check that 'amount' is correct.");
        } if (error instanceof StorageError ) {
            throw new StorageError ("Whoops, something happened when saving your record. Please try again.");
        } else {
            console.error(error);
            alert(`Unknown Error.`);
        }
    }
}
export function processNewRecord ()


function validateNewRecord (passedInfo) {
    if (typeof passedInfo.record_amount === 'string' && Number(passedInfo.record_amount) > 0 && Number(passedInfo.record_amount) == Number(passedInfo.record_amount).toFixed(2)) {
      return; // If the form was filled correctly then we can pass this record to the database. 
    }
    else {
      throw new ValidationError; // If there was a mistake, we will throw an error.
    }
}



//Testing:
// We can test validateNewRecord() using the following inputs. 
// If they are successfully validated, nothing should happen and we should return.
// If they were unsuccessful, we should get a validation error. 
// If you want to test processNewRecord(), just set 'const response = passedInfo' then you can test on the same values below. 
// If we catch a validation error, it will throw a validation error. If there is no error we return the passedInfo's JSON.


// const goodProcessStatement = {"record_type":"Expense","record_source_account":"BofA Account","record_destination_account":"BofA Account","record_amount":"123456","currency":"USD","record_note":"Sample Note.","record_created_time":"2018-07-22","record_tag":"Sample Tag"}  
// const goodProcessStatement = {"record_type":"Expense","record_source_account":"BofA Account","record_destination_account":"BofA Account","record_amount":"123456.78","currency":"USD","record_note":"Sample Note.","record_created_time":"2018-07-22","record_tag":"Sample Tag"}

// const badProcessStatement = {"record_type":"Expense","record_source_account":"BofA Account","record_destination_account":"BofA Account","record_amount":"0","currency":"USD","record_note":"Sample Note.","record_created_time":"2018-07-22","record_tag":"Sample Tag"}
// const badProcessStatement = {"record_type":"Expense","record_source_account":"BofA Account","record_destination_account":"BofA Account","record_amount":"","currency":"USD","record_note":"Sample Note.","record_created_time":"2018-07-22","record_tag":"Sample Tag"}
// const badProcessStatement = {"record_type":"Expense","record_source_account":"BofA Account","record_destination_account":"BofA Account","record_amount":"-1","currency":"USD","record_note":"Sample Note.","record_created_time":"2018-07-22","record_tag":"Sample Tag"}
// const badProcessStatement = {"record_type":"Expense","record_source_account":"BofA Account","record_destination_account":"BofA Account","record_amount":"1.1.1","currency":"USD","record_note":"Sample Note.","record_created_time":"2018-07-22","record_tag":"Sample Tag"}
// const badProcessStatement = {"record_type":"Expense","record_source_account":"BofA Account","record_destination_account":"BofA Account","record_amount":"123.4567","currency":"USD","record_note":"Sample Note.","record_created_time":"2018-07-22","record_tag":"Sample Tag"}
