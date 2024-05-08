const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = Schema({
    content: {
        type: String,
        require: true,
    },
    image: {
        type: String,
        default: "",
    },
    author: {
        type: Schema.Types.ObjectId,
        require: true,
        ref: "User",
    },

    isDeleted: { type: Boolean, default: false, select: false},
    commentCount: { type: Number, default: 0 },
    reactions: {
        like: {type: Number, default: 0},
        likes: [{
            type: Schema.Types.ObjectId,
            ref: "Reaction"
        }] 
    },
  
},
{ timestamps: true }
)

const Post = mongoose.model("Post", postSchema);
module.exports = Post;