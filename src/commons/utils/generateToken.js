const crypto = require("crypto");

const getRanSalt = () => crypto.randomBytes(64).toString("hex");
const createHash = (data = "") =>
  crypto
    .createHash("sha256")
    .update("email" + getRanSalt())
    .digest("hex");

const getRanBytes = (byte = 8) => crypto.randomBytes(byte).toString("hex");
module.exports = { getRanSalt, createHash, getRanBytes };
