import {Router} from 'express';

import {
  signIn,
  signUp,
  update,
  deleteUser,
  userID
} from '../controllers/user.controller'

const router = Router();

router.post('/user', signUp);
router.post('/authorization', signIn);

router.put('/users/:id', update);

router.delete('/users/:id', deleteUser );

router.get('/users/:id', userID );

export default router;