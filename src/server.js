const mongoose = require('mongoose');
const app = require('./app');

const DB = process.env.MONGO_DATABASE_URL.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

const connect = async () => {
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
};

mongoose.connection.on('disconnected', () => {
  console.log('mongoDB disconnected!');
});

const port = process.env.PORT || 8800;

const server = app.listen(port, () => {
  connect();
  console.log(`Connected to backend server and running on port ${port}`);
});

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
