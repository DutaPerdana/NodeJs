/* eslint-disable linebreak-style */
import books from './books.js';
import { nanoid } from 'nanoid';

export const addBookHandler = (request, h) =>{
  const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;

  // Validasi input
  if (!name) {
    return h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    }).code(400);
  }

  if (readPage > pageCount) {
    return h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    }).code(400);
  }

  const finished = pageCount === readPage;

  const book = {
    id: nanoid(),
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  books.push(book);

  return h.response({
    status: 'success',
    message: 'Buku berhasil ditambahkan',
    data: {
      bookId: book.id,
    },
  }).code(201);
};

export const getBooksByid = (request, h)=>{
  const { bookId } = request.params;
  const book = books.find((b) => b.id === bookId);

  if (!book) {
    return h.response({
      status: 'fail',
      message: 'Buku tidak ditemukan',
    }).code(404);
  }

  return h.response({
    status: 'success',
    data: {
      book,
    },
  }).code(200);
};

export const getAllBooks = (request, h)=>{
  let filteredBooks = books;
  const { name, reading, finished } = request.query;

  if (name) {
    filteredBooks = filteredBooks.filter((book) => book.name.toLowerCase().includes(name.toLowerCase()));
  }

  if (reading) {
    filteredBooks = filteredBooks.filter((book) => book.reading === (reading === '1'));
  }

  if (finished) {
    filteredBooks = filteredBooks.filter((book) => book.finished === (finished === '1'));
  }

  // ambil id nama dan publiher
  filteredBooks = filteredBooks.map((book) => ({
    id: book.id,
    name: book.name,
    publisher: book.publisher,
  }));

  // Ambil hanya 3 buku pertama
  // filteredBooks = filteredBooks.slice(0, 3);

  return h.response({
    status: 'success',
    data: {
      books: filteredBooks,
    },
  }).code(200);
};

export const editBooksById = (request, h)=>{
  const { bookId } = request.params;
  const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;

  if (!name) {
    return h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku',
    }).code(400);
  }

  if (readPage > pageCount) {
    return h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
    }).code(400);
  }

  const finished = pageCount === readPage;

  const bookIndex = books.findIndex((b) => b.id === bookId);

  if (bookIndex === -1) {
    return h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Id tidak ditemukan',
    }).code(404);
  }

  books[bookIndex] = {
    ...books[bookIndex],
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    updatedAt: new Date().toISOString(),
  };

  return h.response({
    status: 'success',
    message: 'Buku berhasil diperbarui',
  }).code(200);
};

export const delBooksById = (request, h)=>{
  const { bookId } = request.params;
  const bookIndex = books.findIndex((b) => b.id === bookId);

  if (bookIndex === -1) {
    return h.response({
      status: 'fail',
      message: 'Buku gagal dihapus. Id tidak ditemukan',
    }).code(404);
  }

  books.splice(bookIndex, 1);

  return h.response({
    status: 'success',
    message: 'Buku berhasil dihapus',
  }).code(200);
};
// export { addBookHandler, getBooksByid };