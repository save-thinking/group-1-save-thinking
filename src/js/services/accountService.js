// The services folder will serve to perform four major operations. 
// First, it checks that the information given to the database is correct: Checks if the fields are empty or not. 
// Second, it passes the new account information to the database where it will be given an AccountID. 
// Third, it will request this new ID back from the database and then create a new JSON object that contains this ID and the original information. 
// Fourth, it will pass this new JSON object to the View Layer, where it is stored with the associated button. 

// passedInfo is of the form: const passedInfo = {"account_name":"sdgf","account_type":"checking-account","initial_balance":"1215","currency":"USD"}

function ValidateAddAccount (passedInfo) {
  const toVerifyInfo = passedInfo
  if (typeof toVerifyInfo.account_name === 'string' && toVerifyInfo.account_name !== '' && typeof toVerifyInfo.initial_balance === 'string' && toVerifyInfo.initial_balance !== '') {
    passInfoToDB () // This is a valid entry and we can pass this to the database to get its ID. 
  }
  else {
    alert(`Error. Please fill all fields.`)
    toggleAddRecordModalVisibility()
  }
}
export function ValidateAddAccount ()

// ValidateAddAccount()

// MyTestDatabase needs to be replaced with the target database of our choice. 
// Need to import the function "addToDB" that will request to add some information to the DB. 
// Need to import the function "getFromDB" that will request to get some information from the DB. 


// import function addToDB


function addAccountToDB (passedInfo) { 
  addToDB(passedInfo); //First request the DB to save information to the DB. 
  //assume that here the DB gives us the new key.
  const newKey = "New_key_given"

  // Merge the previous JSON file with the new key so the leading term is the key associated with the account. 
  mergeJSON(newKey, passedInfo); 


}



function mergeJSON(a, b) {

  
}


