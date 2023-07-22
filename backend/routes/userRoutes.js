import express from "express"
import { authUser, getUserProfile, logoutUser, registerUser, updateUserProfile } from "../controllers/userController.js";
import { portect } from "../middlewares/authMiddleware.js";
const router = express.Router()

router.post('/' , registerUser);
router.post('/auth' , authUser);
router.post('/logout' , logoutUser);
router.route('/profile').get( portect ,getUserProfile).put( portect,updateUserProfile);


export default router;