import express from 'express'
const router = express.Router()
import {authUser,registerUser,getUserProfile,updateUserProfile, } from '../controllers/userController.js'
import { protect } from '../middleware/authMiddleware.js' 

router.route('/').post(registerUser) 
router.post('/login', authUser)
//protect middleware runs first whenever we hit this route (/profile) //
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile)

export default router