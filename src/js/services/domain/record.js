/*
This processing js will act as an adapter between th view layer and storage layer of the app for recoring transactions.  
First, it checks that the information given from the View Layer is correct. If it is incorrect we throw a validation error.
Second, if validation passes, we pass the new record information to the database where it saves this record, updating the account balances, and assigning the transaction a database key. 
Third, if there was a problem storing the information, the database will throw a storing error. We will communicate this error to the user to reattempt the record. 
Fourth, if there were no validation/storage errors then the record must have been updated correctly, so we pass this new record, with its associated key, back to the view layer.
*/

import addRecordInTable from '??'
import * from 'src/js/services/domain/exceptions.js';


/*
Our input is the data given from the New Record fields on the view layer. The input has the form:
const passedInfo = {"record_type":"Expense","record_source_account":"Given Source Account","record_destination_account":"Given Destination Account","record_amount":"123456","currency":"USD/Euro/else","record_note":"Sample Note.","record_created_time":"2018-07-22","record_tag":"Sample Tag"}

First this function checks that the given JSON file has a valid amount, non-empty and a positive number. 
If it doesn't, the validateNewRecord function will throw a Validation Error.
If it successfully validates, then we proceed to give the input to the storage layer. 
If there is a problem in storage, then the addRecordInTable function will throw a Storage Error. 
If we have no errors, then addRecordInTable() will return the newly added record with its database key in JSON format, which we then return. 
*/

function processNewRecord (passedInfo) {
    try {
        validateNewRecord(passedInfo) 
        const response = addRecordInTable(passedInfo);
        return response;
        //broadcast new record to all peers would be added here. 
    } catch (error) {
        if (error instanceof ValidationError ){
            throw error;
        } if (error instanceof StorageError ) {
            throw error;
        } else {
            throw error;
        }
    }
}
export function processNewRecord ()

/*
We assume here that the user is restricted from typing any non-number or decimal values into the record amount field. 
This is a hard lock out on the view layer. So the initial balance is always a string.
*/
function validateNewRecord (passedInfo) {
    if (Number(passedInfo.record_amount) > 0 && Number(passedInfo.record_amount) == Number(passedInfo.record_amount).toFixed(2)) {
        return; // If the form was filled correctly then we can pass this record to the database. 
    }
    else {
        throw new InvalidAmountError (record_amount) 
    }
}

