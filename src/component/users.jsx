import React from "react";
import User from "./user";

const Users = ({users, status, ...rest}) => {

  const createTable = () => {

    const {handlerDelete, toggleStatus} = rest

    return (
      <>
        <table className="table">
          <thead>
          <tr>
            <th scope='col'>Имя</th>
            <th scope='col'>Качества</th>
            <th scope='col'>Профессия</th>
            <th scope='col'>Встретился,раз</th>
            <th scope='col'>Оценка</th>
            <th scope='col'>Избранное</th>
            <th scope='col'></th>
          </tr>
          </thead>
          <tbody>
            {users.map(user =>
              <User
                key = {user._id}
                {...user}
                onDelete={handlerDelete}
                status = {status.find(item => item._id === user._id).status}
                onToggle = {toggleStatus}
              />)}
          </tbody>
        </table>
      </>
    )
  }
  return  (
    <> {(users.length > 0) && createTable()} </>
  )

}
export default Users
