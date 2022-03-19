import React from 'react'
import './App.css'
import SearchBook from './Book/SearchBook'
import Layout from './Book/Layout'
import { Route, Routes } from 'react-router-dom'

class BooksApp extends React.Component {

  render() {
    return (
      <div className="app">
        <Routes>
          <Route exact path='/' element={<Layout />}>
          </Route>
          <Route path='/search' element={<SearchBook />}></Route>
        </Routes>
      </div>
    )
  }
}

export default BooksApp
