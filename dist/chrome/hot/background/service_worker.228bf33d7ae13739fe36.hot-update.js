self["webpackHotUpdatecontent"]("background/service_worker",{

/***/ "./service-worker.js":
/*!***************************!*\
  !*** ./service-worker.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

/* provided dependency */ var r = __webpack_require__(/*! ../extension/packages/resolve-plugin/dist/resolver-module.mjs */ "../extension/packages/resolve-plugin/dist/resolver-module.mjs")["default"];
;
chrome.runtime.onMessageExternal.addListener(async (request, _sender, sendResponse) => {
  const managementInfo = await new Promise(resolve => {
    chrome.management.getSelf(resolve);
  });

  // Ping-pong between the user extension background page(this)
  // and the middleware socket client (reloadService.ts),
  // which will then send a message to the server
  // (startServer.ts) so it can display the extension info.
  if (request.initialLoadData) {
    sendResponse({
      id: chrome.runtime.id,
      manifest: chrome.runtime.getManifest(),
      management: managementInfo
    });
    return true;
  }

  // Reload the extension runtime if the manifest or
  // service worker changes. 
  if (request.changedFile === 'manifest.json' || request.changedFile === 'service_worker' || request.changedFile === '_locales') {
    setTimeout(() => {
      sendResponse({
        reloaded: true
      });
      chrome.runtime.reload();
    }, 750);
  }

  // Reload all tabs if the contextMenus code changes.
  if (request.changedFile === 'contextMenus') {
    sendResponse({
      reloaded: true
    });
    chrome.tabs.query({}, tabs => {
      if (!tabs) return;
      tabs.forEach(tab => chrome.tabs.reload(tab.id));
    });
  }

  // Reload all tabs if the declarative_net_request code changes.
  if (request.changedFile === 'declarative_net_request') {
    sendResponse({
      reloaded: true
    });
    chrome.runtime.reload();
  }
  return true;
});
chrome.action.onClicked.addListener(tab => {
  console.log("=111=");
  console.log("====================================");
  chrome.scripting.executeScript(r.solve({
    target: {
      tabId: tab.id
    },
    files: ["./scripts/content.js"]
  }));
});

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("b6ad2cf2fb6348f59007")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=service_worker.228bf33d7ae13739fe36.hot-update.js.map