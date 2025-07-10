import crypto from "crypto";

class Hasher {
    salt = crypto.randomBytes(16).toString("hex");

    getSalt(){
        return this.salt;
    }

    hashing (password, salt){
        return crypto.pbkdf2Sync(password, salt ? salt : this.salt, 1000, 64, `sha512`).toString(`hex`);
    }
}

export default new Hasher();