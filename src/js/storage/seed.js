import { storeAccount } from './mock.js'
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
export const EXPENSE_ACCOUNTS = Object.entries(EXPENSE)
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
const INCOME = {
  Salary: '💰',
  Interest: '🀄',
  Refunds: '🔄'
}

export const INCOME_ACCOUNTS = Object.entries(INCOME)
  .map(([name, emoji]) => {
    return {
      name,
      emoji,
      fund_source: 'SEED',
      fund_type: 'income',
      initial_balance: 0.0
    }
  })
  .forEach((e) => storeAccount(e))
