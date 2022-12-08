/** Storage Service - Records
 @module storage/record
 */
import { db } from './idb.js'
import { StorageError } from './exceptions.js'
import { uuidv4 } from './utils.js'

/**
 * Generates ID and saves to DB
 * @public
 * @function storeRecord
 *
 * @param {Record} record
 * @returns {Record}
 */
export async function storeRecord (record) {
  record.id = uuidv4()
  await db
    .transaction('rw', db.records, db.accounts, async () => {
      db.records.add(record)
      const srcAccount = await db.accounts.get(record.source_account)
      const destAccount = await db.accounts.get(record.destination_account)
      await db.accounts.update(srcAccount.id, {
        current_balance:
          Number(srcAccount.current_balance) - Number(record.amount)
      })
      await db.accounts.update(destAccount.id, {
        current_balance:
          Number(destAccount.current_balance) + Number(record.amount)
      })
    })
    .catch((e) => {
      throw new StorageError(`Failed to store record ${e.stack}`)
    })
  return record
}

/**
 * Updates Record
 * @public
 * @function updateRecord
 * @param {string} id
 * @param {Record} record
 * @returns {Record}
 */
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

/**
 * Get Record
 * @public
 * @function getRecord
 * @param {string} id
 * @returns {Record}
 */
export async function getRecord (id) {
  return db
    .transaction('r', db.records, async () => db.records.get(id))
    .catch((e) => {
      throw new StorageError(`Could not get Record - ${e.stack}`)
    })
}

/**
 * Get all Records
 * @public
 * @function getAllRecords
 * @returns {Array.Record}
 */
export async function getAllRecords () {
  return db
    .transaction('r', db.records, async () => {
      return db.records
    })
    .catch((e) => {
      throw new StorageError(`Could not get Records - ${e.stack}`)
    })
}
/**
 * Get all Records given filter predicates
 * @public
 * @param {Array.Function} filters
 * @function getRecordsMulti
 * @returns {Array.Record}
 */
export async function getRecordsMulti (filters = {}) {
  return db
    .transaction('r', db.records, async () => {
      return db.records.where(filters)
    })
    .catch((e) => {
      throw new StorageError(`Could not get Records - ${e.stack}`)
    })
}
