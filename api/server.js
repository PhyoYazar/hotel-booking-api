import mongoose from 'mongoose';
import app from './app.js';

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DATABASE_URL);
    console.log('Connected to mongoDB');
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on('disconnected', () => {
  console.log('mongoDB disconnected!');
});

const port = process.env.PORT || 8800;
app.listen(port, () => {
  connect();
  console.log('Connected to backend');
});
