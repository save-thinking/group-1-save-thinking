import * as util from './utility.js'
import * as recordService from '../domain/record.js'
import * as accountService from '../domain/account.js'

const addRecordModal = document.querySelector('#add-record-modal')
const addRecordButton = document.querySelector('#add-record-btn')
const recordModalRecordType = document.querySelector('#grid-record-type')
const dstAccountDropDown = document.querySelector('#grid-destination-account')
const srcAccountDropDown = document.querySelector('#grid-source-account')
const recordList = document.querySelector('#record-list')
const recordModalCancelBtn = document.querySelector('#record-modal-cancel-btn')
const recordModalAddBtn = document.querySelector('#record-modal-add-btn')
const recordModalForm = document.querySelector('#add-record-form')

const toggleAddRecordModalVisibility = () => {
  addRecordModal.classList.toggle('hidden')
  expenseTypeChangeHandle('expense')
}

document.addEventListener('DOMContentLoaded', () => {
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

document.onkeyup = (e) => {
  if (e.key === 'q' && addRecordModal.classList.contains('hidden')) {
    toggleAddRecordModalVisibility()
  }
}

const addRecordCard = (account) => {
  recordList && recordList.prepend(recordCardComponent(account))
}

const recordCardComponent = (record) => {
  const recordCard = document.createElement('div')
  recordCard.classList = 'py-3 sm:py-4'
  recordCard.innerHTML = `
<div class="flex items-center space-x-4">
  <div class="flex">
    <div class="text-2xl rounded-full">${record.destination_account.emoji}</div>
  </div>
  <div class="flex-1 min-w-0">
    <p class="text-sm font-medium text-gray-900 truncate">${
      record.destination_account.name
    }</p>
    <p class="text-sm text-gray-500 truncate">${record.created_at}</p>
  </div>
  <div class="flex-1 min-w-0">
    <p class="text-sm font-medium text-gray-900 truncate">
      ${record.note}
    </p>
    <p class="text-sm text-gray-500 truncate">${record.source_account.name}</p>
  </div>
  <div class="inline-flex items-center text-base text-${
    RECORD_AMOUNT_COLOR_LOOKUP[record.type]
  }-600">
   ${util.getBalanceWithCurrency(record.amount, record.currency)}
  </div>
</div>`
  return recordCard
}

const RECORD_AMOUNT_COLOR_LOOKUP = {
  expense: 'red',
  income: 'green',
  transfer: 'slate'
}
