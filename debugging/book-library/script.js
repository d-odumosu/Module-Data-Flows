let myLibrary = [];

window.addEventListener("load", function () {
  populateStorage();
  render();
});

function Book(title, author, pages, check) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.check = check;
}
function populateStorage() {
  if (myLibrary.length === 0) {
    let book1 = new Book("Robison Crusoe", "Daniel Defoe", 252, true);
    let book2 = new Book(
      "The Old Man and the Sea",
      "Ernest Hemingway",
      127,
      true
    );
    myLibrary.push(book1);
    myLibrary.push(book2);
  }
}

const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const pagesInput = document.getElementById("pages");
const checkInput = document.getElementById("check");

function submit() {
  if (
    titleInput.value.trim() === "" ||
    pagesInput.value.trim() === "" ||
    authorInput.value.trim() === ""
  ) {
    alert("Please fill all fields!");
    return false;
  } else {
    let book = new Book(
      titleInput.value,
      authorInput.value,
      Number(pagesInput.value),
      checkInput.checked
    );
    myLibrary.push(book);
    render();
  }
}

function render() {
  //delete old table
  tableBody.innerHTML = "";
  //insert updated row and cells
  myLibrary.forEach((book, i) => {
    createBookRow(book, i);
  });
}

const tableBody = document.querySelector("tbody");
let readStatus;

function createBookRow(book, index) {
  const changeBtn = document.createElement("button");
  const deleteBtn = document.createElement("button");

  let row = tableBody.insertRow(-1);
  let titleCell = row.insertCell(0);
  let authorCell = row.insertCell(1);
  let pagesCell = row.insertCell(2);
  let wasReadCell = row.insertCell(3);
  let deleteCell = row.insertCell(4);

  titleCell.textContent = book.title;
  authorCell.textContent = book.author;
  pagesCell.textContent = book.pages;
  wasReadCell.appendChild(changeBtn);
  deleteCell.appendChild(deleteBtn);
  deleteBtn.textContent = "Delete";
  changeBtn.className = "btn btn-success";

  deleteBtn.className = "btn btn-warning";

  if (!book.check) {
    readStatus = "No";
  } else {
    readStatus = "Yes";
  }
  changeBtn.innerText = readStatus;
  changeBtn.addEventListener("click", function () {
    book.check = !book.check;
    render();
  });
  deleteBtn.addEventListener("click", function () {
    alert(`You've deleted title: ${book.title}`);
    myLibrary.splice(index, 1);
    render();
  });
}
