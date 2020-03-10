function getProjectViewLabels() {
  const countedColumns = ["To do", "To review", "In progress"].map(e =>
    e.toLocaleLowerCase()
  );

  return [...$$(".project-column>.Details h3>span")].reduce((acc, el) => {
    if (!countedColumns.includes(el.textContent.toLocaleLowerCase())) {
      return acc;
    }

    const columnLabels = el
      .closest(".project-column")
      .querySelectorAll("article:not(.d-none) .issue-card-label");
    return [...acc, ...columnLabels];
  }, []);
}

function getIssueViewLabels() {
  return [...$$(".IssueLabel")];
}

function getTotalPoints() {
  return String(
    (document.location.href.includes("projects")
      ? getProjectViewLabels()
      : getIssueViewLabels()
    )
      .map(val => Number(val.outerText))
      .filter(Number)
      .reduce((total, num) => total + num, 0)
  );
}

function sendTotalPoints() {
  chrome.runtime.sendMessage({ totalPoints: getTotalPoints() });
}

window.addEventListener("load", () => sendTotalPoints());
chrome.runtime.onMessage.addListener(() => sendTotalPoints());

// var mutationObserver = new MutationObserver(function(mutations) {
//   mutations.forEach(function(mutation) {
//     console.log(mutation);
//   });
// });
