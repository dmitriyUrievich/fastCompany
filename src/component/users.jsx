import React, { useState } from 'react'
import User from './user'
import Pagination from './pagination'
import paginate from '../utils/paginate'
import PropTypes from 'prop-types'

const Users = ({ users, status, ...rest }) => {
  const count = users.length
  const pageSize = 4
  const [currentPage, setCurrentPage] = useState(1)
  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex)
  }
  console.log('type rest', rest)
  const userCrop = paginate(users, currentPage, pageSize)

  const createTable = () => {
    const { handlerDelete, toggleStatus } = rest

    return (
      <>
        <table className="table">
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
                status={status.find((item) => item._id === user._id).status}
                onToggle={toggleStatus}
              />
            ))}
          </tbody>
        </table>
        <Pagination
          itemCount={count}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </>
    )
  }
  return <> {users.length > 0 && createTable()} </>
}
Users.propTypes = {
  users: PropTypes.array.isRequired,
  status: PropTypes.array.isRequired,
  handlerDeletUser: PropTypes.func.isRequired,
  handleChangeStatus: PropTypes.func.isRequired
}

export default Users
