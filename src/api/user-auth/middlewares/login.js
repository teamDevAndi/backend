"use strict";

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
/**
 * `login` middleware
 */

module.exports = {
  // Add your own logic here.
  async login(ctx) {
    try {
      const { email, password } = ctx.request.body;

      if (!email || !password) {
        return ctx.badRequest("Correo y contraseña son requeridos");
      }

      const users = await strapi.entityService.findMany(
        "plugin::users-permissions.user",
        {
          filters: { email },
        }
      );

      const user = users.length > 0 ? users[0] : null;

      if (!user) {
        return ctx.unauthorized("Usuario no encontrado");
      }
      
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return ctx.unauthorized("Contraseña incorrecta");
      }

      const secret = strapi.config.get("plugin.users-permissions.jwt.secret");
      
      const payload = {
        id: user.id,
        email: user.email,
      };

      const token = jwt.sign(
        payload,
        secret,
        {
          algorithm: "HS256",
        }
      );

      return ctx.send({ token, user });
    } catch (error) {
      console.log("Error al iniciar sesión:", error.message);
      return ctx.badRequest("No se pudo iniciar sesión");
    }
  },
};
