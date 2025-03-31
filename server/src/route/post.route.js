import { Router} from "express";
import { 
    createPost,
    getPostbyId,
    getAllPosts,
    updatePost,
    deletePost } from "../controller/post.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/multer.middleware.js";

const router=Router();
console.log("post route");
router.route("/createPost")
.post(verifyJWT,upload.single("MediaFile") ,createPost);
router.route("/getPost/:postId")
.get(verifyJWT,getPostbyId);
router.route("/getAllPosts")
.get(verifyJWT,getAllPosts);
router.route("/updatePost/:postId")
.put(verifyJWT,updatePost);
router.route("/deletePost/:postId")
.delete(verifyJWT,deletePost);
export default router;