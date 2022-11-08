import { db } from './idb.js'
import { StorageError } from './exceptions.js'
import { uuidv4 } from './utils.js'
export async function storeRecord (record) {
  record.id = uuidv4()
  await db
    .transaction('rw', db.records, async () => {
      db.records.add(record)
    })
    .catch((e) => {
      throw new StorageError(`Failed to store record ${e.stack}`)
    })
  return record
}

export async function updateRecord (id, record) {
  await db
    .transaction('rw', db.records, async () => {
      const updated = await db.records.update(id, record)
      if (!updated) {
        throw new StorageError(`Could not find Record ${id}`)
      }
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
