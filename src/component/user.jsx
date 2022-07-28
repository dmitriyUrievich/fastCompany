import React from 'react'
import Bookmark from './bookmark'
import qualitys from './qualitys'
import PropTypes from 'prop-types'

const User = (props) => {
  const {
    _id,
    name,
    qualities,
    profession,
    completedMeetings,
    rate,
    onDelete
  } = props

  return (
    <tr>
      <td>{name}</td>
      <td>{qualitys(qualities)}</td>
      {<td>{profession.name}</td>}
      <td>{completedMeetings}</td>
      <td>{rate}/5</td>
      <td>
        <Bookmark {...props} />
      </td>
      <td>
        <button
          type="button"
          className="btn btn-danger badge m-2"
          onClick={() => onDelete(_id)}
        >
          Delete
        </button>
      </td>
    </tr>
  )
}

User.propTypes = {
  _id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  qualities: PropTypes.string.isRequired,
  profession: PropTypes.string.isRequired,
  completedMeetings: PropTypes.string.isRequired,
  rate: PropTypes.number.isRequired,
  onDelete: PropTypes.func.isRequired
}

export default User
