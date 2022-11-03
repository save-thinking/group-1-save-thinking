// initial value of the database
let database = null

function createDatabase() {
  // name -> cse210
  // version -> 1

  // creating the database
  const request = indexedDB.open('cse210', 1)

  // adding tables into the database
  request.onupgradeneeded = e => {
    database = e.target.result

    console.log('database +', database)

    // first table : Accounts
    // columns -> {"Name" : , "Account Type" : , "Starting Amount : ", "Currency" : }
    const Account = database.createObjectStore('Accounts', { keyPath: 'uuid' })
  }

  // checking for errors
  request.onerror = e => {
    console.log(`error: ${e.target.error} was found `)
  }
}

// used to add a single account into the account table
// send in a json from the frontend with the account details as well as db name maybe??, version as well
function addAccountInTable() {
  // temporary data
  const account = {
    uuid: 1,
    Name: 'Pratik',
    'Account Type': 'Savings',
    'Starting Amount': 0,
    Currency: 'USD'
  }

  // getting the transaction ready
  const tx = database.transaction('Accounts', 'readwrite')

  // handling errors
  tx.onerror = e => console.log(`error: ${e.target.error} was found`)

  // getting the table
  const addAccount = tx.objectStore('Accounts')

  // adding the data
  addAccount.add(account)
}

// function to update database account entries
function updateDatabaseAccount() {
  // get the whole updated data
  // source https://dev.to/pandresdev/update-data-from-indexeddb-31pb

}

function deleteDatabaseAccount(id) {
  // get the id to delete stuff

  const request = database.transaction('Accounts', 'readwrite').objectStore('Accounts').delete(id)

  request.onsuccess = () => {
    console.log(`Account deleted, id: ${request.result}`)
  }

  request.onerror = (err) => {
    console.error(`Error to delete Account: ${err}`)
  }
}

// get data by one id
function viewAccountById(id) {
  const request = database.transaction('Accounts').objectStore('Accounts').get(key)

  request.onsuccess = () => {
    const account = request.result

    return account
  }

  request.onerror = (err) => {
    console.error(`Error to get account information: ${err}`)
  }
}

// get all accounts
function viewAllAccounts() {
  const request = database.transaction('Accounts').objectStore('Accounts').getAll()

  request.onsuccess = () => {
    const accounts = request.result

    console.log('Got all the accounts')
    console.table(accounts)

    return accounts
  }

  request.onerror = (err) => {
    console.error(`Error to get all accounts: ${err}`)
  }
}
