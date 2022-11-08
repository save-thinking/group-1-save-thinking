import * as accountService from '../domain/account.js'
import { recordModal, accountCardComponent } from './components.js'
const navBarQuickAdd = document.querySelector('#add-record')
const addAccountModal = document.querySelector('#add-account-modal')
const addAccountButton = document.querySelector('#add-account-btn')
const accountModalCancelButton = document.querySelector(
  '#account-modal-cancel-btn'
)
const accountModalAddButton = document.querySelector('#add-account-modal-btn')
const accountModalAddForm = document.querySelector('#add-account-form')
const accountList = document.querySelector('#account-list')

// this function would be called every time the page is loaded
document.addEventListener('DOMContentLoaded', () => {
  document.body.appendChild(recordModal)
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
  recordModal.classList.toggle('hidden')
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
  if (e.key === 'q' && recordModal.classList.contains('hidden')) {
    toggleAddRecordModalVisibility()
  }
}

const addAccountCard = (account) => {
  accountList && accountList.prepend(accountCardComponent(account))
}
