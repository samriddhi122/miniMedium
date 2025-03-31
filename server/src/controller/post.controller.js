import { isValidObjectId } from "mongoose";
import {Post} from "../model/post.model.js";
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const createPost=asyncHandler(async(req,res)=>{
    const {title,content}=req.body;
    console.log("hello");
  
     const mediaLocalPath = req.file?.MediaFile?.[0]?.path || "";
     console.log("22");
     if (!mediaLocalPath || !content || !title) {
        throw new ApiError(400, "Atleast One feild is required ! ");
    }
    const media = mediaLocalPath ? await uploadOnCloudinary(mediaLocalPath) : "";
    if (mediaLocalPath && !media) {
        throw new ApiError(400, "Error while uploading  Media  ");
      }
      console.log(media);
    const post=new Post({
        title,
        content,
        image: media?.url || "",
        owner:req.user._id
    })
    await post.save();
    res.json(new ApiResponse(201,post));
})
const getPostbyId=asyncHandler(async(req,res)=>{
        const {postId}=req.params;
        console.log(postId);
        const post=await Post.findById(postId);
        if(!post){
            throw new ApiError(404,"Post not found");
        }
        res.json(new ApiResponse(200,post));
});
const  getAllPosts=asyncHandler(async(req,res)=>{
    const posts=await Post.find().sort({createdAt:-1});

    res.json(new ApiResponse(200,posts))
})


const updatePost=asyncHandler(async(req,res)=>{
    const {postId}=req.params;
    if(!isValidObjectId){
        throw new ApiError(400,"Invalid post id");
    }
    const updatePostData={
        title: req.body?.title || "",
        content: req.body?.content || "",
    }
    const post=await Post.findById(postId);
    if(!post){
        throw new ApiError(404,"Post not found");
    }
    if (JSON.stringify(post.owner) !== JSON.stringify(req.user._id)) {
        throw new ApiError(403,"You are not authorized to update this post");
    }
    const updatedPostDetails=await Post.findByIdAndUpdate(
        postId,
        updatePostData,
        {
            new:true,
        }
    );
    console.log(updatedPostDetails);
    return res.
    status(200)
    .json(new ApiResponse(200,updatedPostDetails));
})
const deletePost=asyncHandler(async(req,res)=>{
    const {postId}=req.params;
    if(!isValidObjectId){
        throw new ApiError(400,"Invalid post id");
    }
    const post=await Post.findById(postId);
    if(!post){
        throw new ApiError(404,"Post not found");
    }
    if(JSON.stringify(post.owner)!==JSON.stringify(req.user._id)){
        throw new ApiError(403,"You are not authorized to delete this post");
    }
    const deletedPost=await Post.findByIdAndDelete(postId);
    return res
    .status(200)
    .json(new ApiResponse(200,deletedPost));
}
)
export{
    createPost,
    getPostbyId,
    getAllPosts,
    updatePost,
    deletePost
}