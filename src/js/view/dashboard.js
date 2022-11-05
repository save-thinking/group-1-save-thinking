import * as util from './utility.js'
import * as template from './template.js'

const navBarQuickAdd = document.querySelector('#add-record')
const addAccountModal = document.querySelector('#add-account-modal')
const addAccountButton = document.querySelector('#add-account-btn')
const accountModalCancelButton = document.querySelector(
  '#account-modal-cancel-btn'
)
const accountModalAddButton = document.querySelector('#add-account-modal-btn')
const accountModalAddForm = document.querySelector('#add-account-form')
const addRecordModal = document.querySelector('#add-record-modal')
const recordModalCancelBtn = document.querySelector('#record-modal-cancel-btn')
const recordModalAddBtn = document.querySelector('#record-modal-add-btn')
const recordModalForm = document.querySelector('#add-record-form')
const accountList = document.querySelector('#account-list')

const testDashboardData = [
  {
    account_name: 'Bank of America',
    account_type: 'checking-account',
    initial_balance: 4200,
    currency: 'USD'
  },
  {
    account_name: 'Citibank',
    account_type: 'credit-card',
    initial_balance: -1200,
    currency: 'USD'
  },
  {
    account_name: 'Wallet',
    account_type: 'cash',
    initial_balance: 22.6,
    currency: 'USD'
  }
]

recordModalForm.innerHTML = template.recordForm()

// this function would be called every time the page is loaded
document.addEventListener('DOMContentLoaded', () => {
  testDashboardData.map((account) => addAccountCard(account))
})

/* Utilities */
const toggleAddAccountModalVisibility = () => {
  addAccountModal.classList.toggle('hidden')
}
const toggleAddRecordModalVisibility = () => {
  addRecordModal.classList.toggle('hidden')
}

/* Event Listeners */
addAccountButton.onclick = (e) => {
  toggleAddAccountModalVisibility()
}

accountModalCancelButton.onclick = (e) => {
  toggleAddAccountModalVisibility()
}
navBarQuickAdd.onclick = (e) => {
  toggleAddRecordModalVisibility()
}

accountModalAddButton.onclick = (e) => {
  const formData = new FormData(accountModalAddForm)
  const formJson = {}
  for (const pair of formData.entries()) {
    formJson[pair[0]] = pair[1]
  }
  testDashboardData.push(formJson)
  addAccountCard(formJson)
  toggleAddAccountModalVisibility()
}

recordModalCancelBtn.onclick = (e) => {
  toggleAddRecordModalVisibility()
}
recordModalAddBtn.onclick = (e) => {
  const formData = new FormData(recordModalForm)
  const formJson = {}
  for (const pair of formData.entries()) {
    formJson[pair[0]] = pair[1]
  }
  toggleAddRecordModalVisibility()
}

document.onkeyup = (e) => {
  if (e.key === 'q' && addRecordModal.classList.contains('hidden')) {
    toggleAddRecordModalVisibility()
  }
}

const addAccountCard = (account) => {
  accountList.prepend(accountCardComponent(account))
}

const accountCardComponent = (account) => {
  const accountCard = document.createElement('div')
  accountCard.classList =
    'container p-4 m-2 h-full items-stretch max-w-xs bg-white rounded-lg border shadow-md sm:p-8 hover:bg-slate-50'
  accountCard.innerHTML = template.accountCard(
    util.getAccountTypeSign(account.account_type), // account sign
    account.account_name, // account name
    util.getAccountType(account.account_type), // account type name
    util.getBalanceColor(account.initial_balance), // balance color
    util.getAmountWithCurrency(account.initial_balance, account.currency) // balance with currency sign
  )
  return accountCard
}
