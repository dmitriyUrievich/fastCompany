import React, { useState } from 'react'
import Users from './component/users'
import API from './api'
import SearchStatus from './component/searchStatus'

const App = () => {
  const [users, setUsers] = useState(API.users.fetchAll())
  const [status, setStatus] = useState(
    users.map((item) => ({ _id: item._id, status: false }))
  )

  const handlerDelete = (id) => {
    setUsers((prevState) => prevState.filter((user) => user._id !== id))
  }

  const toggleStatus = (id) => {
    setStatus(
      status.map((item) => {
        if (item._id === id) {
          item.status = !item.status
        }
        return item
      })
    )
  }

  return (
    <>
      <SearchStatus number={users.length} />
      {users.length > 0 && (
        <Users
          users={users}
          handlerDelete={handlerDelete}
          toggleStatus={toggleStatus}
          status={status}
        />
      )}
    </>
  )
}

export default App
