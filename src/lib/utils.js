import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";

const secret = process.env.SECRET;
console.log(secret);
if (!secret) {
  console.error("JWT Secret is missing");
  process.exit(1);
}

// ฟังก์ชันสำหรับสร้าง Token
export const generateToken = (userId, res) => {
  try {
    const token = jwt.sign({ userId }, secret, {
      expiresIn: "1d", // Token หมดอายุใน 1 วัน
    });

    // ส่ง token กลับไปใน response
    res.cookie("token", token, {
      httpOnly: true, // ป้องกันการเข้าถึง token ด้วย JavaScript ฝั่ง client
      secure: process.env.NODE_ENV === "production", // ใช้ secure เฉพาะใน production
      maxAge: 24 * 60 * 60 * 1000, // อายุ cookie 1 วัน
    });

    return token;
  } catch (error) {
    console.error("Error generating token:", error);
    res.status(500).json({ message: "Error generating token" });
  }
};

// ฟังก์ชันสำหรับตรวจสอบความถูกต้องของ Token
export const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, secret);
    return decoded;
  } catch (error) {
    console.error("Token verification failed:", error);
    return null;
  }
};

// ฟังก์ชันสำหรับล้าง Token (Logout)
export const clearToken = (res) => {
  res.cookie("token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 0, // ลบ cookie ทันที
  });
};
