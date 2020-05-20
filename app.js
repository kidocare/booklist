// Book Constructor
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

// UI constructor
function UI() {}

UI.prototype.addBookToList = function (book) {
  console.log(book);
  const list = document.getElementById("book-list");
  // creat ellement
  const row = document.createElement("tr");
  // insert sells
  row.innerHTML = `
  <td>${book.title}</td>
  <td>${book.author}</td>
  <td>${book.isbn}</td>
  <td><a href="#" class="delete">X</a></td>
  `;
  // delete book
  UI.prototype.deleteBook = function (target) {
    target.parentElement.parentElement.remove();
  };
  list.appendChild(row);
  console.log(row);
};
UI.prototype.clearForm = function () {
  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("isbn").value = "";
};
UI.prototype.showAlert = function (message, className) {
  const alertDiv = document.createElement("div");
  alertDiv.className = `alert ${className}`;
  alertDiv.appendChild(document.createTextNode(message));

  const container = document.querySelector(".container");

  const alForm = document.querySelector("#book-form");
  container.insertBefore(alertDiv, alForm);
  // timeout after 3 second
  setTimeout(function () {
    document.querySelector(".alert").remove();
  }, 3000);
};

// collecting form info
document.getElementById("book-form").addEventListener("submit", function (e) {
  const title = document.getElementById("title").value,
    author = document.getElementById("author").value,
    isbn = document.getElementById("isbn").value;

  // Instantiate Book
  const book = new Book(title, author, isbn);
  // Instantiate UI
  const ui = new UI();

  // validate
  if (title === "" || author === "" || isbn === "") {
    // Error message
    ui.showAlert("Please fill the form", "text-danger");
  } else {
    // add book to list
    ui.addBookToList(book);
    ui.clearForm();
    ui.showAlert("Book Added", "text-success");
  }

  e.preventDefault();
});

// Event listener for delete

document.getElementById("book-list").addEventListener("click", function (e) {
  const ui = new UI();
  if (e.target.className === "delete") {
    ui.deleteBook(e.target);
    ui.showAlert("book removed!", "bg-success text-white");
  }

  console.log(123);

  e.preventDefault();
});
