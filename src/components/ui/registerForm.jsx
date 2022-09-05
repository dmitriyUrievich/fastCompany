import React, { useEffect, useState } from 'react'
import { validator } from '../../utils/validator'
import TextField from '../form/textField'
import api from '../../api'
import SelectFild from '../form/selectFild'
import RadioFild from '../form/radiofild'
import MultiSelectField from '../form/multiSelectField'
import CheckBoxField from '../form/checkBoxField'
const RegisterForm = () => {
  const [qualities, setQualities] = useState({})
  const [data, setData] = useState({
    sex: 'Male',
    email: '',
    password: '',
    professions: '',
    licence: false,
    qualities: []
  }
  )
  const [errors, serErrors] = useState({})
  const [professions, setProfessions] = useState()

  useEffect(() => {
    api.professions.fetchAll()
      .then((data) => setProfessions(data))
    api.qualities.fetchAll()
      .then((data) => setQualities(data))
  }, [])

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
    },
    profession: {
      isRequired: {
        message: 'Обязательно выберите вашу профессию'
      }
    },
    licence: {
      isRequired: {
        message:
          'Подтвердите лицензионное соглашение'
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
      <SelectFild
        label="Выбери свою профессию"
        defaultOption="Choose..."
        options={professions}
        name="profession"
        onChange={handleChange}
        value={data.profession}
        error={errors.profession}
      />
      <RadioFild
        value={data.sex}
        name='sex'
        label='Выберите ваш пол'
        onChange={handleChange}
        options={
          [
            { name: 'Male', value: 'Male' },
            { name: 'Female', value: 'Female' },
            { name: 'Other', value: 'Other' }
          ]
        }
      />
      <MultiSelectField
        closeMenuSelect={false}
        options={qualities}
        onChange={handleChange}
        defaultValue={data.qualities}
        name="qualities"
        label='Выберите ваши качества'/>

      <CheckBoxField
        value={data.licence}
        onChange={handleChange}
        name="licence"
        error={errors.licence}
      >
        Подтвердить <a>лицензионное соглашение</a>
      </CheckBoxField>

      <button className='btn btn-primary w-100 mx-auto' disabled={!isValid}>Button</button>
    </form>
  )
}

export default RegisterForm
