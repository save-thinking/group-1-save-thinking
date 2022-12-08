chrome.browserAction.onClicked.addListener(function(activeTab){
    // var newURL = "http://127.0.0.1:5500/src/static/html/dashboard.html";
    // chrome.tabs.create({ url: newURL });
    chrome.tabs.create({url: chrome.extension.getURL('src/static/html/dashboard.html')});
  });