import React, { useState } from 'react'
import LoginForm from '../ui/loginForm'
import { useParams } from 'react-router-dom'
import RegisterForm from '../ui/registerForm'
const login = () => {
  const { type }=useParams()
  const [formType, serFormType] = useState(type==='register'?type:'login')
  const toogleFormType = () => {
    serFormType(prevState => prevState==='register'?'login':'register')
  }
  return (
    <div className="conteiner mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3 shadow p-4" >
          {formType==='register'
            ?<>
              <h3 className="mb-4">Register</h3>
              <RegisterForm/>
              <p>Alredy have account? <a role='button' onClick={toogleFormType} >Sign In</a></p>
            </>
            :<>
              <h3 className="mb-4">Login</h3>
              <LoginForm/>
              <p>Dont have account? <a role='button' onClick={toogleFormType} >Sign App</a></p>
            </>}
        </div>
      </div>
    </div>

  )
}

export default login
