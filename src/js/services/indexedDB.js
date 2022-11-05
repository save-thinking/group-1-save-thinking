
// Before opening (creating) a database using IndexedDB we must verify that the 
// browser has the necessary support, 
// for this we create a function that we will use later when creating the database:

function indexedDBSupport() {
  return 'indexedDB' in window;
}


// Save the connection to the database in a global variable
// since it will later be used to carry out transactions
let db;





function createDatabase() {

  if (!indexedDBSupport()) throw new Error("Your browser doesn't support IndexedBD");

  const request = window.indexedDB.open('MyDatabase', 1);

  // Event handling
  request.onerror = (e) => {
      console.error(`IndexedDB error: ${request.errorCode}`);
  };

  request.onsuccess = (e) => {
      console.info('Successful database connection');
      db = request.result;
  };

  request.onupgradeneeded = (e) => {
      console.info('Database created');
      const db = request.result;

      const objectStore = db.createObjectStore('ACCOUNTS', { keyPath: 'id' })
      const objectStore2 = db.createObjectStore('RECORDS', { keyPath: 'recordID' })

      // Transaction completed
      objectStore.transaction.oncompleted = (e) => {
          console.log('Object store "ACCOUNTS" created');

      };

      objectStore2.transaction.oncompleted = (e) => {
          console.log('Object store "RECORD" created');
      }

  }


}

class StorageError extends Error {
  constructor(message) {
      super(message)
      this.name = 'StorageError'
      this.message = message
  }
}


// https://stackoverflow.com/questions/105034/how-do-i-create-a-guid-uuid
function uuidv4() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
      (
          c ^
          (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
      ).toString(16)
  )
}

function storeAccount(account) {

  account.id = uuidv4();

  const transaction = db.transaction('ACCOUNTS', 'readwrite');

  const objectStore = transaction.objectStore('ACCOUNTS');

  const request = objectStore.add(account)

  request.onsuccess = () => {
      // request.result contains key of the added object
      console.log(`New account added, id: ${request.result}`);
  }

  request.onerror = (err) => {
      console.error(`Error to add new account: ${err}`)
  }
}


const accountA = {
  name: "Pratik",
  account_type: "Savings",
  emoji: "",
  fund_source: "",
  fund_type: "",
  initial_balance: "",
  current_balance: "",
  currency: "USD",
}

// storeAccount(accountA)


function updateAccount(key, account) {

  const result = db.transaction('ACCOUNTS', 'readwrite').objectStore('ACCOUNTS')
      .delete(key);

  const transaction = db.transaction('ACCOUNTS', 'readwrite');

  const objectStore = transaction.objectStore('ACCOUNTS');

  const request = objectStore.add(account)

  request.onsuccess = () => {
      // request.result contains key of the added object
      console.log(`account updated, id: ${request.result}`);
  }

  request.onerror = (err) => {
      console.error(`Error to update account: ${err}`)
  }

}

const accountB = {
  id: "sadasdasdasdad",
  name: "Rohan",
  account_type: "Savings",
  emoji: "",
  fund_source: "",
  fund_type: "",
  initial_balance: "",
  current_balance: "",
  currency: "USD",
}

// updateAccount('54c783e4-8073-4ecd-912a-80f402b66079', accountB)


// get data by one id
function getAccount(id) {

  const request = db.transaction('ACCOUNTS').objectStore('ACCOUNTS').get(id);

  request.onsuccess = () => {
      const account = request.result;

      console.log(account)

      return account;
  }

  request.onerror = (err) => {
      console.error(`Error to get account information: ${err}`)
  }
}

// get all accounts
function getAllAccounts() {
  // all account with filter
  const request = db.transaction('ACCOUNTS').objectStore('ACCOUNTS').getAll();

  request.onsuccess = () => {
      const accounts = request.result;

      console.log('Got all the accounts');
      console.table(accounts)

      return accounts;
  }

  request.onerror = (err) => {
      console.error(`Error to get all accounts: ${err}`)
  }
}




// record part
function storeRecord(record) {
  record.recordID = uuidv4();

  const transaction = db.transaction('RECORDS', 'readwrite');

  const objectStore = transaction.objectStore('RECORDS');

  const request = objectStore.add(record)

  request.onsuccess = () => {
      // request.result contains key of the added object
      console.log(`New record added, id: ${request.result}`);
  }

  request.onerror = (err) => {
      console.error(`Error to add new record: ${err}`)
  }


}

const record = {
  record_type: 'Expense',
  record_source_account: 'BofA Account',
  record_destination_account: 'BofA Account',
  record_amount: '-123',
  currency: 'USD',
  record_note: 'this is the note',
  record_created_time: '2018-07-22',
  record_tag: '1'
}




function getRecord(recordID) {
  const request = db.transaction('RECORDS').objectStore('RECORDS').get(recordID);

  request.onsuccess = () => {
      const record = request.result;

      console.log("record",  record)

      return record;
  }

  request.onerror = (err) => {
      console.error(`Error to get record information: ${err}`)
  }

}


function getAllRecords() {
  const request = db.transaction('RECORDS').objectStore('RECORDS').getAll();

  request.onsuccess = () => {
      const record = request.result;

      console.log('Got all the record');
      console.table(record)

      return record;
  }

  request.onerror = (err) => {
      console.error(`Error to get all record: ${err}`)
  }   
}

