const form = document.getElementById('bookForm');
const library = document.getElementById('library');

let books = JSON.parse(localStorage.getItem('books')) || [];

renderBooks();

form.addEventListener('submit', function(e) {
  e.preventDefault();

  const title = document.getElementById('name__books').value.trim();
  const author = document.getElementById('author').value.trim();
  const read = document.getElementById('read').checked;

  if (title && author) {
    const book = { title, author, read };
    books.push(book);
    saveBooks();
    form.reset();
    renderBooks();
  }
});

function renderBooks() {
  library.innerHTML = '';

  books.forEach((book, index) => {
    const bookDiv = document.createElement('div');
    bookDiv.className = 'book' + (book.read ? ' read' : '');
    bookDiv.innerHTML = `
      <strong>${book.title}</strong> — ${book.author}<br>
      Статус: <em>${book.read ? 'Прочитано' : 'Не прочитано'}</em>
      <div class="actions">
        <button onclick="toggleRead(${index})">Сменить статус</button>
        <button onclick="deleteBook(${index})">Удалить</button>
      </div>
    `;
    library.appendChild(bookDiv);
  });
}

function deleteBook(index) {
  books.splice(index, 1);
  saveBooks();
  renderBooks();
}

function toggleRead(index) {
  books[index].read = !books[index].read;
  saveBooks();
  renderBooks();
}

function saveBooks() {
  localStorage.setItem('books', JSON.stringify(books));
}