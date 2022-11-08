import { db } from './idb.js'
import { StorageError } from './exceptions.js'
import { uuidv4 } from './utils.js'
export async function storeRecord (record) {
  record.id = uuidv4()
  await db
    .transaction('rw', db.records, db.accounts, async () => {
      db.records.add(record)
      const srcAccount = await db.accounts.get(record.source_account)
      const destAccount = await db.accounts.get(record.destination_account)
      await db.accounts.update(srcAccount.id, {
        current_balance: srcAccount.current_balance - record.amount
      })
      await db.accounts.update(destAccount.id, {
        current_balance: destAccount.current_balance + record.amount
      })
    })
    .catch((e) => {
      throw new StorageError(`Failed to store record ${e.stack}`)
    })
  return record
}

export async function updateRecord (id, record) {
  await db
    .transaction('rw', db.records, db.accounts, async () => {
      const prev = await db.records.get(id)
      let srcAccount = await db.accounts.get(prev.source_account)
      let destAccount = await db.accounts.get(prev.destination_account)
      // Undoing last record's balance
      await db.accounts.update(srcAccount.id, {
        current_balance: srcAccount.current_balance + prev.amount
      })
      await db.accounts.update(destAccount.id, {
        current_balance: destAccount.current_balance - prev.amount
      })
      const updated = await db.records.update(id, record)
      if (!updated) {
        throw new StorageError(`Could not find Record ${id}`)
      }
      srcAccount = await db.accounts.get(record.source_account)
      destAccount = await db.accounts.get(record.destination_account)
      // Updating edited record's balance
      await db.accounts.update(srcAccount.id, {
        current_balance: srcAccount.current_balance + record.amount
      })
      await db.accounts.update(destAccount.id, {
        current_balance: destAccount.current_balance - record.amount
      })
    })
    .catch((e) => {
      throw new StorageError(`Failed to update record ${e.stack}`)
    })
  return record
}

export async function getRecord (id) {
  return db
    .transaction('r', db.records, async () => db.records.get(id))
    .catch((e) => {
      throw new StorageError(`Could not get Record - ${e.stack}`)
    })
}
export async function getAllRecords () {
  return db
    .transaction('r', db.records, async () => {
      return db.records
    })
    .catch((e) => {
      throw new StorageError(`Could not get Records - ${e.stack}`)
    })
}
export async function getRecordsMulti (filters = {}) {
  return db
    .transaction('r', db.records, async () => {
      return db.records.where(filters)
    })
    .catch((e) => {
      throw new StorageError(`Could not get Records - ${e.stack}`)
    })
}
