chrome.runtime.onInstalled.addListener((async()=>{let e=chrome.runtime.getURL("index.html");await chrome.tabs.create({url:e})})),chrome.browserAction.onClicked.addListener((async()=>{let e=chrome.runtime.getURL("index.html");await chrome.tabs.create({url:e})}));