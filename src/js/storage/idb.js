import { StorageError } from './exceptions.js'
import { uuidv4 } from './utils.js'
import { EXPENSE, INCOME } from './seed.js'
import { Dexie } from 'dexie'

const db = new Dexie('sync-save')
db.version(1).stores({
  accounts:
    'id, name, source, type, initial_balance, current_balance, currency, created_at, updated_at',
  records:
    'id, source_account, destination_acount, amount, currency, type, note, tag, created_at, updated_at'
})
db.open().catch((e) => {
  throw StorageError(`Failed to Open DB ${e.stack}`)
})

export async function storeAccount (account) {
  account.id = uuidv4()
  await db
    .transaction('rw', db.accounts, async () => {
      db.accounts.add(account)
    })
    .catch((e) => {
      throw StorageError(`Failed to store account ${e.stack}`)
    })
  return account
}

export async function updateAccount (id, account) {
  await db
    .transaction('rw', db.accounts, async () => {
      const updated = await db.accounts.update(id, account)
      if (!updated) {
        throw StorageError(`Could not find Account ${id}`)
      }
    })
    .catch((e) => {
      throw StorageError(`Failed to update account ${e.stack}`)
    })
  return account
}

export async function getAccount (id) {
  return db
    .transaction('r', db.accounts, async () => db.accounts.get(id))
    .catch((e) => {
      throw StorageError(`Could not get Account - ${e.stack}`)
    })
}

export async function getAccountMulti (filters = {}) {
  return db
    .transaction('r', db.accounts, async () => {
      return db.accounts.where(filters)
    })
    .catch((e) => {
      throw StorageError(`Could not get Accounts - ${e.stack}`)
    })
}
db.on('populate', (tx) => {
  // Use provided transaction to populate database with initial data
  Object.entries(EXPENSE)
    .map(([name, emoji]) => {
      return {
        name,
        emoji,
        fund_source: 'SEED',
        fund_type: 'expense',
        initial_balance: 0.0
      }
    })
    .forEach((e) => storeAccount(e))
  Object.entries(INCOME)
    .map(([name, emoji]) => {
      return {
        name,
        emoji,
        fund_source: 'SEED',
        fund_type: 'income',
        initial_balance: 0.0
      }
    })
    .forEach((e) => {
      storeAccount(e)
    })
})

export async function storeRecord (record) {
  record.id = uuidv4()
  await db
    .transaction('rw', db.records, async () => {
      db.records.add(record)
    })
    .catch((e) => {
      throw StorageError(`Failed to store record ${e.stack}`)
    })
  return record
}

export async function updateRecord (id, record) {
  await db
    .transaction('rw', db.records, async () => {
      const updated = await db.records.update(id, record)
      if (!updated) {
        throw StorageError(`Could not find Record ${id}`)
      }
    })
    .catch((e) => {
      throw StorageError(`Failed to update record ${e.stack}`)
    })
  return record
}

export async function getRecord (id) {
  return db
    .transaction('r', db.records, async () => db.records.get(id))
    .catch((e) => {
      throw StorageError(`Could not get Record - ${e.stack}`)
    })
}

export async function getRecordsMulti (filters = {}) {
  return db
    .transaction('r', db.records, async () => {
      return db.records.where(filters)
    })
    .catch((e) => {
      throw StorageError(`Could not get Records - ${e.stack}`)
    })
}
