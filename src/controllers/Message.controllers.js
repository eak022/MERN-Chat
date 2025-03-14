import Message from "../models/Message.js";
import User from "../models//User.js";
import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId, io } from "../lib/socket.js";

export const getUserForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");
    res.status(200).json(filteredUsers);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server Error while getting user info" });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { id: receiverId } = req.params;
    if (!id) {
      res.status(400).json("receiverId is required");
      const senderID = req.user._id;
      if (image) {
        const uploadResponse = await cloudinary.uploader.upload(image);
        imageURL = uploadResponse.secure_url;
      }

      const { text, image } = req.body;
      const newMessage = await newMessage({
        senderID,
        receiverId,
        text,
        image: imageURL,
      });
      await newMessage.save();
      const receiverSocketId = getReceiverSocketId(receiverId);
      if (receiverSocketId) {
        io.to(receiverSocketId).emit("newMessage", newMessage);
      }
      res.status(200).jon(newMessage);
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server Error while sending message" });
  }
};

export const getMessage = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const myId = req.user._id;
    const message = await Message.find({
      $or: [
        {
          senderID: myId,
          receiverId: userToChatId,
        },
        {
          senderID: userToChatId,
          receiverId: myId,
        },
      ],
    });
    res.status(200).jon(getMessage);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server Error while sending message" });
  }
};
