import crypto from "crypto";

export default function generateRandomHash(length = 8) {
  const allowedChars =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const randomData = crypto.randomBytes(length);
  let hash = "";

  for (let i = 0; i < randomData.length; i++) {
    const byte = randomData[i] % allowedChars.length;
    hash += allowedChars.charAt(byte);
  }

  return hash;
}
