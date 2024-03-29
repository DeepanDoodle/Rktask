import express from 'express';
import userRoutes from './routes/userRoutes.js';
import * as dotenv from 'dotenv';
import { sequelize } from './config/config.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/users', userRoutes);

// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });

sequelize.sync()
  .then(() => {
    // Start the server after models are synchronized
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch(error => {
    console.error('Unable to connect to the database:', error);
  });