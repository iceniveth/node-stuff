// https://itsgosho2.medium.com/how-to-transfer-http-only-cookies-with-express-back-end-and-the-fetch-api-2035f0ac48d9
// https://keeplearning.dev/nodejs-jwt-authentication-with-http-only-cookie-5d8a966ac059
import express, { response } from "express";
import { z } from "zod";
import camelcaseKeys from "camelcase-keys";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { environment } from "../environment.js";
import { sql } from "../db.js";

const { JWT_SECRET } = environment;

const userSchema = z.object({
  email: z.string().min(1).email(),
  password: z
    .string()
    .min(8, { message: "Should be at least 8 characters long" }),
});

const authRouter = express.Router();

authRouter.post("/sign-up", async (req, res) => {
  const result = await userSchema.safeParseAsync(req.body);

  if (!result.success) {
    return res.status(400).json(
      result.error.errors.map((err) => ({
        field: err.path.join("."),
        message: err.message,
      }))
    );
  }

  const { data } = result;
  const hashPassword = await bcrypt.hash(data.password, 10);

  try {
    const [createdUser] =
      await sql`INSERT INTO users (email, hash_password) VALUES (${data.email}, ${hashPassword}) RETURNING id, email, created_at, updated_at`;

    const token = generateToken(createdUser);

    return res
      .status(201)
      .cookie("token", token, { httpOnly: true })
      .send(camelcaseKeys(createdUser));
  } catch (e) {
    // JavaScript will actually create an Error object with two properties: name and message.
    if (
      e.message ===
      'duplicate key value violates unique constraint "users_email_key"'
    ) {
      return res.status(409).json({
        error: "email is not available or is already in use",
      });
    }

    throw e;
  }
});

authRouter.post("/sign-in", async (req, res) => {
  const result = await userSchema.safeParseAsync(req.body);

  if (!result.success) {
    return res.status(400).json(
      result.error.errors.map((err) => ({
        field: err.path.join("."),
        message: err.message,
      }))
    );
  }
  const { email, password } = result.data;

  let [foundUser] = await sql`SELECT * FROM users WHERE email = ${email}`;

  if (!foundUser) {
    return res.status(404).json({ error: "Email doesn't exists" });
  }
  foundUser = camelcaseKeys(foundUser);

  const isPasswordMatch = await bcrypt.compare(
    password,
    foundUser.hashPassword
  );

  if (!isPasswordMatch) {
    return res.status(401).json({ error: "Credentials Doesn't Match" });
  }

  const token = generateToken(foundUser);

  return res.status(200).cookie("token", token, { httpOnly: true }).json({
    id: foundUser.id,
    email: foundUser.email,
    createdAt: foundUser.createdAt,
    updatedAt: foundUser.updatedAt,
  });
});

function generateToken(user, expiresIn = "7d") {
  const payload = {
    email: user.email,
  };
  return jwt.sign(payload, JWT_SECRET, { expiresIn });
}

export default authRouter;
