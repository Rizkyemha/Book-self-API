const { nanoid } = require('nanoid');
const books = require('./books');

const createBook = (payload) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = payload;

  if (!name) {
    throw new Error('Gagal menambahkan buku. Mohon isi nama buku');
  }

  if (readPage > pageCount) {
    throw new Error('Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount');
  }

  const id = nanoid(16);
  const insertedAt = new Date().toISOString();
  const finished = pageCount === readPage;

  return {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt: insertedAt,
  };
};

const updateBook = (payload) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
    insertedAt,
  } = payload;

  if (!name) {
    throw new Error('Gagal memperbarui buku. Mohon isi nama buku');
  }

  if (readPage > pageCount) {
    throw new Error('Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount');
  }
  const finished = pageCount === readPage;

  return {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
  };
};

const findBookById = (bookId) => {
  const book = books.find((buku) => buku.id === bookId);
  if (book === undefined) {
    throw new Error('Buku tidak ditemukan');
  }
  return book;
};

const findBookIndexById = (bookId) => {
  const book = books.findIndex((buku) => buku.id === bookId);
  if (book === -1) {
    throw new Error('Gagal memperbarui buku. Id tidak ditemukan');
  }
  return book;
};

module.exports = {
  createBook,
  updateBook,
  findBookById,
  findBookIndexById,
};
