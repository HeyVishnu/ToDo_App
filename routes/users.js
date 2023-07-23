import express from 'express'
import User from '../models/user.js';
import { getmyprofile, login, logout, register, } from '../controller/user.js';
import { isAuthenticated } from '../middleware/auth.js';


const router = express.Router();

router.post('/new' , register);
router.post('/login', login);
router.get("/myprofile",isAuthenticated, getmyprofile);
router.get("/logout", logout);


export default router;




