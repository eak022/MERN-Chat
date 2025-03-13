import jwt from "jsonwebtoken";
import "dotenv/config";

const JWT_SECRET = process.env.SECRET;
const NODE_MODE = process.env.NODE_MODE;

// export แบบนี้ export ได้หลายตัว
export const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, JWT_SECRET, {
    expiresIn: "1d",
  });

  res.cookie("jwt", token, {
    // maxAge is MS
    maxAge: 24 * 60 * 60 * 1000,
    // XSS attack protection
    httpOnly: true,
    // CSRF
    sameSite: "strict",
    // https ?
    secure: NODE_MODE !== "development",
  });
};
