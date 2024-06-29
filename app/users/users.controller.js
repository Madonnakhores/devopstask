import statusCodes from 'http-status-codes';
import {
  create,
  find,
  findOne,
  findOneAndDelete,
  findOneAndUpdate,
} from './users.repository.js';
export const getUsers = async (req, res) => {
  const users = await find();

  res.status(statusCodes.OK).json({ users });
};

export const createUser = async (req, res) => {
  const user = await create(req.body);
  res.status(statusCodes.CREATED).json({ user });
};

export const getUser = async (req, res) => {
  const { id } = req.params;
  const user = await findOne(id);

  res.status(statusCodes.OK).json({ user });
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const updatedUserData = await findOneAndUpdate(id, req.body);
  res.status(statusCodes.OK).json({ updatedUserData });
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  const deletedUser = await findOneAndDelete(id);
  res.status(statusCodes.OK).json({ deletedUser });
};
