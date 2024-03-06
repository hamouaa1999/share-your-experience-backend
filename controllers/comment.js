import axios from "axios";
import Comment from "../models/Comment.js"
import Post from "../models/Post.js";

export const getComments = async function(request, response) {
    try {
        const comments = await Comment.find();
        return response.status(200).json({comments})
    } catch(error) {
        return response.status(400).json({error: error.message});
    }
}

export const addComment = async function (request, response) {
    try {
        const comment = await Comment.create({...request.body});
        
        let post = await Post.findOne({_id: request.body.post});
        const updatedPost = await Post.findByIdAndUpdate(request.body.post, {$set: { comments: post.comments + 1 }}, { new: true });
        return response.status(200).json({comment});
    } catch (error) {
        return response.json({error: error.message});
    }
}

export const getCommentsOfPost = async function(request, response) {
    try {
        const postId = request.params.id;
        const comments = await Comment.find({post: postId});
        return response.status(200).json({comments: comments})
    } catch (error) {
        console.log(error.message)
        return response.status(400).json({ error: error.message});
    }
}

export const updateComment = async function(request, response) {
    try {
        const commentId = request.params.id;
        const comment = await Comment.findByIdAndUpdate(commentId, {...request.body}, { new: true });
        return response.status(200).json({comment});
    } catch (error) {
        return response.status(400).json({error: error.message});
    }
}

export const deleteComment = async function(request, response) {
    try {
        const commentId = request.params.id;
        const comment = await Comment.findByIdAndDelete(commentId);
        let post = await Post.findOne({_id: comment.post});
        await Post.findByIdAndUpdate(comment.post, {$set: { comments: post.comments > 1 ? post.comments - 1 : 0 }}, { new: true });
        return response.status(200).json({comment});
    } catch (error) {
        console.log(error.message)
        return response.status(400).json({error: error.message});
    }
}