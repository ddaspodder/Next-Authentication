import "server-only";

import db from "./db";
import { hashPassword } from "./hash";

export async function createUser(email, password) {
  try {
    const hashedPassword = await hashPassword(password);
    const stmt = db.prepare(
      "INSERT INTO users (email, password) VALUES (?, ?)"
    );
    await stmt.run(email, hashedPassword);
    return null;
  } catch (err) {
    throw err;
  }
}

export async function getUserByEmail(email) {
  const stmt = db.prepare("SELECT * FROM users WHERE email = ?");
  return stmt.get(email);
}
