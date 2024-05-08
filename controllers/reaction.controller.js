const mongoose = require("mongoose");
const { sendResponse, AppError, catchAsync } = require('../helpers/utils');
const Reaction = require('../models/Reaction');

const reactionController = {};

const calculateReactions = async (targetId, targetType, userId) => {
    const stats = await Reaction.aggregate([
        {
            $match: {
                targetId: new mongoose.Types.ObjectId(targetId),
                targetType: targetType
            }
        },
        {
            $group: {
                _id: "$targetId",
                like: {
                    $sum: {
                        $cond: [{ $eq: ["$emoji", "like"]}, 1, 0]
                    }
                },
                isLiked: {
                    $max: {
                        $cond: [{ $and: [{ $eq: ["$author", new mongoose.Types.ObjectId(userId)] }, { $eq: ["$emoji", "like"] }] }, true, false]
                    }
                }
            }
        }
    ]);

    const reactions = {
        like: (stats[0] && stats[0].like) || 0,
        isLiked: (stats[0] && stats[0].isLiked) || false,
    };
    console.log(stats);

    await mongoose.model(targetType).findByIdAndUpdate(targetId, { $set: { reactions: { like: reactions.like } } });
    return reactions;
};


reactionController.saveReaction = catchAsync(async (req, res, next) => {
    const currentUserId = req.userId;
    const { targetType, targetId } = req.body;

    // Check if the target object exists
    const targetObject = await mongoose.model(targetType).findById(targetId);
    if (!targetObject) {
        return next(new AppError(400, `${targetType} not found`, "Create Reaction Error"));
    }

    // Find or toggle the existing reaction
    let reaction = await Reaction.findOne({ targetType, targetId, author: currentUserId });
    if (reaction) {
        await reaction.deleteOne();
    } else {
        reaction = await Reaction.create({ targetType, targetId, author: currentUserId, emoji: "like" });
    }

    const reactions = await calculateReactions(targetId, targetType, currentUserId);

    return sendResponse(res, 200, true, reactions, null, "Save reaction successful");
});



module.exports = reactionController;

