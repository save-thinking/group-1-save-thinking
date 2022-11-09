import { db } from './idb.js'
import { StorageError } from './exceptions.js'
import { uuidv4 } from './utils.js'

export async function storeAccount (account) {
  account.id = uuidv4()
  await db
    .transaction('rw', db.accounts, async () => {
      db.accounts.add(account)
    })
    .catch((e) => {
      throw new StorageError(`Failed to store account ${e.stack}`)
    })
  return account
}

export async function updateAccount (id, account) {
  await db
    .transaction('rw', db.accounts, async () => {
      const updated = await db.accounts.update(id, account)
      if (!updated) {
        throw new StorageError(`Could not find Account ${id}`)
      }
    })
    .catch((e) => {
      throw new StorageError(`Failed to update account ${e.stack}`)
    })
  return account
}

export async function getAccount (id) {
  return db
    .transaction('r', db.accounts, async () => db.accounts.get(id))
    .catch((e) => {
      throw new StorageError(`Could not get Account - ${e.stack}`)
    })
}
export async function getAllAccounts (filters) {
  return db
    .transaction('r', db.accounts, async () => {
      return db.accounts
    })
    .catch((e) => {
      throw new StorageError(`Could not get Accounts - ${e.stack}`)
    })
}
export async function getAccountMulti (filters = {}) {
  return db
    .transaction('r', db.accounts, async () => {
      return db.accounts.where(filters)
    })
    .catch((e) => {
      throw new StorageError(`Could not get Accounts - ${e.stack}`)
    })
}
/* All Seeded Accounts are pre-existing categories for Income/Expenses.
   Each will have the following fields
   - name
   - fund_source => SEED
   - fund_type
   - initial_balance
   - Emoji
   Expense Categories
*/
const EXPENSE = {
  Food: '🍕',
  Groceries: '🥫',
  Alcohol: '🍻',
  Shopping: '🛒',
  Entertainment: '💃',
  Learning: '📚',
  Transport: '🚕',
  Events: '🎉',
  Investments: '🐖',
  Housing: '🏡'
}

const INCOME = {
  Salary: '💰',
  Interest: '🀄',
  Refunds: '🔄'
}

db.on('populate', (tx) => {
  // Use provided transaction to populate database with initial data
  Object.entries(EXPENSE)
    .map(([name, emoji]) => {
      return {
        name,
        emoji,
        source: 'SEED',
        type: 'expense',
        initial_balance: 0.0,
        current_balance: 0.0
      }
    })
    .forEach((e) => storeAccount(e))
  Object.entries(INCOME)
    .map(([name, emoji]) => {
      return {
        name,
        emoji,
        source: 'SEED',
        type: 'income',
        initial_balance: 0.0,
        current_balance: 0.0
      }
    })
    .forEach((e) => {
      storeAccount(e)
    })
})
