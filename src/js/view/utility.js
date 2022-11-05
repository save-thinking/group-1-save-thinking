// helper function to return sign of account
export function getBalanceColor (balance) {
  if (balance < 0) {
    return 'red'
  } else {
    return 'green'
  }
}

// helper function to return currency with balance as string
export function getBalanceWithCurrency (balance, currency) {
  const currencySign = getCurrencySign(currency)
  if (balance < 0) {
    return '-' + currencySign + Math.abs(balance).toString()
  } else {
    return currencySign + balance.toString()
  }
}

// helper function to return sign of account
export function getAccountTypeSign (accountTypeString) {
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
export function getAccountType (accountTypeString) {
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
export function getCurrencySign (currencyString) {
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

// wrapper function to check if the element exist before addEventListener
export function addEventListener (element, eventListenerType, f) {
  if (element !== undefined && element !== null) {
    element.addEventListener(eventListenerType, (e) => {
      console.log('eventListenerMiddleWare')
      f(e)
    })
  }
}

// onLoad function would be called every time the page is loaded
export function onLoad (f) {
  document.addEventListener('DOMContentLoaded', f)
}
