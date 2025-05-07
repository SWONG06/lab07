import express from 'express';
import {allaccess, userBoard, adminBoard, moderatorBoard} from '../controllers/user.controller.js';
import { verifyToken, isAdmin, isModerator, isModeratorOrAdmin } from '../middlewares/authJwt.js';

const router = express.Router();

router.get('/all', allaccess);
router.get('/user', [verifyToken], userBoard);
router.get('/mod', [verifyToken, isModerator], moderatorBoard);
router.get('/admin', [verifyToken, isAdmin], adminBoard);

export default router;

