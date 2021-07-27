import {Router} from 'express'
import {
  signIn,
  signUp,
  
} from '../controllers/user.controller'

const router = Router();

router.post('/user', signUp);
router.post('/authorization', signIn);



export default router;