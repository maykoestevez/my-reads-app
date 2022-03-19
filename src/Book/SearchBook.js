import React, { Component } from 'react'
import * as BooksAPI from '../BooksAPI'
import BookItem from './BookItem';
import { Link } from 'react-router-dom';

class SearchBook extends Component {
    state = {
        query: '',
        books: []
    }

    searchBooks = (query) => {
        BooksAPI.search(query).then((books) => {
            if (!books.items) {
                this.setShelfByBookId(books)
            }
        });
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

    handleQuery = query => {
        this.setState(() => ({ query: query }));
        this.searchBooks(query);
    }

    setShelfByBookId = (books) => {
        BooksAPI.getAll().then((myBooks) => {
            books.forEach((book, index) => {
                const bookInMyBooks = myBooks.find((myBook) => myBook.id === book.id);
                if (bookInMyBooks) {
                    books[index].shelf = bookInMyBooks.shelf;
                    this.setState(() => ({
                        books: books
                    }))
                }
            });
        })
    }

    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to='/'>Close</Link>
                    <div className="search-books-input-wrapper">
                        <input
                            type="text"
                            placeholder="Search by title or author"
                            onChange={(event) => this.handleQuery(event.target.value)} />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {this.state.books.length > 0 && (this.state.books.map((book) => (

                            <li key={book.id}>
                                <BookItem
                                    book={book}
                                    onMoveBook={this.moveBook}
                                    shelf={book.shelf}
                                >
                                </BookItem>
                            </li>
                        )))}
                    </ol>
                </div>Í
            </div>
        )
    }

}

export default SearchBook;