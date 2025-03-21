"use strict";

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

/**
 * user-auth service
 */

module.exports = {
  async generateToken(user) {
    const secret = strapi.config.get("plugin::users-permissions.jwt.secret");
    const algorithm = strapi.config.get(
      "plugin::users-permissions.jwt.algorithm"
    );

    const payload = {
      id: user.id,
      email: user.email,
    };

    const token = jwt.sign(payload, secret, {
      algorithm: algorithm,
      expiresIn: "7d",
    });
    return token;
  },
  async validatePassword(password, hash) {
    return bcrypt.compare(password, hash);
  },
  async verifyToken(token) {
    const secret = strapi.config.get("plugin::users-permissions.jwt.secret");
    const algorithm = strapi.config.get(
      "plugin::users-permissions.jwt.algorithm"
    );

    const payload = jwt.verify(token, secret, { algorithms: [algorithm] });
    return payload;
  },
};
