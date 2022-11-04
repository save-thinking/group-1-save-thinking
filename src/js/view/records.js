import * as util from './utility.js'

const addRecordModal = document.querySelector('#add-record-modal')
const addRecordButton = document.querySelector('#add-record-btn')
const navBarQuickAdd = document.querySelector('#add-record')
const recordModalCancelBtn = document.querySelector('#record-modal-cancel-btn')
const recordModalAddBtn = document.querySelector('#record-modal-add-btn')
const recordModalForm = document.querySelector('#add-record-form')
const toggleAddRecordModalVisibility = () => {
  addRecordModal.classList.toggle('hidden')
}

const recordList = document.querySelector('#record-list')

// the dummy record
const testRecordData = [{
  record_type: 'Expense',
  record_source_account: 'BofA Account',
  record_destination_account: 'BofA Account',
  record_amount: '-123',
  currency: 'USD',
  record_note: 'this is the note',
  record_created_time: '2018-07-22',
  record_tag: '1'
},
{
  record_type: 'Expense',
  record_source_account: 'Credit Card',
  record_destination_account: 'Credit Card',
  record_amount: '-100',
  currency: 'USD',
  record_note: 'this is the note2',
  record_created_time: '2018-07-26',
  record_tag: '2'
}]

// this function would be called every time the page is loaded
document.addEventListener('DOMContentLoaded', () => {
  testRecordData.map((record) => addRecordCard(record))
})

addRecordButton.onclick = (e) => {
  toggleAddRecordModalVisibility()
}
navBarQuickAdd.onclick = (e) => {
  toggleAddRecordModalVisibility()
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
  testRecordData.push(formJson)
  addRecordCard(formJson)
  toggleAddRecordModalVisibility()
}

document.onkeyup = (e) => {
  if (e.key === 'q' && addRecordModal.classList.contains('hidden')) {
    toggleAddRecordModalVisibility()
  }
}

const addRecordCard = (account) => {
  recordList.prepend(recordCardComponent(account))
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
    <p class="text-sm font-medium text-gray-900 truncate">${record.record_type}</p>
    <p class="text-sm text-gray-500 truncate">${record.record_created_time}</p>
  </div>
  <div class="flex-1 min-w-0">
    <p class="text-sm font-medium text-gray-900 truncate">
      ${record.record_note}
    </p>
    <p class="text-sm text-gray-500 truncate">${record.record_source_account}</p>
  </div>
  <div class="inline-flex items-center text-base text-red-600">
   ${util.getBalanceWithCurrency(record.record_amount, record.currency)}
  </div>
</div>`
  return recordCard
}