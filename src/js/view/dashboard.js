const navBarQuickAdd = document.querySelector('#add-record')
const addAccountModal = document.querySelector('#add-account-modal')
const addAccountButton = document.querySelector('#add-account-btn')
const accountModalCancelButton = document.querySelector(
  '#account-modal-cancel-btn'
)
const accountModalAddButton = document.querySelector('#add-account-modal-btn')
const accountModalAddForm = document.querySelector('#add-account-form')
const addRecordModal = document.querySelector('#add-record-modal')
const recordModalCancelBtn = document.querySelector('#record-modal-cancel-btn')
const recordModalAddBtn = document.querySelector('#record-modal-add-btn')
const recordModalForm = document.querySelector('#add-record-form')
const accountList = document.querySelector('#account-list')

const testDashboardData = [
  {
    account_name: 'Bank of America',
    account_type: 'checking-account',
    initial_balance: 4200,
    currency: 'USD'
  },
  {
    account_name: 'Citibank',
    account_type: 'credit-card',
    initial_balance: -1200,
    currency: 'USD'
  },
  {
    account_name: 'Wallet',
    account_type: 'cash',
    initial_balance: 22.6,
    currency: 'USD'
  }
]

// this function would be called every time the page is loaded
document.addEventListener('DOMContentLoaded', () => {
  testDashboardData.map((account) => addAccountCard(account))
})

/* Utilities */
const toggleAddAccountModalVisibility = () => {
  addAccountModal.classList.toggle('hidden')
}
const toggleAddRecordModalVisibility = () => {
  addRecordModal.classList.toggle('hidden')
}

/* Event Listeners */
addAccountButton.onclick = (e) => {
  toggleAddAccountModalVisibility()
}

accountModalCancelButton.onclick = (e) => {
  toggleAddAccountModalVisibility()
}
navBarQuickAdd.onclick = (e) => {
  toggleAddRecordModalVisibility()
}

accountModalAddButton.onclick = (e) => {
  const formData = new FormData(accountModalAddForm)
  const formJson = {}
  for (const pair of formData.entries()) {
    formJson[pair[0]] = pair[1]
  }
  testDashboardData.push(formJson)
  addAccountCard(formJson)
  toggleAddAccountModalVisibility()
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
  toggleAddRecordModalVisibility()
}

document.onkeyup = (e) => {
  if (e.key === 'q' && addRecordModal.classList.contains('hidden')) {
    toggleAddRecordModalVisibility()
  }
}

const addAccountCard = (account) => {
  accountList.prepend(accountCardComponent(account))
}

// helper function to return sign of account
const getBalanceColor = (balance) => {
  if (balance < 0) {
    return 'red'
  } else {
    return 'green'
  }
}

// helper function to return currency with balance as string
const getBalanceWithCurrency = (balance, currency) => {
  const currencySign = getCurrencySign(currency)
  if (balance < 0) {
    return '-' + currencySign + Math.abs(balance).toString()
  } else {
    return currencySign + balance.toString()
  }
}

// helper function to return sign of account
const getAccountTypeSign = (accountTypeString) => {
  switch (accountTypeString) {
    case 'checking-account':
      return '🏦'
    case 'savings-account':
      return '🏥'
    case 'cash':
      return '💸'
    case 'credit-card':
      return '💳'
    default:
      return ''
  }
}

// helper function to return account type name to be displayed
const getAccountType = (accountTypeString) => {
  switch (accountTypeString) {
    case 'checking-account':
      return 'Checking Account'
    case 'savings-account':
      return 'Savings Account'
    case 'cash':
      return 'Cash'
    case 'credit-card':
      return 'Credit Card'
    default:
      return ''
  }
}

// helper function to return sign of currency
const getCurrencySign = (currencyString) => {
  switch (currencyString) {
    case 'USD':
      return '$'
    case 'INR':
      return '₹'
    case 'EUR':
      return '€'
    default:
      return ''
  }
}

const accountCardComponent = (account) => {
  const accountCard = document.createElement('div')
  accountCard.classList =
    'container p-4 m-2 h-full items-stretch max-w-xs bg-white rounded-lg border shadow-md sm:p-8 hover:bg-slate-50'
  accountCard.innerHTML = `<div class='sm:py-4'>
  <div class='flex items-center space-x-4'>
    <div class='flex'>
      <div class='text-2xl rounded-full'>${getAccountTypeSign(
        account.account_type
      )}</div>
    </div>
    <div class='flex-1 min-w-0'>
      <p class='text-sm font-medium text-gray-900 truncate'>
      ${account.account_name}
      </p>
      <p class='text-xs text-gray-500 truncate'>${getAccountType(
        account.account_type
      )}</p>
    </div>
    <div class='inline-flex items-center text-base text-${getBalanceColor(
      account.initial_balance
    )}-600'>
    ${getBalanceWithCurrency(account.initial_balance, account.currency)}
    </div>
  </div>
</div>`
  return accountCard
}
