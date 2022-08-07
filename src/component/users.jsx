import React, { useState, useEffect } from 'react'
import User from './user'
import Pagination from './pagination'
import paginate from '../utils/paginate'
import PropTypes from 'prop-types'
import GroupList from './groupList'
import api from '../api/index'
import SearchStatus from './searchStatus'

const Users = ({ users, ...rest }) => {
  const pageSize = 2
  const [currentPage, setCurrentPage] = useState(1)
  const [professions, setProfessions] = useState()
  const [selecredProf, setSelecredProf] = useState()

  useEffect(() => {
    api.professions.fetchAll()
      .then((data) => setProfessions(data))
  }, [])
  useEffect(() => {
    setCurrentPage(1)
  }, [selecredProf])

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex)
  }
  const handleProfessionSelect = item => {
    setSelecredProf(item)
  }

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

  if ((currentPage -1)*pageSize-1>=filtredUsers.length) {
    setCurrentPage(currentPage-1)
  }

  const userCrop = paginate(filtredUsers, currentPage, pageSize)

  const createTable = () => {
    const { handlerDelete, toggleStatus } = rest

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
            {userCrop.length > 0 && (<table className="table">
              <thead>
                <tr>
                  <th scope="col">Имя</th>
                  <th scope="col">Качества</th>
                  <th scope="col">Профессия</th>
                  <th scope="col">Встретился,раз</th>
                  <th scope="col">Оценка</th>
                  <th scope="col">Избранное</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {userCrop.map((user) => (
                  <User
                    key={user._id}
                    {...user}
                    onDelete={handlerDelete}
                    status={users.find((item) => item._id === user._id).bookmark}
                    onToggle={toggleStatus}
                  />
                ))}
              </tbody>
            </table>)
            }<div className="d-flex justify-content-center">
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
  return createTable()
}
Users.propTypes = {
  users: PropTypes.array.isRequired,
  handlerDeletUser: PropTypes.func,
  handleChangeStatus: PropTypes.func
}

export default Users
