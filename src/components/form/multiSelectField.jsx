import React from 'react'
import Select from 'react-select'
import PropTypes from 'prop-types'

const MultiSelectField = ({ options, onChange, name, label, defaultValue }) => {
  const optionsArray = !Array.isArray(options) && typeof (options)==='object'
    ?Object.keys(options).map(optionName => (
      {
        label: options[optionName].name,
        value: options[optionName]._id
      }
    )
    )
    :options

  const handleChange = (value) => {
    console.log('lolipup', value)
    onChange({ name, value })
  }

  return (
    <div className="mb-4">
      <label className="form-label">{label}</label>
      <Select
        isMulti
        options={optionsArray}
        defaultValue={defaultValue}
        className="basic-multi-select"
        classNamePrefix="select"
        onChange={handleChange}
        name={name}
      />
    </div>
  )
}

MultiSelectField.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func,
  defaultValue: PropTypes.array,
  options: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
}
export default MultiSelectField
