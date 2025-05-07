import express from 'express';
import { signUp, signIn } from '../controllers/auth.controller.js';
import { checkDuplicateUsernameOrEmail, checkRolesExisted } from '../middlewares/verifySignUp.js';

const router = express.Router();

router.post('/signup', [checkDuplicateUsernameOrEmail, checkRolesExisted], signUp);
router.post('/signin', signIn);

export default router;

