function getTotalPoints() {
  return String(
    [
      ...($("[aria-label='Issue']").length > 0
        ? $$(".IssueLabel")
        : $$("article:not(.d-none) .issue-card-label"))
    ]
      .map(val => Number(val.outerText))
      .filter(Number)
      .reduce((total, num) => total + num, 0)
  );
}

chrome.runtime.sendMessage({ totalPoints: getTotalPoints() });

chrome.runtime.onMessage.addListener(function(request, sender) {
  chrome.runtime.sendMessage({ totalPoints: getTotalPoints() });
});
