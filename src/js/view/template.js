export function accountCard (accountTypeSign, accountName, accountType, balanceColor, balanceWithCurrency) {
  return `<div class='sm:py-4'>
    <div class='flex items-center space-x-4'>
      <div class='flex'>
        <div class='text-2xl rounded-full'>${accountTypeSign}</div>
      </div>
      <div class='flex-1 min-w-0'>
        <p class='text-sm font-medium text-gray-900 truncate'>
        ${accountName}
        </p>
        <p class='text-xs text-gray-500 truncate'>${accountType}</p>
      </div>
      <div class='inline-flex items-center text-base text-${balanceColor}-600'>
        ${balanceWithCurrency}
      </div>
    </div>
  </div>`
}

export function recordCard (recordType, recordTime, recordNote, recordSourceAccount, amountWithCurrency) {
  return `<div class="flex items-center space-x-4">
  <div class="flex">
    <div class="text-2xl rounded-full">🍕</div>
  </div>
  <div class="flex-1 min-w-0">
    <p class="text-sm font-medium text-gray-900 truncate">${recordType}</p>
    <p class="text-sm text-gray-500 truncate">${recordTime}</p>
  </div>
  <div class="flex-1 min-w-0">
    <p class="text-sm font-medium text-gray-900 truncate">
      ${recordNote}
    </p>
    <p class="text-sm text-gray-500 truncate">${recordSourceAccount}</p>
  </div>
  <div class="inline-flex items-center text-base text-red-600">
   ${amountWithCurrency}
  </div>
</div>`
}

export function addRecordModal () {
  return `      <div
class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
></div>

<div class="fixed inset-0 z-10 overflow-y-auto">
<div
  class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
>
  <div
    class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
  >
    <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
      <div class="sm:flex sm:items-start">
        <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
          <form id="add-record-form" class="w-full max-w-xl mt-2">

              <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="record_destination_account"
                >
                  Destination
                </label>
                <div class="relative">
                  <select
                    name="record_destination_account"
                    class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-destination-account"
                  >
                    <option>BofA Account</option>
                    <option>Citi Credit Card</option>
                    <option>Cash</option>
                  </select>
                  <div
                    class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
                  >
                    <svg
                      class="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path
                        d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                      />
                    </svg>
                  </div>
                </div>
                <!-- <p class="text-red-500 text-xs italic">
                      Please fill out this field.
                    </p> -->
              </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-6">
              <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="record_amount"
                >
                  Amount
                </label>
                <input
                  name="record_amount"
                  class="appearance-none w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-amount"
                  type="number"
                  min="0.01"
                  placeholder="00.00"
                />
                <!-- <p class="text-red-500 text-xs italic">
                    Please fill out this field.
                  </p> -->
              </div>

              <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="currency"
                >
                  Currency
                </label>
                <div class="relative">
                  <select
                    name="currency"
                    class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-currency"
                  >
                    <option>USD</option>
                    <option>EUR</option>
                    <option>INR</option>
                  </select>
                  <div
                    class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
                  >
                    <svg
                      class="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path
                        d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                      />
                    </svg>
                  </div>
                </div>
                <!-- <p class="text-red-500 text-xs italic">
                      Please fill out this field.
                    </p> -->
              </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-6">
              <div class="w-full px-3">
                <label
                  class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="record_note"
                >
                  Note
                </label>
                <input
                  name="record_note"
                  class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-note"
                  type="text"
                  placeholder="Enter Note Here"
                />
                <!-- <p class="text-gray-600 text-xs italic">
                    Make it as long and as crazy as you'd like
                  </p> -->
              </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-2">
              <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label
                  class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="record_created_time"
                >
                  Date
                </label>
                <input
                  name="record_created_time"
                  class="inline-block appearance-none w-full block bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-created-time"
                  type="date"
                  value="2018-07-22"
                />
              </div>
              <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label
                  class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="record_tag"
                >
                  Tag
                </label>
                <input
                  class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-tag"
                  type="text"
                  name="record_tag"
                  placeholder="None"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    <div
      class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6"
    >
      <button
        id="record-modal-add-btn"
        type="button"
        class="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
      >
        Add Record
      </button>
      <button
        id="record-modal-cancel-btn"
        type="button"
        class="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
      >
        Cancel
      </button>
    </div>
  </div>
</div>
</div>`
}

