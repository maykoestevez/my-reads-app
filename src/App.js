import React from 'react'
import './App.css'
import SearchBook from './Book/SearchBook'
import Layout from './Book/Layout'
import { Route, Routes } from 'react-router-dom'
import BookShelfList from './Book/Commons'
import * as BooksAPI from './BooksAPI'

class BooksApp extends React.Component {
  state = {
    myBooks: [],
    allBooks: []
  }

  bookShelfs = BookShelfList;

  searchBooks = (query) => {
    BooksAPI.search(query).then((books) => {
      if (!books.items) {
        this.setState(() => ({
          allBooks: books
        }))
        this.setShelfByBookId(books)
      }
    });
  }
  
  clearBooks = () => {
    this.setState({ allBooks: [] });
  }

  setShelfByBookId = (books) => {
    books.forEach((book, index) => {
      const bookInMyBooks = this.state.myBooks.find((myBook) => myBook.id === book.id);
      if (bookInMyBooks) {
        books[index].shelf = bookInMyBooks.shelf;
        this.setState(() => ({
          allBooks: books
        }))
      }

    })

  }

  getAllBooks = () => {
    BooksAPI.getAll().then((books) => {
      this.setState(() => ({
        myBooks: books
      }))
    })
  }

  moveBook = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
      const allBooks = this.state.allBooks;
      this.setShelfToMyBooks(book, shelf);

      if (allBooks.length > 0) {
        this.setShelfToAllBooks(book, shelf);
      }

    });
  }

  setShelfToAllBooks = (book, shelf) => {
    const allBooks = this.state.allBooks;
    const allBookIndex = allBooks.findIndex((b) => b.id === book.id);
    allBooks[allBookIndex].shelf = shelf;
    this.setState(() => ({
      allBooks: allBooks
    }))
  }
  setShelfToMyBooks = (book, shelf) => {
    const myBooks = this.state.myBooks;
    const myBookIndex = myBooks.findIndex((b) => b.id === book.id);
    myBooks[myBookIndex].shelf = shelf;
    this.setState(() => ({
      myBooks: myBooks,
    }))
  }



  refreshAllBooks = allBooks => this.setState({ allBooks: allBooks });

  getBooksByShelf = shelf => {
    return this.state.myBooks.filter((b) => b.shelf === shelf);
  }

  render() {
    return (
      <div className="app">
        <Routes>
          <Route exact path='/' element={<Layout
            bookShelfs={this.bookShelfs}
            getAllBooks={this.getAllBooks}
            getBooksByShelf={this.getBooksByShelf}
            moveBook={this.moveBook}
          />}>
          </Route>
          <Route path='/search' element={<SearchBook
            moveBook={this.moveBook}
            books={this.state.allBooks}
            clearBooks={this.clearBooks}
            refreshAllBooks={this.refreshAllBooks}
            setShelfByBookId={this.setShelfByBookId}
            searchBooks={this.searchBooks} />}></Route>
        </Routes>
      </div>
    )
  }
}

export default BooksApp
