import React from 'react'
import BookShelf from './BookShelf'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { string } from 'prop-types';


class Layout extends React.Component {

  componentDidMount() {
    this.props.getAllBooks();
  }

  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          {this.props.bookShelfs.map(shelf => (
            <BookShelf
              key={shelf.id}
              onMoveBook={this.props.moveBook}
              books={this.props.getBooksByShelf(shelf.id)}
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

Layout.propTypes = {
  bookShelfs: PropTypes.arrayOf( PropTypes.shape({ id: string, description: string })),
  moveBook: PropTypes.func.isRequired,
  getBooksByShelf: PropTypes.func.isRequired
}

export default Layout
