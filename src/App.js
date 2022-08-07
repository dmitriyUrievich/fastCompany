import React, { useState, useEffect } from 'react'
import Users from './component/users'
import API from './api'

const App = () => {
  const [users, setUsers] = useState()

  useEffect(() => {
    API.users.fetchAll().then((data) => setUsers(data))
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

  return (
    <>
      {users && (
        <Users
          users={users}
          handlerDelete={handlerDelete}
          toggleStatus={toggleStatus}
        />
      )}
    </>
  )
}

export default App
