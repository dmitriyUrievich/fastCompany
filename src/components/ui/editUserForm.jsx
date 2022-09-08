import React, { useEffect, useState } from 'react'
import api from '../../api'
import { validator } from '../../utils/validator'
import TextField from '../form/textField'
import SelectFild from '../form/selectFild'
import RadioFild from '../form/radiofild'
import MultiSelectField from '../form/multiSelectField'
import { useHistory } from 'react-router-dom'
const EditUserForm = ({ userId }) => {
  const [qualities, setQualities] = useState({})
  const [errors, serErrors] = useState({})
  const [profession, setprofession] = useState()
  const history = useHistory()
  const userArray = JSON.parse(localStorage.getItem('users'))
  const user = userArray.find((user) => String(user._id)===String(userId))
  const [data, setData] = useState({
    name: user.name,
    email: user.email,
    profession: user.profession._id,
    sex: user.sex,
    qualities: getQualitiesForMultiSelect(user.qualities)
  }
  )
  const getProfessionById = (id) => {
    for (const prof of profession) {
      if (prof.value === id) {
        return { _id: prof.value, name: prof.name }
      }
    }
  }

  function getQualitiesForMultiSelect(arr) {
    return arr.map((item) => {
      return {
        value: item._id,
        label: item.name,
        color: item.color
      }
    })
  }
  function getQualities(elements) {
    const qualitiesArray = []
    for (const elem of elements) {
      for (const quality in qualities) {
        if (elem.value === qualities[quality].value) {
          qualitiesArray.push({
            _id: qualities[quality].value,
            name: qualities[quality].label,
            color: qualities[quality].color
          })
        }
      }
    }
    return qualitiesArray
  }

  useEffect(() => {
    api.professions.fetchAll().then((data) => {
      const professionList = Object.keys(data).map((professionName) => ({
        name: data[professionName].name,
        value: data[professionName]._id
      }))
      setprofession(professionList)
    })
    api.qualities.fetchAll().then((data) => {
      const qualitiesList = Object.keys(data).map((optionName) => ({
        value: data[optionName]._id,
        label: data[optionName].name,
        color: data[optionName].color
      }))
      setQualities(qualitiesList)
    })
  }, [])

  const validatorConfig = {
    email: {
      isRequired: {
        message: 'Электронная почта обязательна для заполнения'
      },
      isEmail: {
        message: 'Email введен некорректно'
      }
    },
    name: {
      isRequired: {
        message: 'Имя обязателено для заполнения'
      }
    },
    profession: {
      isRequired: {
        message: 'Обязательно выберите вашу профессию'
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
    const { profession, qualities } = data
    api.users.update(userId, { ...data, profession: getProfessionById(profession), qualities: getQualities(qualities) })
    history.replace(`/users/${userId}`)
  }
  const handleChange = (target) => {
    setData((prevState) => (
      {
        ...prevState,
        [target.name]: target.value
      }
    ))
  }
  return (
    qualities&&profession
      ?<form onSubmit={handleSubmit}>
        <TextField
          label='Имя'
          name='name'
          value={data.name}
          onChange={handleChange}
          error={errors.name}
        />
        <TextField
          label='Почта'
          name='email'
          value={data.email}
          onChange={handleChange}
          error={errors.email}
        />
        <SelectFild
          label="Выбери свою профессию"
          defaultOption="Choose..."
          options={profession}
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
              { name: 'male', value: 'male' },
              { name: 'female', value: 'female' },
              { name: 'other', value: 'other' }
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

        <button className='btn btn-primary w-100 mx-auto' disabled={!isValid}>Обновить</button>
      </form>
      :<h2>loading</h2>

  )
}

export default EditUserForm
