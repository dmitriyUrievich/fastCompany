import { orderBy } from 'lodash'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import CommentsList, { AddCommentForm } from '../common/comments'
import { useDispatch, useSelector } from 'react-redux'
import {
  createComment,
  getComments,
  getCommentsLoadingStatus,
  loadcommentsList,
  removeComments
} from '../../store/commenst'

const Comments = () => {
  const { userId } = useParams()
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(loadcommentsList(userId))
  }, [userId])
  const isLoading = useSelector(getCommentsLoadingStatus())
  const comments = useSelector(getComments())

  const handleSubmit = (data) => {
    dispatch(createComment({ ...data, pageId: userId }))
  }
  const handleRemoveComment = (id) => {
    dispatch(removeComments(id))
  }
  const sortedComments = orderBy(comments, ['created_at'], ['desc'])
  return (
    <>
      <div className="card mb-2">
        {' '}
        <div className="card-body ">
          <AddCommentForm onSubmit={handleSubmit} />
        </div>
      </div>
      {!isLoading
        ? (
          <div className="card mb-3">
            <div className="card-body ">
              <h2>Comments</h2>
              <hr />
              <CommentsList
                comments={sortedComments}
                onRemove={handleRemoveComment}
              />
            </div>
          </div>
        )
        :'loading'}
    </>
  )
}

export default Comments
