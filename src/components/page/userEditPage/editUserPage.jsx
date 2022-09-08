import React from 'react'
import EditUserForm from '../../ui/editUserForm'
import { useParams } from 'react-router-dom'
const EditUserPage = () => {
  const { userId }= useParams()
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3 shadow p-4">
          <EditUserForm userId={userId}/>
        </div>
      </div>
    </div>
  )
}
export default EditUserPage
