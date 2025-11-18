import { randomBytes, scrypt as _scrypt, timingSafeEqual } from "crypto";
import { promisify } from "util";
const scrypt = promisify(_scrypt);

export async function hashPassword(password) {
  const salt = randomBytes(16).toString("hex");
  const derivedBuf = await scrypt(password, salt, 64); // Buffer
  const stored = `${salt}:${derivedBuf.toString("hex")}`;
  return stored;
}

export async function verifyPassword(stored, suppliedPassword) {
  const [saltFromDb, keyFromDb] = stored.split(":");
  const derivedBuf = await scrypt(suppliedPassword, saltFromDb, 64); // Buffer
  const keyBuf = Buffer.from(keyFromDb, "hex");
  if (derivedBuf.length !== keyBuf.length) return false;
  return timingSafeEqual(derivedBuf, keyBuf);
}
