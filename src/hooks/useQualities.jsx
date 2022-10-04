import React, { useContext, useState, useEffect } from 'react'
import qualitiesService from '../services/qualities.service'
import { toast } from 'react-toastify'
import PropTypes from 'prop-types'

const QualitiesContext = React.createContext()

export const useQualities = () => {
  return useContext(QualitiesContext)
}

const QualitiesProvider = ({ children }) => {
  const [, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [qualities, setQualities] = useState([])

  useEffect(() => {
    getQualities()
  }, [])
  useEffect(() => {
    if (error !== null) {
      toast(error)
      setError(null)
    }
  }, [error])

  async function getQualities() {
    try {
      const { content } = await qualitiesService.get()

      setQualities(content)
      setLoading(false)
    } catch (error) {
      errorCatcher(error)
    }
  }

  function getQualityById(id) {
    const qual = qualities.find((q) => q._id === id)

    return qual
  }

  function errorCatcher(error) {
    const { message } = error.response.data
    setError(message)
    setLoading(false)
  }

  return (
    <QualitiesContext.Provider value={ { getQualityById } }>
      {children}
    </QualitiesContext.Provider>
  )
}

QualitiesProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}

export default QualitiesProvider
