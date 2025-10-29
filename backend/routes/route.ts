import express, { Router } from 'express';
import { createUserData, login } from '../controllers/usercontrollers';
import {
  createBlogData,
  getBlogData,
  delBlogData,
  getSingleData,
  updateBlogData,
} from '../controllers/blogcontrollers';
import { verifyToken } from '../middleware/verify';
const router: Router = express.Router();

router.post('/createUserData', createUserData);
router.post('/login', login);

router.post('/createBlogData', verifyToken, createBlogData);

router.get(['/getBlogData', '/getBlogData/:keyword'], getBlogData);
router.get('/getSingleData/:id', verifyToken, getSingleData);

router.delete('/delBlogData/:id', verifyToken, delBlogData);

router.put('/updateBlogData/:id', verifyToken, updateBlogData);

export default router;
