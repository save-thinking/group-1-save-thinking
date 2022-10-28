const navBarQuickAdd = document.querySelector('#add-record')
const addAccountModal = document.querySelector('#add-account-modal')
const addAccountButton = document.querySelector('#add-account-btn')
const accountModalCancelButton = document.querySelector(
  '#account-modal-cancel-btn'
)
const accountModalAddButton = document.querySelector('#add-account-modal-btn')
const accountModalAddForm = document.querySelector('#add-account-form')

/* Utilities */
const toggleAddAccountModalVisibility = () => {
  addAccountModal.classList.toggle('hidden')
}

/* Event Listeners */
addAccountButton.onclick = (e) => {
  toggleAddAccountModalVisibility()
}

accountModalCancelButton.onclick = (e) => {
  toggleAddAccountModalVisibility()
}
navBarQuickAdd.onclick = (e) => {
  alert('TODO: Dynamically Load Add Record Model as defined in records.html')
}

accountModalAddButton.onclick = (e) => {
  const formData = new FormData(accountModalAddForm)
  const formJson = {}
  for (const pair of formData.entries()) {
    formJson[pair[0]] = pair[1]
  }
  alert(JSON.stringify(formJson))
  toggleAddAccountModalVisibility()
}
