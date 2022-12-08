/** View Service - Components
 @module view/components
 */
import * as util from './utility.js'
const RECORD_AMOUNT_COLOR_LOOKUP = {
  expense: 'red',
  income: 'green',
  transfer: 'slate'
}
/**
 * @description recordCardComponent make an element on the Records Table
 */
export const recordCardComponent = (record) => {
  const recordCard = document.createElement('div')
  recordCard.classList = 'py-3 sm:py-4'
  recordCard.innerHTML = `
<div class="flex items-center space-x-4">
  <div class="flex">
    <div class="text-2xl rounded-full">${record.destination_account.emoji}</div>
  </div>
  <div class="flex-1 min-w-0">
    <p class="text-sm font-medium text-gray-900 truncate">${
      record.destination_account.name
    }</p>
    <p class="text-sm text-gray-500 truncate">${record.created_at}</p>
  </div>
  <div class="flex-1 min-w-0">
    <p class="text-sm font-medium text-gray-900 truncate">
      ${record.note}
    </p>
    <p class="text-sm text-gray-500 truncate">${record.source_account.name}</p>
  </div>
  <div class="inline-flex items-center text-base text-${
    RECORD_AMOUNT_COLOR_LOOKUP[record.type]
  }-600">
   ${util.getBalanceWithCurrency(record.amount, record.currency)}
  </div>
</div>`
  return recordCard
}

/**
 * @description accountCardComponent make an element on the Accounts Table
 */
export const accountCardComponent = (account) => {
  const accountCard = document.createElement('div')
  accountCard.classList =
    'container p-4 m-2 h-full items-stretch max-w-xs bg-white rounded-lg border shadow-md sm:p-8 hover:bg-slate-50'
  accountCard.innerHTML = `<div class='sm:py-4'>
  <div class='flex items-center space-x-4'>
    <div class='flex'>
      <div class='text-2xl rounded-full'>${account.emoji}</div>
    </div>
    <div class='flex-1 min-w-0'>
      <p class='text-sm font-medium text-gray-900 truncate'>
      ${account.name}
      </p>
      <p class='text-xs text-gray-500 truncate'>${util.getAccountType(
        account.type
      )}</p>
    </div>
    <div class="inline-flex items-center text-base ${
      account.current_balance > 0 ? 'text-green-600' : 'text-red-600'
    }">
    ${util.getBalanceWithCurrency(account.current_balance, account.currency)}
    </div>
  </div>
</div>`
  return accountCard
}

/**
 * @description getRecordModal - Modal to add new Records
 */
