/** View Service - Dashboard
 @module view/dashboard
 */
import { Chart, registerables } from 'chart.js'
import * as accountService from '../domain/account.js'
import * as summaryService from '../domain/summary.js'
import {
  recordModal,
  accountCardComponent,
  latestRecordCardComponent,
  COLORS
} from './components.js'
const navBarQuickAdd = document.querySelector('#add-record')
const addAccountModal = document.querySelector('#add-account-modal')
const addAccountButton = document.querySelector('#add-account-btn')
const accountModalCancelButton = document.querySelector(
  '#account-modal-cancel-btn'
)
const accountModalAddButton = document.querySelector('#add-account-modal-btn')
const accountModalAddForm = document.querySelector('#add-account-form')
const accountList = document.querySelector('#account-list')
const cashflowCardBalance = document.querySelector('#cashflow-card-balance')
const cashflowCardExpense = document.querySelector('#cashflow-card-expense')
const cashflowCardIncome = document.querySelector('#cashflow-card-income')
const cashflowChart = document.getElementById('cashflow-chart')
const latestRecordsList = document.getElementById('recent-records')
const donut = document.getElementById('expense-donut-chart')
Chart.register(...registerables)

// this function would be called every time the page is loaded
document.addEventListener('DOMContentLoaded', () => {
  document.body.appendChild(recordModal)
  accountService.getAllUserAccounts().then((accounts) => {
    accounts.forEach((account) => {
      addAccountCard(account)
    })
  })
  populateSummary()
})

/* Utilities */
const toggleAddAccountModalVisibility = () => {
  addAccountModal.classList.toggle('hidden')
}
const toggleAddRecordModalVisibility = () => {
  recordModal.classList.toggle('hidden')
}

const populateSummary = () => {
  populateCashFlow()
  populateLatestRecords()
  populateExpenseByCategories()
}

/* Event Listeners */
addAccountButton &&
  addAccountButton.addEventListener('click', (e) => {
    toggleAddAccountModalVisibility()
  })
accountModalCancelButton &&
  accountModalCancelButton.addEventListener('click', (e) => {
    toggleAddAccountModalVisibility()
  })

navBarQuickAdd &&
  navBarQuickAdd.addEventListener('click', (e) => {
    toggleAddRecordModalVisibility()
  })

accountModalAddButton &&
  accountModalAddButton.addEventListener('click', (e) => {
    const formData = new FormData(accountModalAddForm)
    const formJson = {}
    for (const pair of formData.entries()) {
      formJson[pair[0]] = pair[1]
    }
    accountService.addAccount(formJson).then((account) => {
      addAccountCard(account)
    })
    toggleAddAccountModalVisibility()
  })

document.onkeyup = (e) => {
  if (e.ctrlKey && e.key === 'q') {
    toggleAddRecordModalVisibility()
  }
}

const addAccountCard = (account) => {
  accountList && accountList.prepend(accountCardComponent(account))
}

const populateCashFlow = async () => {
  const cashflow = await summaryService.getCashFlow()
  cashflowCardBalance.innerHTML = `$${cashflow.balance}`
  cashflowCardExpense.innerHTML = `$${cashflow.expense}`
  cashflowCardIncome.innerHTML = `$${cashflow.income}`
  const cashflowData = {
    labels: ['Income', 'Expense'],
    datasets: [
      {
        label: 'Category',
        data: [cashflow.income, cashflow.expense],
        backgroundColor: ['rgb(34, 197, 94)', 'rgb(225, 29, 72)'],
        borderWidth: 1,
        barThickness: 20
      }
    ]
  };
  (() =>
    new Chart(cashflowChart, {
      type: 'bar',
      data: cashflowData,
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    }))()
}

const populateLatestRecords = async () => {
  let records = await summaryService.getLatestRecords()
  records = records.map((record) => latestRecordCardComponent(record))
  records.forEach((record) => latestRecordsList.appendChild(record))
}

const populateExpenseByCategories = async () => {
  const answer = await summaryService.getExpenseByCategories()
  const data = {
    labels: Object.keys(answer),
    datasets: [
      {
        label: 'Amount',
        data: Object.values(answer),
        backgroundColor: COLORS.slice(0, Object.keys(answer).length),
        hoverOffset: 4
      }
    ]
  };
  (() =>
    new Chart(donut, {
      type: 'doughnut',
      data,
      options: {
        responsive: false
      }
    }))()
}
