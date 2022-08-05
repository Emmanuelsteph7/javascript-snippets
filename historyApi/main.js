const lengthDiv = document.getElementById("length");
const stateDiv = document.getElementById("state");
const newBtn = document.getElementById("new");
const previousBtn = document.getElementById("previous");
const nextBtn = document.getElementById("next");
const pushBtn = document.getElementById("push");
const replaceBtn = document.getElementById("replace");
const stateBtn = document.getElementById("stateBtn");

document.addEventListener("DOMContentLoaded", () => {
  lengthDiv.innerText = `There are ${history.length} page(s) in this session`;
});

newBtn.addEventListener("click", () => {
  location.assign("?new=true");
});

previousBtn.addEventListener("click", () => {
  // history.go(-1);
  history.back();
});

nextBtn.addEventListener("click", () => {
  // history.go(1);
  history.forward();
});

pushBtn.addEventListener("click", () => {
  history.pushState({ email: "abc@123.nn" }, "", "./about.html");
  //   location.reload();
});

replaceBtn.addEventListener("click", () => {
  history.replaceState({ email2: "abc@123.nn" }, "", "./contact.html");
  //   location.reload();
});

window.addEventListener("load", () => {
  if (history.state) {
    const stringifiedData = JSON.stringify(history.state);
    stateDiv.innerText = stringifiedData;
  } else {
    stateDiv.innerText = "There is no state passed";
  }
});

window.addEventListener("popstate", (e) => {
  console.log(e);
});
