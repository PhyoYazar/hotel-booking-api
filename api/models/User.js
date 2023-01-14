import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'User must have a name'],
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'User must have a email'],
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    // createdAt: {
    //   type: Date,
    //   default: Date.now(),
    // },
  },
  { timestamps: true }
);

export default mongoose.model('User', UserSchema);
