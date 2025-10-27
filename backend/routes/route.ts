import express, { Router } from 'express';
import { createUserData, login } from '../controllers/usercontrollers';
import {
  createBlogData,
  getBlogData,
  delBlogData,
  getSingleData,
  updateBlogData,
} from '../controllers/blogcontrollers';
const router: Router = express.Router();

router.post('/createUserData', createUserData);
router.post('/login', login);

router.post('/createBlogData', createBlogData);

router.get('/getBlogData', getBlogData);
router.get('/getSingleData/:id', getSingleData);

router.delete('/delBlogData/:id', delBlogData);

router.put('/updateBlogData/:id', updateBlogData);

export default router;
