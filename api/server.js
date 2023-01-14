import mongoose from 'mongoose';
import app from './app.js';

const DB = process.env.MONGO_DATABASE_URL.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

const connect = async () => {
  try {
    await mongoose.connect(
      DB
      // ,{
      //   useNewUrlParser: true,
      //   useCreateIndex: true,
      //   useFindAndModify: false,
      //   useUnifiedTopology: true,
      // }
    );
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
