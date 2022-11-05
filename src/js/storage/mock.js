import { uuidv4 } from './utils.js'
const RECORDS = {}
const ACCOUNTS = {}

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
  ACCOUNTS[account.id] = account
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

export function getAllAccounts (filters) {
  let accounts = Object.entries(ACCOUNTS).map((e) => {
    const account = e[1]
    account.id = e[0]
    return account
  })
  if (filters) {
    Object.keys(filters).forEach((key) => {
      accounts = accounts.filter((account) => account[key] === filters[key])
    })
  }
  return accounts
}
