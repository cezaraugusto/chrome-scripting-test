chrome.action.onClicked.addListener((tab) => {
  console.log("=111=");
  console.log("====================================");
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ["./scripts/content.js"],
  });
});
