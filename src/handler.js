const {
  createBook,
  updateBook,
  findBookById,
  findBookIndexById,
} = require('./utils');
const books = require('./books');

const addBook = (request, h) => {
  try {
    const newBook = createBook(request.payload);
    books.push(newBook);

    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: newBook.id,
      },
    });
    response.code(201);
    return response;
  } catch (error) {
    const response = h.response({
      status: 'fail',
      message: error.message,
    });
    response.code(400);
    return response;
  }
};

const getAllBook = (request, h) => {
  const {
    name,
    reading,
    finished,
  } = request.query;

  let filteredBooks = books;

  if (name) {
    filteredBooks = books.filter((bn) => bn.name.toLowerCase().includes(name.toLowerCase()));
  }

  if (reading) {
    filteredBooks = books.filter((book) => Number(book.reading) === Number(reading));
  }

  if (finished) {
    filteredBooks = books.filter((book) => Number(book.finished) === Number(finished));
  }

  const response = h.response({
    status: 'success',
    data: {
      books: filteredBooks.map((book) => ({
        id: book.id,
        name: book.name,
        publisher: book.publisher,
      })),
    },
  });
  response.code(200);
  return response;
};

const getBook = (request, h) => {
  try {
    const { bookId } = request.params;

    const book = findBookById(bookId);
    const response = h.response({
      status: 'success',
      data: {
        book,
      },
    });
    response.code(200);
    return response;
  } catch (error) {
    const response = h.response({
      status: 'fail',
      message: error.message,
    });
    response.code(404);
    return response;
  }
};

const editBook = (request, h) => {
  try {
    const { bookId } = request.params;

    const updatedBook = updateBook(request.payload);
    updatedBook.id = bookId;
    updatedBook.updatedAt = new Date().toISOString();

    const index = findBookIndexById(bookId);
    books[index] = updatedBook;
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui',
    });
    response.code(200);
    return response;
  } catch (error) {
    const response = h.response({
      status: 'fail',
      message: error.message,
    });
    if (error.message === 'Gagal memperbarui buku. Masukkan nama buku' || error.message === 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount') {
      response.code(400);
      return response;
    }
    response.code(404);
    return response;
  }
};

const deleteBook = (request, h) => {
  try {
    const { bookId } = request.params;
    const index = findBookIndexById(bookId);
    books.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil dihapus',
    });
    response.code(200);
    return response;
  } catch (error) {
    const response = h.response({
      status: 'fail',
      message: 'Buku gagal dihapus. Id tidak ditemukan',
    });
    response.code(404);
    return response;
  }
};

module.exports = {
  addBook,
  getAllBook,
  getBook,
  editBook,
  deleteBook,
};
