import React, { useState } from "react";
import api from "../api";

const Users = () => {
  const [users,setUser] = useState(api.users.fetchAll())
  const handleDelete = (userId)=> {
    setUser(prevState => prevState.filter((user)=> user !== userId))
  }

  const getClasses =()=>{
    let classes = 'badge m-2 '
    classes+=users.length===0?'bg-danger':'bg-primary'
    return classes
  }

  function renderPhrase (number) {
    let text=''
      if(number >= 5 || number % 10 === 1){
        text ='человек тусанет с тобой сегодня'
    } else if((number % 10 >= 2 || number % 10 <=4) && number > 1){
        text = 'человека тусанут с тобой сегодня'
    }
      else {
        text = 'Никто с тобой не тусанет'
    }
    return `${number}` > 0 ? `${number} ${text}`:`${text}`
  }

  function userQualities (quality) {
    return quality.map((q)=> (
      <span key={q._id} className={`badge bg-${q.color} m-2`}>
        {q.name}
      </span>
      ))
  }

  function renderRows (users) {
    return users.map((user) => (
      <tr key={user._id} >
        <td>{user.name}</td>
        <td>{userQualities(user.qualities)}</td>
        <td>{user.profession.name}</td>
        <td>{user.completedMeetings}</td>
        <td>{user.rate}/5</td>
        <td>
          <button className='btn btn-danger btn-sm'
           onClick={() => handleDelete(user)}
          >
            Delete
          </button>
        </td>
      </tr>
    ))
  }

  function tableHeaders (){
    if(users.length !== 0){
      return <tr>
        <th scope='col'>Имя</th>
        <th scope='col'>Качества</th>
        <th scope='col'>Профессия</th>
        <th scope='col'>Встретился,раз</th>
        <th scope='col'>Оценка</th>
        <th scope='col'></th>
      </tr>
    }
  }

  return  ( <>
  <span className={getClasses()} >
    {renderPhrase(users.length)}
  </span>
      <table className='table'>
        <thead>
          {tableHeaders()}
        </thead>
          <tbody>
            {renderRows(users)}
          </tbody>
      </table>
  </>
  )
}
export default Users
