import React from 'react'
import PropTypes from 'prop-types'
const Qualitys = (qualities) => {
  return qualities.map((q) => (
    <span key={q._id} className={`badge bg-${q.color} m-2`}>
      {q.name}
    </span>
  ))
}

Qualitys.propTypes = {
  qualities: PropTypes.array.isRequired
}

export default Qualitys
