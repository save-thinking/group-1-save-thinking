import * as util from './utility.js'
import * as template from './template.js'

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

recordModalForm.innerHTML = template.recordForm()

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
  recordCard.innerHTML = template.recordCard(
                            record.record_type, // type of record
                            record.record_created_time, // record time
                            record.record_note, // record note
                            record.record_source_account, // record source account
                            util.getAmountWithCurrency(record.record_amount, record.currency) // balance with currency string
                          )
  return recordCard
}
