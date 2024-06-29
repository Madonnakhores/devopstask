import express from 'express';
import usersRoutes from './app/users/users.route.js';
const PORT = 3000;
const app = express();

app.use(express.json({}));

app.get('/', (req, res) => {
  res.send('users api');
});

// Use the usersRoutes defined in users.route.js
app.use('/users', usersRoutes);

app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});