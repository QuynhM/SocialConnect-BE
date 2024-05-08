const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reactionSchema = Schema({
    author: {
        type: Schema.Types.ObjectId,
        require: true,
        ref: "User",
    },
    targetType: {
        type: String,
        required: true,
        enum: ["Post", "Comment"],
    },
    targetId: {
        type: Schema.ObjectId,
        require: true,
        refPath: "targetType"
    },
    emoji: {
        type: String,
        require: true,
        enum: ["like"]
    },
    isLiked: {
        type: Boolean, default: false, select: false
    }
},
{ timestamps: true }
)

const Reaction = mongoose.model("Reaction", reactionSchema);
module.exports = Reaction;