import express from 'express'
import { addComment, getComments, getCommentsOfPost, updateComment, deleteComment } from '../controllers/comment.js'

const commentRouter = express.Router()

commentRouter.get('/comments', getComments)

commentRouter.post('/add-comment', addComment);

commentRouter.get('/posts/:id/comments', getCommentsOfPost);

commentRouter.put('/update/:id', updateComment);

commentRouter.delete('/delete/:id', deleteComment);

export default commentRouter;