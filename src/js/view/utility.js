// helper function to return sign of account
export function getBalanceColor (balance) {
  if (balance < 0) {
    return 'red'
  } else {
    return 'green'
  }
}

// helper function to return currency with balance as string
export function getAmountWithCurrency (amount, currency) {
  const currencySign = getCurrencySign(currency)
  if (amount < 0) {
    return '-' + currencySign + Math.abs(amount).toString()
  } else {
    return currencySign + amount.toString()
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