const getRecordModal = () => {
  const modal = document.createElement('div', {
    id: 'add-record-modal',
    'aria-labelledby': 'modal-title',
    role: 'dialog',
    'aria-modal': true
  })
  modal.classList.add('z-10')
  modal.classList.add('hidden')
  modal.innerHTML = `      <!--
    Background backdrop, show/hide based on modal state.

    Entering: "ease-out duration-300"
      From: "opacity-0"
      To: "opacity-100"
    Leaving: "ease-in duration-200"
      From: "opacity-100"
      To: "opacity-0"
  -->
<div
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
            <form id="add-record-form"class="w-full max-w-xl mt-2">
              <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                  <label
                    class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    for="type"
                  >
                    Record Type
                  </label>
                  <div class="relative">
                    <select
                      name="type"
                      class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-record-type"
                    >
                      <option value="expense">Expense</option>
                      <option value="income">Income</option>
                      <option value="transfer">Transfer</option>
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
                    for="source_account"
                  >
                    Source
                  </label>
                  <div class="relative">
                    <select
                      name="source_account"
                      class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-source-account"
                    >
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
                    for="destination_account"
                  >
                    Destination
                  </label>
                  <div class="relative">
                    <select
                      name="destination_account"
                      class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-destination-account"
                    >
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
                    for="amount"
                  >
                    Amount
                  </label>
                  <input
                    name="amount"
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
                    for="note"
                  >
                    Note
                  </label>
                  <input
                    name="note"
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
                    for="created_at"
                  >
                    Date
                  </label>
                  <input
                    name="created_at"
                    class="inline-block appearance-none w-full block bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-created-time"
                    type="date"
                    value="2018-07-22"
                  />
                </div>
                <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                  <label
                    class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    for="tag"
                  >
                    Tag
                  </label>
                  <input
                    class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-tag"
                    type="text"
                    name="tag"
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
  return modal
}
export const recordModal = getRecordModal()

/**
 * @description latestRecordCardComponent make an element on the Latest Record Card in Summary Dashboard
 */
export const latestRecordCardComponent = (record) => {
  const recordCard = document.createElement('div')
  recordCard.classList = 'py-2 sm:py-2'
  recordCard.innerHTML = `
  <div class="flex items-center space-x-4">
    <div class="flex">
      <div class="text-2xl rounded-full">${
        record.destination_account.emoji
      }</div>
    </div>
    <div class="flex-1 min-w-0">
      <p class="text-sm font-medium text-gray-900 truncate">${
        record.destination_account.name
      }</p>
      <p class="text-sm text-gray-500 truncate">${record.created_at}</p>
    </div>
    <div class="flex-1 min-w-0">
      <p class="text-sm font-medium text-gray-900 truncate">${record.note}</p>
      <p class="text-sm text-gray-500 truncate">${
        record.source_account.name
      }</p>
    </div>
    <div class="inline-flex items-center text-base ${
      RECORD_AMOUNT_COLOR_LOOKUP[record.type]
    }">
    ${util.getBalanceWithCurrency(record.amount, record.currency)}
    </div>
  </div>
  <div class="border"></div>`
  return recordCard
}

/**
 * @description COLORS is a static list of rgb values to be used for the Donut Chart
 */
export const COLORS = [
  'rgb(121.74837569474411,38.39383324261537,34.762951235384875)',
  'rgb(89.34391778659672,221.11386370934287,83.80322070172976)',
  'rgb(90.13410697263176,128.9879563545594,8.659730061680358)',
  'rgb(40.46489902529536,166.02748620373018,207.22909615685577)',
  'rgb(207.1949977875534,10.64918824332574,152.55920736007337)',
  'rgb(129.48006073465012,153.28151031774289,61.878255351398074)',
  'rgb(32.85360032218314,122.51553055243754,94.1538714749005)',
  'rgb(129.76545817730656,213.77877954574942,92.41946256705575)',
  'rgb(155.30058713796058,126.53563361640089,111.36793656753561)',
  'rgb(99.18399392261469,190.28496428082497,28.20551419493594)',
  'rgb(204.96651710750868,118.84195640151206,229.39832239372933)',
  'rgb(167.5638713841562,82.61985163800374,101.88808571007954)',
  'rgb(230.24262080049726,214.95870128784577,103.26336049111417)',
  'rgb(64.04258242114248,161.5288011152077,248.15666164862668)',
  'rgb(8.99826129435327,173.5288868835995,116.25506051994064)',
  'rgb(5.056126438531351,139.66734201679887,233.64196589924416)',
  'rgb(224.48893015059366,59.51153078601351,87.75955921033201)',
  'rgb(111.88235400722674,100.66791618395813,252.4802459860829)',
  'rgb(189.8105506595473,199.369177731275,85.595214383465)',
  'rgb(59.61760466326731,141.02891227595023,129.8852142040551)',
  'rgb(226.96498039315802,48.09488018103852,95.43621239858882)',
  'rgb(41.6182023331149,30.586399417825536,44.3308854198603)',
  'rgb(35.59342175572935,235.24236395096844,108.02873948139509)',
  'rgb(115.85705854090209,174.70695586541038,238.34325042004397)',
  'rgb(122.74810360316303,176.1988903849821,177.056286528306)',
  'rgb(33.55594246988832,249.81274382024566,2.411315586391747)',
  'rgb(137.78511935440395,168.36830057143234,49.99242989110041)',
  'rgb(134.81327334254263,53.11891528411287,36.544693722162044)',
  'rgb(155.38185627209427,213.63385138487487,101.78955120302255)',
  'rgb(244.1318618175824,117.78175988212406,114.35547005531791)',
  'rgb(164.55949141374555,54.21095784942562,32.13991265429992)',
  'rgb(194.49176819060216,254.8616604489981,2.0995923617388454)',
  'rgb(155.06348991675972,108.29111743811626,225.76254745001847)',
  'rgb(186.03340299294473,151.06332027247893,215.40217154021389)',
  'rgb(247.5617840706842,210.01214521385637,31.873972824017912)',
  'rgb(86.93473265427279,223.7763354137093,127.72078998443736)',
  'rgb(225.48812392260436,223.6328810911946,144.56669538277225)',
  'rgb(5.159498584445258,75.2561739244758,212.08019658185853)',
  'rgb(53.485980650028665,179.04433519445294,58.51885830896353)',
  'rgb(183.99026745802297,79.12533695671522,51.33651501503685)',
  'rgb(16.15048389315785,103.34750094786486,234.3956090258432)',
  'rgb(48.149427537882325,174.32946092691037,230.86386145318005)',
  'rgb(70.77819594463021,146.62386319232772,16.442802370734263)',
  'rgb(181.25228106245896,139.13224538215044,67.98143707681676)',
  'rgb(166.8984262603308,73.14673366473292,50.81153822126647)',
  'rgb(209.98936809010485,136.4171003960032,135.33772899202668)',
  'rgb(123.46745746283295,109.42520801958644,182.33746057896713)',
  'rgb(83.92030743953325,58.48730822473716,77.44556368331966)',
  'rgb(234.7010822272529,221.8443918367341,27.629356551282335)',
  'rgb(70.56621150379502,201.34935923730544,71.05259392653007)',
  'rgb(223.11130013728925,0.9351631106432423,184.74333251501474)',
  'rgb(124.79040396008033,248.09170435535728,196.3748687733188)',
  'rgb(213.96125722603682,190.72057210723446,22.378716742860316)',
  'rgb(89.96360628161086,144.1109716510909,136.16190148021965)',
  'rgb(76.80404242164498,150.4985037349475,105.33489871007434)',
  'rgb(152.11022755096,172.28042586209335,131.2647381798548)',
  'rgb(44.825586937969845,206.4800807443154,102.0642109777543)',
  'rgb(227.7319428096076,75.3506494361709,13.708832518782971)',
  'rgb(129.5161039363412,100.66696213176375,155.15939942758303)',
  'rgb(249.99700655643625,134.51682201753974,62.06286817578143)',
  'rgb(231.00007346455237,254.43517251331906,167.3571462453067)',
  'rgb(170.14517219589257,241.08073709599188,133.31581178431983)',
  'rgb(250.46661676006582,162.3547958719078,194.8864839744709)',
  'rgb(169.60264650958837,175.09301690738755,60.848573608657176)',
  'rgb(166.93698687848794,178.866786965062,230.83250496121823)',
  'rgb(176.6247944344221,62.17245866293612,187.17130513837498)',
  'rgb(48.41671948193629,146.4112538579101,220.90161766304828)',
  'rgb(66.98435747425843,19.90973239857257,228.97704188848002)',
  'rgb(251.2140667467991,141.78509308579117,224.51528685453357)',
  'rgb(131.51814512130647,192.44549616918124,106.74135457220682)',
  'rgb(93.22298068816363,90.68965545675796,221.21138759724425)',
  'rgb(199.92403177777055,75.24074647350538,157.2606755187023)',
  'rgb(224.18256583002932,16.97038882607857,61.84356036908934)',
  'rgb(217.38204767473465,234.59971733382332,163.86965973907718)',
  'rgb(137.71208185015448,134.74279628568522,99.36525885288937)',
  'rgb(163.31059410409247,49.26742498132762,58.30342261810903)',
  'rgb(220.6739745891266,224.50794414935814,70.57879528040337)',
  'rgb(219.67093917227484,66.0782063218454,180.09723864954228)',
  'rgb(107.54583022683362,86.97604189945325,75.11116138548302)',
  'rgb(74.3817181903846,69.28539907973222,50.289001599491385)',
  'rgb(121.81891127464026,138.84375209430266,77.08612114899879)',
  'rgb(181.2557900562641,128.36344955174627,170.74644060514692)',
  'rgb(194.3936141319706,232.24370526215924,84.41500857462692)',
  'rgb(85.42239265909693,231.7406550569084,237.78921348386012)',
  'rgb(44.558298883266446,172.317757076758,31.078824858837553)',
  'rgb(160.87789752933702,111.94440813150963,151.17551065369534)',
  'rgb(146.37572906931612,247.71779686694836,157.33633241043654)',
  'rgb(135.50042287964763,52.869272566765964,122.80943364419943)',
  'rgb(208.13613033867438,86.39024877860521,31.092077839375357)',
  'rgb(206.81896610876717,84.50824102612782,25.428068689059256)',
  'rgb(64.57662444943888,78.80211975840268,62.70311642145802)',
  'rgb(216.29061557558208,130.3638727422168,167.7768340973467)',
  'rgb(8.091411522719056,209.4325242928191,94.60496808687805)',
  'rgb(235.7040692240146,4.55248142247058,243.2224897162123)',
  'rgb(181.3771653637918,116.51433998916926,51.085490668954876)',
  'rgb(77.60615531279755,197.98429413622398,254.34942793784833)',
  'rgb(235.36003446406653,35.94486174652645,218.78934382105837)',
  'rgb(225.17251606298953,213.38280721199314,173.40903324201668)',
  'rgb(215.72082759399143,202.63910581682936,69.81697745027157)',
  'rgb(220.1981634084443,172.9173885929796,169.147584616554)'
]
