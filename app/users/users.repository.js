import * as fs from 'fs/promises';
import path from 'path';
import { cwd } from 'process';
import { v4 as uuid } from 'uuid';
const usersDataPath = path.join(cwd(), 'app', 'database', 'users.json');

export const create = async (userBody) => {
  const users = await readUsers();
  userBody.id = uuid();
  users.push(userBody);
  await fs.writeFile(usersDataPath, JSON.stringify(users));

  return userBody;
};

export const find = async () => {
  const users = await readUsers();
  return users;
};

export const findOne = async (id) => {
  const users = await readUsers();
  const userFound = users.find((user) => user.id == id);
  return userFound;
};

export const findOneAndUpdate = async (id, updateData) => {
  const users = await readUsers();

  const userFound = users.find((user) => user.id == id);

  const newUser = { ...userFound, ...updateData };

  const newUsers = users.map((user) => {
    if (user.id == id) {
      return newUser;
    }
    return user;
  });

  await fs.writeFile(usersDataPath, JSON.stringify(newUsers));

  return newUser;
};

export const findOneAndDelete = async (id) => {
  const users = await readUsers();

  const userIndex = users.findIndex((user) => user.id == id);

  const deletedUser = users.splice(userIndex, 1);

  await fs.writeFile(usersDataPath, JSON.stringify(users));

  return deletedUser;
};

const readUsers = async () => {
  const usersData = await fs.readFile(usersDataPath, { encoding: 'utf8' });
  const parsedData = JSON.parse(usersData);
  return parsedData;
};
