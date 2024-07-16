import jwt from "jsonwebtoken";
interface UserPayload {
  email: string;
}

const generateToken = (user: UserPayload): string => {
  const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET!, {
    expiresIn: "1h",
  });
  return token;
};

export default generateToken;
