import Post from "../models/Post.js"
import User from "../models/User.js"

export const getPosts = async function(request, response) {
    try {
        const posts = await Post.find();
        return response.status(200).json({posts});
    } catch (error) {
        response.status(400).json({error: error.message});
    }
}

export const getPost = async (request, response) => {
    try {
        const post = await Post.findById(request.params.id);
        return response.status(200).json({ post });
    } catch (error) {
        return response.status(400).json({ error: error.message })
    }
}

export const getPostLikes = async (request, response) => {
    try {
        const id = request.params.id;
        const post = await Post.findById(id);
        const indexes = post.likes;
        const likers = [];
        let user = null;
        for (let index = 0; index < indexes.length; index++) {
            user = await User.findById(indexes[index]);
            likers.push(user);
        }

        return response.status(200).json({ likers: [...likers] })
    } catch(error) {
        return response.status(400).json({error: error.message})
    }
}

export const updatePost = async function(request, response) {
    try {
        const postId = request.params.id;
        const post = await Post.findByIdAndUpdate(postId, {...request.body}, { new: true });
        return response.status(200).json({post});
    } catch (error) {
        return response.status(400).json({error: error.message});
    }
}

export const deletePost = async function(request, response) {
    try {
        const postId = request.params.id;
        const post = await Post.findByIdAndDelete(postId);
        return response.status(200).json({post});
    } catch (error) {
        return response.status(400).json({error: error.message});
    }
}

export const addPost = async function(request, response) {
    try {
        console.log('hello')
        const post = await Post.create(request.body); 
        return response.status(200).json({post});
    } catch (error) {
        response.status(400).json({error: error.message});
    }
}