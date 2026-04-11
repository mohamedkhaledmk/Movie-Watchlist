import { prisma } from "../config/db.js";
import bcrypt from "bcryptjs";
const register = async (req, res) => {
  const { name, email, password } = req.body;

  console.log(0);
  const userExists = await prisma.user.findUnique({
    where: { email: email },
  });
  console.log(userExists);
  console.log(0.5);

  if (userExists)
    return res
      .status(400)
      .json({ error: "There is already user registered with this email!" });
  console.log(1);
  const salt = await bcrypt.genSalt(12);
  const hashedPassword = await bcrypt.hash(password, salt);
  console.log(2);

  const user = await prisma.user.create({
    data: { name, email, password: hashedPassword },
  });
  console.log(3);

  return res
    .status(201)
    .json({ status: "success", data: { user: { id: user.id, name, email } } });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({ where: { email: email } });

  if (!user)
    return res
      .status(404)
      .json({ error: "There is no user registered with this email!" });

  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect)
    return res.status(400).json({ error: "Invalid password!" });

  return res.status(200).json({
    status: "success",
    data: { user: { id: user.id, name: user.name, email } },
  });
};

export { register, login };
