import React from 'react'
import PropTypes from 'prop-types'

const Bookmark = ({ status, _id, onToggle }) => {
  return (
    <button
      className={status ? 'bi bi-bookmark-fill' : 'bi bi-bookmark'}
      onClick={() => onToggle(_id)}
    ></button>
  )
}

Bookmark.propTypes = {
  status: PropTypes.bool.isRequired,
  _id: PropTypes.number.isRequired,
  onToggle: PropTypes.func.isRequired
}
export default Bookmark
