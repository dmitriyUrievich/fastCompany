import React from 'react'
import PropTypes from 'prop-types'
import Quality from './quality'
import { useQualities } from '../../../hooks/useQualities'

const QualitiesList = ({ qualities }) => {
  const { getQualityById } = useQualities()
  return (
    <>
      {qualities.map((id) => {
        const quality = getQualityById(id)
        return quality ? <Quality key={id} {...quality} /> : null
      })}
    </>
  )
}

QualitiesList.propTypes = {
  qualities: PropTypes.array
}

export default QualitiesList
