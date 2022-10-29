// initial value of the database
let database = null


//specify the buttoms here


// add event listeners here


// 1 -> creating the database


// desc - it should be called as soon as the website loads
function createDatabase() {
    // name -> cse210
    // version -> 1

    // creating the database
    const request = indexedDB.open('cse210', 1)

    // adding tables into the database
    request.onupgradeneeded = e => {
        database = e.target.result

        console.log("database +", database)
        
        // first table : Add Account
        // columns -> {"Name" : , "Account Type" : , "Starting Amount : ", "Currency" : }
        const addAccount = database.createObjectStore("add_account", {keyPath : "uuid"})
    }


    //checking for errors
    request.onerror = e => {
        console.log(`error: ${e.target.error} was found `)
    }
}

// used to add a single account into the account table
// send in a json from the frontend with the account details as well as db name maybe??, version as well
function addAccountInTable() {

    //temporary data
    const account = {
        "uuid" : 1,
        "Name" : "Pratik",
        "Account Type" : "Savings",
        "Starting Amount" : 0,
        "Currency" : "USD",
    }

    // getting the transaction ready
    const tx = database.transaction("add_account", "readwrite")
    
    //handling errors
    tx.onerror = e => console.log(`error: ${e.target.error} was found`)

    //getting the table
    const addAccount = tx.objectStore("add_account")

    //adding the data
    addAccount.add(account)
    
}


