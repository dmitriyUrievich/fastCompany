import React, { useState, useEffect } from 'react'
import Pagination from './pagination'
import paginate from '../utils/paginate'
import PropTypes from 'prop-types'
import GroupList from './groupList'
import SearchStatus from './searchStatus'
import UsersTable from './usersTable'
import _ from 'lodash'
import api from '../api/index'
const Users = () => {
  const pageSize = 6
  const [currentPage, setCurrentPage] = useState(1)
  const [professions, setProfessions] = useState()
  const [selecredProf, setSelecredProf] = useState()
  const [users, setUsers] = useState()
  const [sortBy, setSortBy] = useState({ iter: 'name', order: 'asc' })
  useEffect(() => {
    api.professions.fetchAll()
      .then((data) => setProfessions(data))
  }, [])
  useEffect(() => {
    setCurrentPage(1)
  }, [selecredProf])
  useEffect(() => {
    api.users.fetchAll().then((data) => setUsers(data))
  }, [])

  const handlerDelete = (id) => {
    setUsers((prevState) => prevState.filter((user) => user._id !== id))
  }

  const toggleStatus = (id) => {
    setUsers(
      users.map((item) => {
        if (item._id === id) {
          item.bookmark = !item.bookmark
        }
        return item
      })
    )
  }

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex)
  }
  const handleProfessionSelect = item => {
    setSelecredProf(item)
  }
  const handleSort = (item) => {
    setSortBy(item)
  }
  if (users) {
    let filtredUsers = null
    if (selecredProf) {
      filtredUsers = users.filter(
        (user) =>
          JSON.stringify(user.profession) === JSON.stringify(selecredProf)
      )
    } else {
      filtredUsers = users
    }

    const count = filtredUsers.length

    const sortedUsers = _.orderBy(filtredUsers, [sortBy.path], [sortBy.order])

    if ((currentPage -1)*pageSize-1>=filtredUsers.length) {
      setCurrentPage(currentPage-1)
    }

    const userCrop = paginate(sortedUsers, currentPage, pageSize)

    const clearFilter = () => setSelecredProf()
    return (
      <div className="d-flex">
        {professions&& (
          <div className="d-flex flex-column flex-shrink-0 p-3">
            <GroupList items={professions}
              selectedItem={selecredProf}
              onItemSelect={handleProfessionSelect}
            />
            <button className='btn btn-primary mt-2' onClick={clearFilter}>Очистить</button>
          </div>)}

        {count > 0 && (
          <div className="d-flex flex-column">
            <div className="w-10 bd-highlight">
              <SearchStatus number={count} />
            </div>
            {count > 0 && (
              <UsersTable
                users={userCrop}
                onSort={handleSort}
                selectedSort={sortBy}
                onDelete={handlerDelete}
                onToggleBookMark={toggleStatus}
              />)}
            <div className="d-flex justify-content-center">
              <Pagination
                itemCount={count}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={handlePageChange}
              /> </div>
          </div>)}
      </div>
    )
  }
  return 'Loading...'
}

Users.propTypes = {
  users: PropTypes.array.isRequired
}

export default Users
