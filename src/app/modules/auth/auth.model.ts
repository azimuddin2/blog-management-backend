import { model, Schema } from 'mongoose';
import { TRegisterUser } from './auth.interface';
import bcrypt from 'bcrypt';
import config from '../../config';

const registerUserSchema = new Schema<TRegisterUser>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      minlength: [3, 'The length of name can be minimum 3 characters'],
      maxlength: [20, 'The length of name can be maximum 20 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      unique: true,
      lowercase: true,
      validate: {
        validator: function (v) {
          return /^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/.test(v);
        },
        message: 'Please enter a valid email',
      },
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      trim: true,
      minlength: [6, 'Password can be minimum 6 characters'],
      maxlength: [20, 'Password can not be more than 20 characters'],
    },
    role: {
      type: String,
      enum: {
        values: ['admin', 'user'],
        message: '{VALUE} is not valid',
      },
      default: 'user',
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

registerUserSchema.pre('save', async function (next) {
  const user = this;

  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

// set '' after saving password
registerUserSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

export const Register = model<TRegisterUser>('Register', registerUserSchema);
