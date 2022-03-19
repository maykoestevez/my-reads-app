import React from 'react';
import PropTypes from 'prop-types';
import BookItem from './BookItem';
import { string } from 'prop-types';
import { array } from 'prop-types';

function BookShelf(Props) {
    const { shelf, books, onMoveBook } = Props;
    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{shelf.description}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {books.map((book) => (
                        <li key={book.id}>
                            <BookItem
                                book={book}
                                onMoveBook={onMoveBook}
                                shelf={shelf.id}
                            >
                            </BookItem>
                        </li>
                    ))}
                </ol>
            </div>
        </div>
    )
}

BookShelf.propTypes = {
    shelf: PropTypes.shape({
        name: PropTypes.string,
        id: PropTypes.string
    }),
    books: PropTypes.arrayOf(PropTypes.shape({
        id: string,
        title: string,
        authors: array
    })),
    onMoveBook: PropTypes.func.isRequired,
}

export default BookShelf;