export function recordForm () {
  return `<div class="flex flex-wrap -mx-3 mb-6">
  <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
    <label
      class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
      for="record_type"
    >
      Record Type
    </label>
    <div class="relative">
      <select
        name="record_type"
        class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        id="grid-record-type"
      >
        <option>Expense</option>
        <option>Income</option>
        <option>Transfer</option>
      </select>
      <div
        class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
      >
        <svg
          class="fill-current h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path
            d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
          />
        </svg>
      </div>
    </div>
  </div>
</div>
<div class="flex flex-wrap -mx-3 mb-6">
  <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
    <label
      class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
      for="record_source_account"
    >
      Source
    </label>
    <div class="relative">
      <select
        name="record_source_account"
        class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        id="grid-source-account"
      >
        <option>BofA Account</option>
        <option>Citi Credit Card</option>
        <option>Cash</option>
      </select>
      <div
        class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
      >
        <svg
          class="fill-current h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path
            d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
          />
        </svg>
      </div>
    </div>
    <!-- <p class="text-red-500 text-xs italic">
        Please fill out this field.
      </p> -->
  </div>

  <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
    <label
      class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
      for="record_destination_account"
    >
      Destination
    </label>
    <div class="relative">
      <select
        name="record_destination_account"
        class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        id="grid-destination-account"
      >
        <option>BofA Account</option>
        <option>Citi Credit Card</option>
        <option>Cash</option>
      </select>
      <div
        class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
      >
        <svg
          class="fill-current h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path
            d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
          />
        </svg>
      </div>
    </div>
    <!-- <p class="text-red-500 text-xs italic">
          Please fill out this field.
        </p> -->
  </div>
</div>
<div class="flex flex-wrap -mx-3 mb-6">
  <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
    <label
      class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
      for="record_amount"
    >
      Amount
    </label>
    <input
      name="record_amount"
      class="appearance-none w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
      id="grid-amount"
      type="number"
      min="0.01"
      placeholder="00.00"
    />
    <!-- <p class="text-red-500 text-xs italic">
        Please fill out this field.
      </p> -->
  </div>

  <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
    <label
      class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
      for="currency"
    >
      Currency
    </label>
    <div class="relative">
      <select
        name="currency"
        class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        id="grid-currency"
      >
        <option>USD</option>
        <option>EUR</option>
        <option>INR</option>
      </select>
      <div
        class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
      >
        <svg
          class="fill-current h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path
            d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
          />
        </svg>
      </div>
    </div>
    <!-- <p class="text-red-500 text-xs italic">
          Please fill out this field.
        </p> -->
  </div>
</div>
<div class="flex flex-wrap -mx-3 mb-6">
  <div class="w-full px-3">
    <label
      class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
      for="record_note"
    >
      Note
    </label>
    <input
      name="record_note"
      class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
      id="grid-note"
      type="text"
      placeholder="Enter Note Here"
    />
    <!-- <p class="text-gray-600 text-xs italic">
        Make it as long and as crazy as you'd like
      </p> -->
  </div>
</div>
<div class="flex flex-wrap -mx-3 mb-2">
  <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
    <label
      class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
      for="record_created_time"
    >
      Date
    </label>
    <input
      name="record_created_time"
      class="inline-block appearance-none w-full block bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
      id="grid-created-time"
      type="date"
      value="2018-07-22"
    />
  </div>
  <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
    <label
      class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
      for="record_tag"
    >
      Tag
    </label>
    <input
      class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
      id="grid-tag"
      type="text"
      name="record_tag"
      placeholder="None"
    />
  </div>
</div>`
}
