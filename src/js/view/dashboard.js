import * as util from './utility.js'
import * as accountService from '../domain/account.js'
// import * as recordService from '../domain/record.js'
const navBarQuickAdd = document.querySelector('#add-record')
const addAccountModal = document.querySelector('#add-account-modal')
const addAccountButton = document.querySelector('#add-account-btn')
const accountModalCancelButton = document.querySelector(
  '#account-modal-cancel-btn'
)
const accountModalAddButton = document.querySelector('#add-account-modal-btn')
const accountModalAddForm = document.querySelector('#add-account-form')
const addRecordModal = document.querySelector('#add-record-modal')
const accountList = document.querySelector('#account-list')

// this function would be called every time the page is loaded
document.addEventListener('DOMContentLoaded', () => {
  accountService.getAllUserAccounts().then((accounts) => {
    accounts.forEach((account) => {
      addAccountCard(account)
    })
  })
})

/* Utilities */
const toggleAddAccountModalVisibility = () => {
  addAccountModal.classList.toggle('hidden')
}
const toggleAddRecordModalVisibility = () => {
  addRecordModal.classList.toggle('hidden')
}

/* Event Listeners */
addAccountButton &&
  addAccountButton.addEventListener('click', (e) => {
    toggleAddAccountModalVisibility()
  })
accountModalCancelButton &&
  accountModalCancelButton.addEventListener('click', (e) => {
    toggleAddAccountModalVisibility()
  })

navBarQuickAdd &&
  navBarQuickAdd.addEventListener('click', (e) => {
    toggleAddRecordModalVisibility()
  })

accountModalAddButton &&
  accountModalAddButton.addEventListener('click', (e) => {
    const formData = new FormData(accountModalAddForm)
    const formJson = {}
    for (const pair of formData.entries()) {
      formJson[pair[0]] = pair[1]
    }
    accountService.addAccount(formJson).then((account) => {
      addAccountCard(account)
    })
    toggleAddAccountModalVisibility()
  })

document.onkeyup = (e) => {
  if (e.key === 'q' && addRecordModal.classList.contains('hidden')) {
    toggleAddRecordModalVisibility()
  }
}

const addAccountCard = (account) => {
  accountList && accountList.prepend(accountCardComponent(account))
}

const accountCardComponent = (account) => {
  const accountCard = document.createElement('div')
  accountCard.classList =
    'container p-4 m-2 h-full items-stretch max-w-xs bg-white rounded-lg border shadow-md sm:p-8 hover:bg-slate-50'
  accountCard.innerHTML = `<div class='sm:py-4'>
  <div class='flex items-center space-x-4'>
    <div class='flex'>
      <div class='text-2xl rounded-full'>${account.emoji}</div>
    </div>
    <div class='flex-1 min-w-0'>
      <p class='text-sm font-medium text-gray-900 truncate'>
      ${account.name}
      </p>
      <p class='text-xs text-gray-500 truncate'>${util.getAccountType(
        account.type
      )}</p>
    </div>
    <div class='inline-flex items-center text-base text-${util.getBalanceColor(
      account.current_balance
    )}-600'>
    ${util.getBalanceWithCurrency(account.current_balance, account.currency)}
    </div>
  </div>
</div>`
  return accountCard
}
