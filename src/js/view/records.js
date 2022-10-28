const addRecordModal = document.querySelector('#add-record-modal')
const addRecordButton = document.querySelector('#add-record-btn')
const navBarQuickAdd = document.querySelector('#add-record')
const recordModalCancelBtn = document.querySelector('#record-modal-cancel-btn')
const recordModalAddBtn = document.querySelector('#record-modal-add-btn')
const recordModalForm = document.querySelector('#add-record-form')
const toggleAddRecordModalVisibility = () => {
  addRecordModal.classList.toggle('hidden')
}

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
