import React from 'react'
import Users from './users'
import { useParams } from 'react-router-dom'
import UserPage from './userPage'

const UserList =() => {
  const { userId } = useParams()

  return userId?<UserPage/>:<Users/>
}
export default UserList
