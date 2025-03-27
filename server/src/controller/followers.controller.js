import mongoose,{ isValidObjectId } from "mongoose";
import { Followers } from "../model/follower.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";


 const toggleFollowing=asyncHandler(async(req,res)=>{
    const {FollowerId} = req.params
    const {ownerId} = req.user._id
    if(!isValidObjectId(ownerId)){
        throw new ApiError(400,"Invalid user id")
    }
    const followingCheck = await Followers.findOne({
        owner: userId,
        follower: req.user?._id,
    });
    if (followingCheck) {
        await Followers.findByIdAndDelete(followingCheck._id);
        return res
          .status(200)
          .json(new ApiResponse(200, {}, "Following Removed Successfully"));
    }

 });
 const getFollowers=asyncHandler(async(req,res)=>{
    const {ownerId} = req.params
    if(!isValidObjectId(ownerId)){
        throw new ApiError(400,"Invalid user id")
    }
    const followers = await Followers.find({owner:ownerId}).populate("follower", "username email")
    return res
    .status(200)
    .json(new ApiResponse(200,{followers},"Followers retrieved successfully"));
 });
 const getFollowing=asyncHandler(async(req,res)=>{
    const {FollowerId}=req.user._id
    if(!isValidObjectId(FollowerId)){
        throw new ApiError(400,"Invalid user id")
    }
    const followedUsers = await Followers.find({
        follower:FollowerId,
    }).populate("owner", "username email");
    if(!followedUsers || followedUsers.length<1){
        return res
        .status(404)
        .json(new ApiResponse(404,{},"No users followed yet"));
    }
    return res
    .status(200)
    .json(new ApiResponse(200,{followedUsers},"Users followed retrieved successfully"));
    });
    export {toggleFollowing,getFollowers,getFollowing};
