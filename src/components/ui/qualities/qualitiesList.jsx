import React from 'react'
import PropTypes from 'prop-types'
import Quality from './quality'
import { useSelector } from 'react-redux'
import { getQualitiesById, getQualitiesLoadingStatus } from '../../../store/qualities'

const QualitiesList = ({ qualities }) => {
  const qualitiesLoading = useSelector(getQualitiesLoadingStatus())
  qualitiesLoading && 'Loading...'
  const qualitiesList = useSelector(getQualitiesById(qualities))
  return (
    <>
      {qualitiesList.map((qual) => (
        <Quality key={qual} id={qual} />
      ))}
    </>
  )
}

QualitiesList.propTypes = {
  qualities: PropTypes.array
}

export default QualitiesList
