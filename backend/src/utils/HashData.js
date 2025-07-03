import crypto from "crypto";

class Hasher {
    salt = crypto.randomBytes(16).toString("hex");

    hashing (password){
        return crypto.pbkdf2Sync(password, this.salt, 1000, 64, `sha512`).toString(`hex`);
    }
}

export default new Hasher();