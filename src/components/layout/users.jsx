import React from 'react'
import UsersListPage from '../page/userListPage'
import { useParams } from 'react-router-dom'
import UserPage from '../page/userPage'

const Users =() => {
  const { userId } = useParams()

  return userId?<UserPage userId={userId}/>:<UsersListPage/>
}
export default Users
