import React from 'react'

const Bookmark= ({status, _id, onToggle}) => {
  return <button
    className={status ? 'bi bi-bookmark-fill' : 'bi bi-bookmark'} onClick={() => onToggle(_id)}>
  </button>
}

export default Bookmark
