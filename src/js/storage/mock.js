const RECORDS = {}
const ACCOUNTS = {}

// https://stackoverflow.com/questions/105034/how-do-i-create-a-guid-uuid
function uuidv4 () {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  )
}

export class StorageError extends Error {
  constructor (message) {
    super(message)
    this.name = 'StorageError'
    this.message = message
  }
}

export function storeRecord (record) {
  const recordID = uuidv4()
  RECORDS[recordID] = record
  record.id = recordID
  return record
}

export function getRecord (id) {
  if (id in RECORDS) {
    const record = RECORDS[id]
    record.id = id
    return record
  }
  throw new StorageError(`No Record found for id ${id}`)
}

export function getAllRecords () {
  return Object.entries(RECORDS).map((e) => {
    const record = e[1]
    record.id = e[0]
    return record
  })
}

export function storeAccount (account) {
  account.id = uuidv4()
  ACCOUNTS.push(account)
  return account
}

export function getAccount (id) {
  if (id in ACCOUNTS) {
    const account = ACCOUNTS[id]
    account.id = id
    return account
  }
  throw new StorageError(`No Record found for id ${id}`)
}

export function getAllAccounts () {
  return Object.entries(RECORDS).map((e) => {
    const account = e[1]
    account.id = e[0]
    return account
  })
}
