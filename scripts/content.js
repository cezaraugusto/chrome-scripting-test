import("../content.css");
console.log("====================================");
const blankDiv = document.createElement("div");
blankDiv.className = "content_script-area";
const title = document.createElement("h1");
title.className = "content_script-title";
title.textContent = "000";
blankDiv.appendChild(title);
document.body.appendChild(blankDiv);
