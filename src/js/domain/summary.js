import * as recordStore from '../storage/record.js'
import * as accountStore from '../storage/account.js'
import * as recordService from './record.js'

export async function getCashFlow () {
  let records = await recordStore.getAllRecords()
  records = await records.toArray()
  let accounts = await accountStore.getAccountMulti({ source: 'USER' })
  accounts = await accounts.toArray()
  return {
    balance: accounts
      .map((acc) => Number(acc.current_balance))
      .reduce((a, b) => a + b),
    expense: records
      .filter((r) => r.type === 'expense')
      .map((r) => Number(r.amount))
      .reduce((a, b) => a + b, 0),
    income: records
      .filter((r) => r.type === 'income')
      .map((r) => Number(r.amount))
      .reduce((a, b) => a + b, 0)
  }
}

export async function getLatestRecords () {
  let records = await recordService.getAllRecords()
  records = records.map((record) =>
    Object.assign({}, record, { created_at: Date.parse(record.created_at) })
  )
  records.sort((a, b) => (a.created_at > b.created_at ? -1 : 1))
  records = records.slice(0, 5)
  return records.map((record) =>
    Object.assign({}, record, {
      created_at: new Date(record.created_at).toDateString()
    })
  )
}

export async function getExpenseByCategories () {
  let records = await recordService.getAllRecords()
  records = records
    .filter((record) => record.type === 'expense')
    .map((record) =>
      Object.assign({}, record, { amount: Number(record.amount) })
    )
  const result = {}
  records.forEach((record) => {
    if (!result[record.destination_account.name]) {
      result[record.destination_account.name] = record.amount
    } else {
      result[record.destination_account.name] += record.amount
    }
  })
  return result
}
