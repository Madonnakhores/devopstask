import express from 'express';
import {
  createUser,
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from './users.controller.js';
import { authorize } from '../middlewares/users.middleware.js';
import { validate } from './users.model.js';
import { StatusCodes } from 'http-status-codes';
const router = express.Router();

router.get('/', authorize, getUsers);
router.post(
  '/',
  (req, res, next) => {
    const { error } = validate(req.body);
    if (error) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: error.message });
    }
    next();
  },
  createUser
);
router.get('/:id', getUser);
router.put('/:id', updateUser);
router.patch('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;
