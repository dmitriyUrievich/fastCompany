import { createAction, createSlice } from '@reduxjs/toolkit'
import commentService from '../services/comment.service'
import { nanoid } from 'nanoid'
import { getCurrentUserId } from './users'

const commentsSlice = createSlice({
  name: 'comments',
  initialState: {
    entities: null,
    isLoading: true,
    error: null,
    lastFetch: null
  },
  reducers: {
    commentsRequested: (state) => {
      state.isLoading = true
    },
    commentsReceived: (state, action) => {
      state.entities = action.payload
      state.lastFetch = Date.now()
      state.isLoading = false
    },
    commentsRequestFailed: (state, action) => {
      state.error = action.payload
      state.isLoading = false
    },
    commentsCreated: (state, action) => {
      state.entities.push(action.payload)
    },
    commentsRemoved: (state, action) => {
      state.entities = state.entities.filter(c => c.id!==action.payload)
    }
  }
})

const { reducer: commentsReducer, actions } = commentsSlice
const { commentsRequested, commentsReceived, commentsRequestFailed, commentsCreated, commentsRemoved } = actions
const addCommentRequested = createAction('comments/addCommentRequested')
const remuveCommentRequested = createAction('comments/removeCommentRequested')
export const loadcommentsList = (userId) => async(dispatch, getState) => {
  dispatch(commentsRequested())
  try {
    const { content } = await commentService.getComments(userId)
    dispatch(commentsReceived(content))
  } catch (error) {
    dispatch(commentsRequestFailed(error.message))
  }
}
export const createComment = (payload) => async(dispatch, getState) => {
  dispatch(addCommentRequested(payload))
  const comment = {
    ...payload,
    _id: nanoid(),
    created_at: Date.now(),
    userId: getCurrentUserId()(getState())
  }
  try {
    const { content } = await commentService.createComment(comment)
    dispatch(commentsCreated(content))
  } catch (error) {
    dispatch(commentsRequestFailed(error.message))
  }
}
export const removeComments = (commentId) => async(dispatch) => {
  dispatch(remuveCommentRequested())
  try {
    const { content } = await commentService.removeComment(commentId)
    if (content === null) {
      dispatch(commentsRemoved(commentId))
    }
  } catch (error) {
    dispatch(commentsRequestFailed(error.message))
  }
}

export const getComments = () => (state) => state.comments.entities
export const getCommentsLoadingStatus = () => (state) => state.comments.isLoading

export default commentsReducer
