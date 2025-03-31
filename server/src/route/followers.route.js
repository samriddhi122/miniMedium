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
    .route("/followers/:ownerId")
    .get(getFollowers);

router
    .route("/following/:ownerId")
    .get(getFollowing);

    router
    .route("/toggle-follow/:userId") // ✅ Add `:userId` as a parameter
    .post(toggleFollowing);


export default router;
