import React, { useEffect, useState } from 'react'
import { validator } from '../../utils/validator'
import TextField from '../form/textField'
import CheckBoxField from '../form/checkBoxField'
const LoginForm = () => {
  const [data, setData] = useState({ email: '', password: '', stayOn: false })
  const [errors, serErrors] = useState({})

  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value
    }))
  }

  const validatorConfig = {
    email: {
      isRequired: {
        message: 'Электронная почта обязательна для заполнения'
      },
      isEmail: {
        message: 'Email введен некорректно'
      }
    },
    password: {
      isRequired: {
        message: 'Пароль обязателен для заполнения'
      },
      isCapital: {
        message: 'Пароль должен содержать хотя бы одну заглавную букву'
      },
      isContainDigit: {
        message: 'Пароль должен содержать хотя бы одно число'
      },
      min: {
        message: 'Пароль должен состоять минимум из 8 символов',
        value: 8
      }
    }
  }
  useEffect(() => { validate() }, [data])

  const validate = () => {
    const errors = validator(data, validatorConfig)
    serErrors(errors)
    return Object.keys(errors).length === 0
  }
  const isValid = Object.keys(errors).length === 0

  function handleSubmit(e) {
    e.preventDefault()
    const isValid = validate()
    if (!isValid) return
    console.log(data)
  }
  return (

    <form onSubmit={handleSubmit}>
      <TextField
        label='Почта'
        name='email'
        value={data.email}
        onChange={handleChange}
        error={errors.email}
      />
      <TextField
        label='Пароль'
        type='password'
        name='password'
        value={data.password}
        onChange={handleChange}
        error={errors.password}
      />

      <CheckBoxField
        value={data.stayOn}
        onChange={handleChange}
        name='stayOn'
      >Оставаться в системе
      </CheckBoxField>

      <button className='btn btn-primary w-100 mx-auto' disabled={!isValid}>Button</button>
    </form>

  )
}
export default LoginForm
