/** Storage Service - IDB
 * Schema Definitions
 @module storage/idb
 */
import { StorageError } from './exceptions.js'
import { Dexie } from 'dexie'

export const db = new Dexie('sync-save')
db.version(1).stores({
  accounts:
    'id, name, source, type, initial_balance, current_balance, currency, created_at, updated_at',
  records:
    'id, source_account, destination_acount, amount, currency, type, note, tag, created_at, updated_at'
})
db.open().catch((e) => {
  throw new StorageError(`Failed to Open DB ${e.stack}`)
})
