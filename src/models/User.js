import mongoose from "mongoose";
const { Schema, model } = mongoose;

const UserSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    fullName: { type: String, required: true },
    password: { type: String, required: true },
    profilePic: { type: String, default: "" }, // ไม่บังคับให้กรอก
    friend: [{ type: Schema.Types.ObjectId, ref: "User", required: true }],
    friendRequests: [
      { type: Schema.Types.ObjectId, ref: "User", required: true },
    ],
  },
  {
    timestamps: true,
  }
);

const UserModel = model("User", UserSchema);
export default UserModel;
