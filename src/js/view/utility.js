// helper function to return sign of account
// https://tailwindcss.com/docs/content-configuration#dynamic-class-names
export function getBalanceColor (balance) {
  if (balance < 0) {
    return 'text-red-600'
  } else {
    return 'text-green-600'
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
