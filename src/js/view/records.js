const addRecordModal = document.querySelector('#add-record-modal')
const addRecordButton = document.querySelector('#add-record-btn')
const navBarQuickAdd = document.querySelector('#add-record')
const recordModalCancelBtn = document.querySelector('#record-modal-cancel-btn')
const recordModalAddBtn = document.querySelector('#record-modal-add-btn')
const recordModalForm = document.querySelector('#add-record-form')
const toggleAddRecordModalVisibility = () => {
  addRecordModal.classList.toggle('hidden')
}

const recordsPlaceholder = document.querySelector('#record-list');

// the dummy record 
const testRecordData = [{
  "record_type": "Expense",
  "record_source_account": "BofA Account",
  "record_destination_account": "BofA Account",
  "record_amount": "123",
  "currency": "USD",
  "record_note": "1000",
  "record_created_time": "2018-07-22",
  "record_tag": "1"
}]

// this function would be called every time the page is loaded
document.addEventListener("DOMContentLoaded", function() {
  createListWithInnerHTML(testRecordData)
});

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
  alert(JSON.stringify(formJson))
  toggleAddRecordModalVisibility()
}

document.onkeyup = (e) => {
  if (e.key === 'q' && addRecordModal.classList.contains('hidden')) {
    toggleAddRecordModalVisibility()
  }
}

function createListWithInnerHTML(records) {
  // gereate the list of records HTML
  const rows = records.map(record => {
    return `<li class="py-3 sm:py-4">
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
      ${record.record_amount}
      </div>
    </div>
  </li>`;
  });
  const html = `<ul>${rows.join()}</ul>`;


  console.log(html)

  // put the HTML into the web page
  recordsPlaceholder.innerHTML = html;
}

