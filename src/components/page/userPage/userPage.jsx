import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'
import QualitiesList from '../../qualities/qualitiesList'
import API from '../../../api'
import _ from 'lodash'

const UserPage =({ userId }) => {
  const [user, setUser] = useState()
  const history = useHistory()

  const renderUser = (user) => {
    const allUsers = () => {
      history.replace('/users')
    }
    return (
      <>
        <h1>{user.name}</h1>
        <h2>{`Профессия: ${_.get(user, 'profession.name')}`}</h2>
        <QualitiesList qualities={user.qualities} />
        <h3>completedMeetings: {user.completedMeetings}</h3>
        <h2>Rate: {user.rate}</h2>
        <button className='btn btn-primary mt-2 ' onClick={allUsers}>Все пользователи</button>
      </>
    )
  }

  useEffect(() => {
    API.users.getById(userId).then((user) => setUser(user))
  }, [])

  return user ? renderUser(user) : <h2>Loading..</h2>
}

UserPage.propTypes = {
  userId: PropTypes.string
}
export default UserPage
