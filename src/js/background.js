import "../img/icon-128.png";

chrome.runtime.onMessage.addListener(function(request, sender) {
  chrome.browserAction.setBadgeText({ text: request.totalPoints });
  return true;
});

chrome.browserAction.onClicked.addListener(() => {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {});
  });
});

chrome.tabs.onActivated.addListener(() => {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {});
  });
});
