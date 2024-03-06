import express from 'express';
import { getPosts, getPost, addPost, updatePost, deletePost, getPostLikes } from '../controllers/post.js';
import Post from '../models/Post.js';

const postRouter = express.Router();

postRouter.get('/posts', getPosts);

postRouter.get('/post/:id', getPost);

postRouter.get('/post/:id/get-likers', getPostLikes);

postRouter.post('/posts', addPost);

postRouter.put('/update/:id', updatePost);

postRouter.delete('/delete/:id', deletePost);

postRouter.get('/delete-all', async (request, response) => { 
    await Post.deleteMany({}); 
    return response.status(200).send("Done");
});

export default postRouter;