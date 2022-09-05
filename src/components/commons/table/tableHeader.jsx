import React from 'react'
import PropTypes from 'prop-types'

const TableHeader =({ onSort, selectedSort, columns }) => {
  const handleSort = (item) => {
    if (selectedSort.path===item) {
      onSort({
        ...selectedSort,
        order: selectedSort.order==='asc'?'desc':'asc'
      })
    } else {
      onSort({ path: item, order: 'asc' })
    }
  }

  const toggleArrow=(item) => {
    if (item) {
      if (selectedSort.path === item) {
        if (selectedSort.order === 'asc') {
          return <i className="bi bi-caret-up-fill"></i>
        } else {
          return <i className="bi bi-caret-down-fill"></i>
        }
      }
    }
  }
  return (
    <thead>
      <tr>
        {Object.keys(columns).map((column) => (
          <th key={column}
            onClick={ columns[column].path?() => handleSort(columns[column].path):undefined}
            scope="col"
            {...{ role: columns[column].path&&'button' }}
          >
            {columns[column].name}
            {toggleArrow(columns[column].path)}
          </th>))}
      </tr>
    </thead>
  )
}

TableHeader.propTypes = {
  onSort: PropTypes.func,
  selectedSort: PropTypes.object.isRequired,
  columns: PropTypes.object.isRequired
}

export default TableHeader
