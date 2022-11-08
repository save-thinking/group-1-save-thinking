import * as util from './utility.js'
import * as recordService from '../domain/record.js'
import * as accountService from '../domain/account.js'

const addRecordModal = document.querySelector('#add-record-modal')
const addRecordButton = document.querySelector('#add-record-btn')
const recordModalRecordType = document.querySelector('#grid-record-type')
const recordModalDestinationAccountDropDown = document.querySelector(
  '#grid-destination-account'
)
const recordModalSourceAccountDropDown = document.querySelector(
  '#grid-source-account'
)
const recordList = document.querySelector('#record-list')

const toggleAddRecordModalVisibility = () => {
  addRecordModal.classList.toggle('hidden')
}

const populateDropDown = (element, filter) => {
  console.log(element)
  console.log(filter)
  element.replaceChildren()
  accountService.getAllAccounts(filter).then((accounts) => {
    accounts
      .map((account) => accountDropDown(account))
      .forEach((dropdown) =>
        recordModalSourceAccountDropDown.prepend(dropdown)
      )
  })
}

document.addEventListener('DOMContentLoaded', () => {
  recordService.getAllRecords().then((records) => {
    records.map((record) => addRecordCard(record))
  })
})
recordModalRecordType &&
  recordModalRecordType.addEventListener('change', (e) => {
    expenseTypeChangeHandle(e)
  }) &&
  recordModalRecordType.addEventListener('click', (e) => {
    expenseTypeChangeHandle(e)
  })
// TODO - DEBUG
function expenseTypeChangeHandle (e) {
  switch (e.target.value) {
    case 'expense':
      console.log('ROBUG')
      populateDropDown(recordModalSourceAccountDropDown, { source: 'USER' })
      populateDropDown(recordModalDestinationAccountDropDown, {
        type: 'expense'
      })
      break
    case 'income':
      populateDropDown(recordModalSourceAccountDropDown, { source: 'USER' })
      populateDropDown(recordModalDestinationAccountDropDown, {
        type: 'income'
      })
      break
    case 'transfer':
      populateDropDown(recordModalSourceAccountDropDown, { source: 'USER' })
      populateDropDown(recordModalDestinationAccountDropDown, {
        source: 'USER'
      })
      break
  }
}

const accountDropDown = (account) => {
  const node = document.createElement('option')
  node.value = account.id
  node.innerText = `${account.emoji} ${account.name}`
  return node
}
addRecordButton &&
  addRecordButton.addEventListener('click', (e) => {
    toggleAddRecordModalVisibility()
  })

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
    <div class="text-2xl rounded-full">🍕</div>
  </div>
  <div class="flex-1 min-w-0">
    <p class="text-sm font-medium text-gray-900 truncate">${
      record.record_type
    }</p>
    <p class="text-sm text-gray-500 truncate">${record.record_created_time}</p>
  </div>
  <div class="flex-1 min-w-0">
    <p class="text-sm font-medium text-gray-900 truncate">
      ${record.record_note}
    </p>
    <p class="text-sm text-gray-500 truncate">${
      record.record_source_account
    }</p>
  </div>
  <div class="inline-flex items-center text-base text-red-600">
   ${util.getBalanceWithCurrency(record.record_amount, record.currency)}
  </div>
</div>`
  return recordCard
}
