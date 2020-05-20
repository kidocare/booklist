class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class UI {
  addBookToList(book) {
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
    list.appendChild(row);
    // console.log(row);
  }

  showAlert(message, className) {
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
  }

  deleteBook(target) {
    target.parentElement.parentElement.remove();
  }
  clearFields() {
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("isbn").value = "";
  }
}

// Local storage class
class store {
  static getBooks() {
    let books;
    if (localStorage.getItem("books") === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem("books"));
    }
    return books;
  }
  static displayBooks() {
    const books = store.getBooks();

    books.forEach((book) => {
      const ui = new UI();
      ui.addBookToList(book);
    });
  }

  static addBook(book) {
    const books = store.getBooks();
    books.push(book);
    localStorage.setItem("books", JSON.stringify(books));
  }
  static removeBook(isbn) {
    // console.log(isbn);
    const books = store.getBooks();
    books.forEach((book, index) => {
      if (book.isbn === isbn) {
        books.splice(index, 1);
      }
    });
    localStorage.setItem("books", JSON.stringify(books));
  }
}

// DOM Load event

document.addEventListener("DomContentLoaded", store.displayBooks());

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
    // add to LS
    store.addBook(book);
    ui.clearFields();
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
  // remove from LS
  store.removeBook(e.target.parentElement.previousElementSibling.textContent);

  console.log(123);

  e.preventDefault();
});
