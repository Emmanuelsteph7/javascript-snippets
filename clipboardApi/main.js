document.addEventListener("DOMContentLoaded", () => {
  const editableDiv = document.querySelector(".editable");

  // we can control what can be pasted in the paste event
  // this method is the older synchronous way
  // i actually even mixed asynchronous together (i.e, navigator.clipboard)
  const manipulatePasteData = (e) => {
    e.stopPropagation();
    e.preventDefault();

    const prefix = "prefix--";
    const suffix = "--suffix";

    let clipboardData, pastedData;
    clipboardData = e.clipboardData || window.clipboardData;
    pastedData = clipboardData.getData("text/plain");

    if (navigator.clipboard) {
      navigator.clipboard
        .readText()
        .then((data) => {
          console.log(data);

          editableDiv.innerText = `${prefix}${data}${suffix}`;
        })
        .catch((err) => console.log(err));
    } else {
      document.execCommand(
        "insertText",
        true,
        `${prefix}${pastedData}${suffix}`
      );
    }
  };

  // we can control what can be added to the clipboard using the setData method in the clipboardData object
  const copyHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();

    let selectedText = document.getSelection().toString();
    const changedText = `my text: ${selectedText}`;

    let clipboardData;
    clipboardData = e.clipboardData || window.clipboardData;

    clipboardData.setData("text/plain", changedText);
  };

  editableDiv.addEventListener("paste", manipulatePasteData);
  editableDiv.addEventListener("copy", copyHandler);
  editableDiv.addEventListener("cut", copyHandler);
});

const copyBtn = document.querySelector(".copyBtn");
const pasteBtn = document.querySelector(".pasteBtn");
const copyInputValue = document.querySelector(".copyInput");
const pasteInput = document.querySelector(".pasteInput");

const handleCopy = () => {
  navigator.clipboard
    .writeText(copyInputValue.value)
    .then((data) => {
      console.log("Text copied!");
    })
    .catch((err) => console.log(err));
};

const handlePaste = () => {
  navigator.clipboard
    .readText()
    .then((data) => {
      if (data) {
        pasteInput.value = data;
      }
    })
    .catch((err) => console.log(err));
};

copyBtn.addEventListener("click", handleCopy);
pasteBtn.addEventListener("click", handlePaste);
