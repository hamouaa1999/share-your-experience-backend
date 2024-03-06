import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    photographer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "photographer",
        required: true
    },
    first: {
        type: String,
        required: true
    },
    last: {
        type: String,
        required: false
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    likes: {
        type: [mongoose.Schema.Types.ObjectId],
        required: true
    },
    comments: {
        type: Number,
        required: true
    },
    views: {
        type: Number,
        required: true
    },
    tags: {
        type: [String],
        required: true
    }
})


export default mongoose.model('Post', postSchema);