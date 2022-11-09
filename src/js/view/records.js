import * as recordService from '../domain/record.js'
import * as accountService from '../domain/account.js'
import { recordModal, recordCardComponent } from './components.js'

const recordList = document.querySelector('#record-list')
const addRecordButton = document.querySelector('#add-record-btn')
const recordModalRecordType = recordModal.querySelector('#grid-record-type')
const dstAccountDropDown = recordModal.querySelector(
  '#grid-destination-account'
)
const srcAccountDropDown = recordModal.querySelector('#grid-source-account')
const recordModalCancelBtn = recordModal.querySelector(
  '#record-modal-cancel-btn'
)
const recordModalAddBtn = recordModal.querySelector('#record-modal-add-btn')
const recordModalForm = recordModal.querySelector('#add-record-form')

const toggleAddRecordModalVisibility = () => {
  recordModal.classList.toggle('hidden')
  expenseTypeChangeHandle('expense')
}

document.addEventListener('DOMContentLoaded', () => {
  document.body.appendChild(recordModal)
  recordService.getAllRecords().then((records) => {
    records.map((record) => addRecordCard(record))
  })
})
recordModalRecordType &&
  recordModalRecordType.addEventListener('change', (e) => {
    expenseTypeChangeHandle(e.target.value)
  }) &&
  recordModalRecordType.addEventListener('click', (e) => {
    expenseTypeChangeHandle(e.target.value)
  })

addRecordButton &&
  addRecordButton.addEventListener('click', (e) => {
    toggleAddRecordModalVisibility()
  })

recordModalCancelBtn &&
  recordModalCancelBtn.addEventListener('click', (e) =>
    toggleAddRecordModalVisibility()
  )

recordModalAddBtn &&
  recordModalAddBtn.addEventListener('click', (e) => {
    const formData = new FormData(recordModalForm)
    const formJson = {}
    for (const pair of formData.entries()) {
      formJson[pair[0]] = pair[1]
    }
    recordService.addRecord(formJson).then((record) => {
      addRecordCard(record)
    })
    toggleAddRecordModalVisibility()
  })

const populateDropDown = (element, filter) => {
  element.replaceChildren()
  accountService.getAllAccounts(filter).then((accounts) => {
    accounts
      .map((account) => accountDropDown(account))
      .forEach((dropdown) => element.prepend(dropdown))
  })
}
const expenseTypeChangeHandle = (recordType) => {
  switch (recordType) {
    case 'expense':
      populateDropDown(srcAccountDropDown, { source: 'USER' })
      populateDropDown(dstAccountDropDown, { type: 'expense' })
      break
    case 'income':
      populateDropDown(srcAccountDropDown, { type: 'income' })
      populateDropDown(dstAccountDropDown, { source: 'USER' })
      break
    case 'transfer':
      populateDropDown(srcAccountDropDown, { source: 'USER' })
      populateDropDown(dstAccountDropDown, { source: 'USER' })
      break
  }
}

const accountDropDown = (account) => {
  const node = document.createElement('option')
  node.value = account.id
  node.innerText = `${account.emoji} ${account.name}`
  return node
}

const addRecordCard = (account) => {
  recordList && recordList.prepend(recordCardComponent(account))
}
