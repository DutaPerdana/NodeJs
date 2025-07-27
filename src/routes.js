/* eslint-disable linebreak-style */
// routes.js
import { addBookHandler, getBooksByid, getAllBooks, editBooksById, delBooksById } from './handler.js';

const routes = [
  {
    method: 'POST',
    path: '/books',
    handler: addBookHandler,
  },
  {
    method: 'GET',
    path: '/books/{bookId}',
    handler: getBooksByid,
  },
  {
    method: 'GET',
    path: '/books',
    handler: getAllBooks,
  },
  {
    method: 'PUT',
    path: '/books/{bookId}',
    handler: editBooksById,
  },
  {
    method: 'DELETE',
    path: '/books/{bookId}',
    handler: delBooksById,
  },
];

export default routes;
