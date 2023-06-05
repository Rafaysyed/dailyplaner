function formatDate(event) {
  const selectedDate = new Date(event.target.value);
  const formattedDate = selectedDate.toLocaleDateString("en", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  const formattedDateInput = document.getElementById("formattedDateInput");
  formattedDateInput.innerText = formattedDate;
}
// functions for daily time and bullet points 

function handleKeyPress(event) {
  if (event.key === "Enter" || event.keyCode === 13) {
    event.preventDefault(); // Prevent the default Enter key behavior

    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    const listItem = document.createElement("li");
    listItem.appendChild(range.extractContents());
    range.insertNode(listItem);
    range.setStartAfter(listItem);
    range.setEndAfter(listItem);

    // Set the cursor position after the inserted bullet point
    const newRange = document.createRange();
    newRange.setStart(listItem, 1);
    newRange.setEnd(listItem, 0);
    selection.removeAllRanges();
    selection.addRange(newRange);
  } else if (event.key.length === 1) {
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);

    if (range.startOffset === 0 && range.endOffset === 0) {
      const listItem = document.createElement("li");
      range.insertNode(listItem);
      range.setStart(listItem, 0);
      range.setEnd(listItem, 0);
      selection.removeAllRanges();
      selection.addRange(range);
    }
  }
}


// Functions for priorities and lists 

  const textarea = document.getElementById("exampleFormControlTextarea1");

  textarea.addEventListener("keydown", function (event) {
    if (event.key === "Enter" || event.keyCode === 13) {
      event.preventDefault();
      const currentCursorPosition = textarea.selectionStart;
      const text = textarea.value;
      const newText =
        text.slice(0, currentCursorPosition) +
        "\n\u2022 " +
        text.slice(currentCursorPosition);
      textarea.value = newText;
      textarea.selectionStart = currentCursorPosition + 3;
      textarea.selectionEnd = currentCursorPosition + 3;
    } else if (event.key === "Backspace" || event.keyCode === 8) {
      const currentCursorPosition = textarea.selectionStart;
      const text = textarea.value;
      const selectionStart = textarea.selectionStart;
      const selectionEnd = textarea.selectionEnd;
      const selectedText = textarea.value.substring(
        selectionStart,
        selectionEnd
      );
      const hasBullets = selectedText.includes("\u2022");

      if (hasBullets) {
        const newText =
          text.slice(0, selectionStart) + text.slice(selectionEnd);
        textarea.value = newText;
        textarea.selectionStart = currentCursorPosition;
        textarea.selectionEnd = currentCursorPosition;
        event.preventDefault();
      }
    } else {
      const currentCursorPosition = textarea.selectionStart;
      const text = textarea.value;
      if (
        currentCursorPosition === 0 ||
        text[currentCursorPosition - 1] === "\n"
      ) {
        const newText =
          text.slice(0, currentCursorPosition) +
          "\u2022" +
          text.slice(currentCursorPosition);
        textarea.value = newText;
        textarea.selectionStart = currentCursorPosition + 2;
        textarea.selectionEnd = currentCursorPosition + 2;
      }
    }
  });

// function for water tracker
const addButton = document.querySelector(".add-button");
const removeButton = document.querySelector(".remove-button");
const imageContainer = document.querySelector(".image-container");

const images = [
  "https://static.vecteezy.com/system/resources/previews/006/599/997/original/flat-design-glass-of-water-isolated-on-white-background-free-vector.jpg",
  "https://www.coca-colacanada.ca/content/dam/nagbrands/ca/coke/en/specialtysoda/coca-cola-de-mexico/Coca-ColadeMexico355mLBottle-productImageSmall.png",
  "https://media.istockphoto.com/id/95574723/photo/english-tea-in-a-bone-china-cup.jpg?s=612x612&w=0&k=20&c=ZSdzzGzTz5d5SWXl3Lm5AdRNLWqDmXbmzaO5sqcHiFg=",
  "https://res.cloudinary.com/sonic-drive-in/image/upload/c_fit,w_600,h_600,dpr_2,f_auto,q_auto/v1504119514/oa_menu/products/menuproduct-minute-maid-100-apple-juice-box-25670-okc-beta.png",
];

let imageCount = 0;
let clickCount = 0;

addButton.addEventListener("click", () => {
  const image = document.createElement("img");
  image.src = images[imageCount % images.length];
  image.addEventListener("click", () => {
    clickCount++;
    if (clickCount % 1 === 0) {
      imageCount++;
      image.src = images[imageCount % images.length];
    }
  });
  imageContainer.appendChild(image);
  imageCount++;
});

removeButton.addEventListener("click", () => {
  if (imageCount > 0) {
    imageContainer.lastElementChild.remove();
    imageCount--;
  }
});


  