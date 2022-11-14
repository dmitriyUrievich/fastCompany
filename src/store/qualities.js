import { createSlice } from '@reduxjs/toolkit'
import qualityService from '../services/quality.service'

const qualitiesSlice = createSlice({
  name: 'qualities',
  initialState: {
    entities: null,
    isLoading: true,
    error: null
  },
  reducers: {
    qualitiesRequested: (state) => {
      state.isLoading = true
    },
    qualitiesReceved: (state, action) => {
      state.entities = action.payload
      state.isLoading = false
    },
    qualitiesRequestFiled: (state, action) => {
      state.error = action.payload
      state.isLoading = false
    }
  }
}
)

const { reducer: qualitiesReducer, actions } = qualitiesSlice
const { qualitiesRequested, qualitiesReceved, qualitiesRequestFiled } = actions

export const loadQualitiesList = () => async(dispatch) => {
  dispatch(qualitiesRequested())
  try {
    const { content } = await qualityService.fetchAll()
    dispatch(qualitiesReceved(content))
  } catch (e) {
    dispatch(qualitiesRequestFiled(e.message))
  }
}

export const getQualities = () => (state) => state.qualities.entities
export const getQualitiesLoadingStatus = () => (state) => state.qualities.isLoading
export const getQualitiesById = (qualitiesId) => (state) => {
  if(state.qualities.entities){
    const qualitiesArray = []
    for(const qualId of qualitiesId ){
      for(const qual of state.qualities.entities){
          if(qual._id===qualId){
            qualitiesArray.push(qual)
            break
          }
      }
    }
    return qualitiesArray
  }
  return []
}

export default qualitiesReducer
