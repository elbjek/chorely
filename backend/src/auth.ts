import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import crypto from "crypto";

const SECRET_KEY =
  process.env.JWT_SECRET || "hD7A6IlOqAn0UF6WuXRQ+ccbbx0d3YKmvsg7d1WeX+o=";

const ENCRYPTION_KEY =
  process.env.ENCRYPTION_KEY || "c6e5ed33ec90593f105c4e84154c50e0";

const IV = "rGtIn5UB1xG03efy";
const _method = "AES-256-CBC";

let _iv = Buffer.alloc(16);
_iv = Buffer.concat([Buffer.from(IV)], _iv.length);

let _key = Buffer.alloc(32);
_key = Buffer.concat([Buffer.from(ENCRYPTION_KEY)], _key.length);

export const generateToken = (user: {
  id: string;
  email: string;
  name?: string;
}) => {
  return jwt.sign(user, SECRET_KEY, { expiresIn: "1h" });
};

export const verifyToken = (token: string) => {
  try {
    const decoded = jwt.verify(token.split(" ")[1], SECRET_KEY);
    return decoded;
  } catch (error) {
    throw new Error("Invalid token");
  }
};

export const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, 10);
};

export const comparePassword = async (password: string, hash: string) => {
  return await bcrypt.compare(password, hash);
};

/**
 * Encrypts a given value, returning a base64 string of the encrypted value.
 *
 * @param val the value to encrypt
 * @returns an AES-256-CBC encrypted value
 */
export const encrypt = (val: string): string => {
  const cipher = crypto.createCipheriv(_method, _key, _iv);
  const encrypted =
    cipher.update(val, "utf8", "base64") + cipher.final("base64");
  return Buffer.from(encrypted + "::" + _iv.toString()).toString("base64");
};

/**
 * Given a base64 string of an encrypted value, decrypts it back to a string.
 *
 * @param val the value to decrypt
 * @returns the decrypted value
 */
export const decrypt = (val: string): string => {
  try {
    const decoded = Buffer.from(val, "base64").toString().split("::")[0] ?? "";
    if (decoded === "") {
      return decoded;
    }

    const decipher = crypto.createDecipheriv(_method, _key, _iv);
    return Buffer.concat([
      decipher.update(decoded, "base64"),
      decipher.final(),
    ]).toString();
  } catch {
    return "";
  }
};
