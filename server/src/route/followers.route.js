import { Router } from "express";
import {
    getFollowers,
    getFollowing,   
    toggleFollowing
} from "../controller/followers.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js"; // Ensure this is correctly imported

const router = Router();

// Apply JWT verification middleware
router.use(verifyJWT);

router
    .route("/followers/:userId")
    .get(getFollowers);

router
    .route("/following/:userId")
    .get(getFollowing);

router
    .route("/toggle-follow")
    .post(toggleFollowing);

export default router;
