import React, { Component } from 'react'
import BookItem from './BookItem';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { string, array } from 'prop-types';

class SearchBook extends Component {


    handleQuery = query => {
        if (query) {
            this.props.searchBooks(query);
        } else {
            this.props.clearBooks();
        }
    }

    componentDidMount() {
        this.props.clearBooks();
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
                        {this.props.books.length > 0 && (this.props.books.map((book) => (

                            <li key={book.id}>
                                <BookItem
                                    book={book}
                                    onMoveBook={this.props.moveBook}
                                    shelf={book.shelf}
                                    books={this.props.books}
                                >
                                </BookItem>
                            </li>
                        )))}
                    </ol>
                </div>
            </div>
        )
    }

}

SearchBook.propTypes = {
    books: PropTypes.arrayOf(PropTypes.shape({
        id: string,
        title: string,
        authors: array
    })),
    refreshAllBooks: PropTypes.func.isRequired,
    searchBooks: PropTypes.func.isRequired,
    clearBooks: PropTypes.func.isRequired,
    moveBook: PropTypes.func.isRequired
}

export default SearchBook;