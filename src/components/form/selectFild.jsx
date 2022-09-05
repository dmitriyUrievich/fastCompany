import React from 'react'
import PropTypes from 'prop-types'

const SelectFild = ({ label, value, onChange, defaultOptions, options, name, error }) => {
  const getInputClasses = () => {
    return 'form-select' + (error ? ' is-invalid' : '')
  }

  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value })
  }

  const optionsArray = !Array.isArray(options) && typeof (options)==='object'
    ?Object.keys(options).map(optionName => ({ name: options[optionName].name, value: options[optionName]._id }))
    :options
  return (
    <div className="mb-4">
      <label htmlFor={name} className="form-label">{label}</label>
      <select
        className={getInputClasses()}
        id={name}
        name={name}
        value={value}
        onChange={handleChange}>
        <option
          disabled
          value=''>
          {defaultOptions}
        </option>
        {
          optionsArray && optionsArray.map(option => <option
            key={option.value}
            value={option.value}>
            {option.name}
          </option>)
        }

      </select>
      {error&&<div className="invalid-feedback">
        {error}
      </div>}
    </div>
  )
}

SelectFild.propTypes = {
  defaultOptions: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.string,
  options: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
}

export default SelectFild
