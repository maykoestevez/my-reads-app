import React from 'react'
import PropTypes from 'prop-types'
import BookShelfList from './Commons'
import { string } from 'prop-types';
import { arrayOf } from 'prop-types';

function BookItem(Props) {
    const bookShelfs = BookShelfList;

    const getAuthors = author => {
        if (author) {
            return book.authors.map(a => `${a} `);
        }
    }

    const { book, onMoveBook, shelf } = Props;
    return (
        <div className="book">
            <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 188, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                <div className="book-shelf-changer">
                    <select
                        onChange={(value) => onMoveBook(book, value.target.value)}
                        value={shelf ? shelf : 'none'} >
                        <option value="move" disabled>Move to...</option>
                        {
                            bookShelfs.map((s) => (
                                <option key={s.id} value={s.id}>{s.description}</option>
                            ))
                        }
                    </select>
                </div>
            </div>
            <div className="book-title">{book.title}</div>
            <div className="book-authors">{getAuthors(book.authors)}</div>
        </div>
    )
}

BookItem.propTypes = {
    book: PropTypes.shape({
        id: string,
        title: string,
        authors: arrayOf(string)


    }),
    onMoveBook: PropTypes.func.isRequired,
    shelf: string
}
export default BookItem;