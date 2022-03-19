import React from 'react'
import * as BooksAPI from '../BooksAPI'
import BookShelf from './BookShelf'
import { Link } from 'react-router-dom'
import BookShelfList from './Commons'

class Layout extends React.Component {
  state = {
    books: [],
  }

  bookShelfs = BookShelfList;

  getAllBooks = () => {
    BooksAPI.getAll().then((books) => {
      this.setState(() => ({
        books: books
      }))
    })
  }

  moveBook = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
      const books = this.state.books;
      const bookIndex = books.findIndex((b) => b.id === book.id);
      books[bookIndex].shelf = shelf;
      this.setState(() => ({
        books: books
      }))
    });
  }

  getBooksByShelf = shelf => {
    return this.state.books.filter((b) => b.shelf === shelf);
  }

  componentDidMount() {
    this.getAllBooks();
  }

  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          {this.bookShelfs.map(shelf => (
            <BookShelf
              key={shelf.id}
              onMoveBook={this.moveBook}
              books={this.getBooksByShelf(shelf.id)}
              shelf={shelf}>
            </BookShelf>
          ))}
        </div>
        <div className="open-search">
          <Link to='/search'>Add a book</Link>
        </div>
      </div>
    )
  }
}

export default Layout
