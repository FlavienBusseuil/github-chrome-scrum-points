import "../img/icon-34.png";
import "../img/icon-128.png";

const urlGithubRegex = /^https?:\/\/(?:[^./?#]+\.)?github\.com/;

function disableIcon({ tabId }) {
  chrome.browserAction.setBadgeText({ tabId, text: "-" });
}

function enableIcon({ tabId }) {}

async function getCurrentTabIdAndUrl() {
  return new Promise((resolve, reject) => {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      if (tabs.length === 0 || tabs[0].id === chrome.windows.WINDOW_ID_NONE) {
        return reject();
      }
      resolve({ id: tabs[0].id, url: tabs[0].url });
    });
  });
}

async function setTotalPoints({ totalPoints }) {
  try {
    const { id: tabId } = await getCurrentTabIdAndUrl();
    enableIcon({ tabId });
    const text = Number(totalPoints) > 999 ? "999+" : totalPoints;
    chrome.browserAction.setBadgeText({ tabId, text });
  } catch (error) {
    const { id: tabId } = await getCurrentTabIdAndUrl();
    disableIcon({ tabId });
  }
}

async function sendMessageToCurrentTab() {
  try {
    const { id, url } = await getCurrentTabIdAndUrl();
    if (!urlGithubRegex.test(url)) {
      disableIcon({ tabId: id });
    }
    chrome.tabs.sendMessage(id, {});
  } catch (error) {
    // disableIcon();
  }
}

chrome.runtime.onMessage.addListener(setTotalPoints);

chrome.browserAction.onClicked.addListener(sendMessageToCurrentTab);

chrome.tabs.onActivated.addListener(sendMessageToCurrentTab);
chrome.tabs.onUpdated.addListener(sendMessageToCurrentTab);

chrome.windows.onFocusChanged.addListener(sendMessageToCurrentTab);
