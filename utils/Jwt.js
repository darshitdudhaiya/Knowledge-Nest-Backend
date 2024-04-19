import jwt from "jsonwebtoken";

class Jwt {
  static generateToken(payload) {
    const token = jwt.sign(payload, "alskjdfsdalkfndglkndfl", {
      expiresIn: "1d",
    });
    return token;
  }

  static isTokenValid(token) {
    try {
      token = token.replace("Bearer ", "");

      let currentTime = Math.floor(Date.now() / 1000);
      let data = jwt.verify(token, "alskjdfsdalkfndglkndfl");
      return currentTime < data.exp;
    } catch (error) {
      return false;
    }
  }

  static getTokenData(token) {
    token = token.replace("Bearer ", "");

    let currentTime = Math.floor(Date.now() / 1000);
    return jwt.verify(token, "alskjdfsdalkfndglkndfl");
  }
}

export default Jwt;
