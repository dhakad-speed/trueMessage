import mongoose, { Document, model, models } from "mongoose";

export interface UserInterface extends Document {
  name: string;
  email: string;
  verifyCode: string;
  verifyCodeExpiry: Date;
  password: string;
  isVerified: boolean;
  isAcceptingMessages: boolean | undefined;
  messages: Array<Message>;
}
export interface Message extends Document {
  content: string;
  createdAt: Date;
  from: string;
  to: string;
}

const MessageSchema = new mongoose.Schema<Message>({
  from: {
    type: String,
    required: [true, "from is required"],
  },
  to: {
    type: String,
    required: [true, "to is required"],
  },
  content: {
    type: String,
    required: [true, "message is required"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const UserSchema = new mongoose.Schema<UserInterface>(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    verifyCode: {
      type: String,
    },
    verifyCodeExpiry: {
      type: Date,
      default: () => Date.now(),
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isAcceptingMessages: {
      type: Boolean,
      default: false,
    },
    messages: [MessageSchema],
  },
  { timestamps: true }
);

const UserModel: mongoose.Model<UserInterface> =
  mongoose.models.User || mongoose.model<UserInterface>("User", UserSchema);
export const MessageModel =
  models.Message || model<Message>("Message", MessageSchema);

export default UserModel;
