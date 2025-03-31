import mongoose from "mongoose";
const { isValidObjectId } = mongoose;
import { User } from "../model/user.model.js";
import { Followers } from "../model/follower.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// 🔄 Toggle Following (Follow/Unfollow)
const toggleFollowing = asyncHandler(async (req, res) => {
    try {
        const { userId } = req.params;
        const ownerId = req.user?._id; // ✅ The logged-in user

        if (!ownerId) {
            throw new ApiError(401, "Unauthorized user");
        }

        if (!isValidObjectId(userId) || !isValidObjectId(ownerId)) {
            throw new ApiError(400, "Invalid user ID");
        }

        if (userId.toString() === ownerId.toString()) {
            throw new ApiError(400, "You cannot follow yourself");
        }

        // 🔍 Check if already following
        const followingCheck = await Followers.findOne({ owner: userId, follower: ownerId }).lean();

        if (followingCheck) {
            await Followers.findByIdAndDelete(followingCheck._id);
            return res.status(200).json(new ApiResponse(200, {}, "Following removed successfully"));
        }

        // ➕ Follow the user
        await Followers.create({ owner: userId, follower: ownerId });

        return res.status(200).json(new ApiResponse(200, {}, "User followed successfully"));
    } catch (error) {
        throw new ApiError(500, error.message || "Server error");
    }
});

// 👥 Get Followers of a User
const getFollowers = asyncHandler(async (req, res) => {
    const ownerId = req.params.ownerId; // ✅ Fix incorrect destructuring

    if (!isValidObjectId(ownerId)) {
        throw new ApiError(400, "Invalid user ID");
    }

    const followers = await Followers.find({ owner: ownerId }).populate("follower", "username email");

    return res.status(200).json(new ApiResponse(200, { followers }, "Followers retrieved successfully"));
});

// 👀 Get Users Followed by Authenticated User
const getFollowing = asyncHandler(async (req, res) => {
    const ownerId = req.user._id; // ✅ Logged-in user

    if (!isValidObjectId(ownerId)) {
        throw new ApiError(400, "Invalid user ID");
    }

    const followedUsers = await Followers.find({ follower: ownerId }).populate("owner", "username email");

    if (followedUsers.length === 0) { // ✅ Simplified check
        return res.status(404).json(new ApiResponse(404, {}, "No users followed yet"));
    }

    return res.status(200).json(new ApiResponse(200, { followedUsers }, "Users followed retrieved successfully"));
});

export { toggleFollowing, getFollowers, getFollowing };
