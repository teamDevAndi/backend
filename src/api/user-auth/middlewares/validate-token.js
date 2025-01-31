"use strict";

const { verifyToken } = require("../services/user-auth");

/**
 * `validateToken` middleware
 */

module.exports = (config, { strapi }) => {
  // Add your own logic here.
  return async (ctx, next) => {
    try {
      const token = ctx.request.header.authorization?.replace("Bearer ", "");

      if (!token) {
        return ctx.unauthorized("Token no encontrado");
      }

      const decodedToken = await verifyToken(token);
      const email =
        typeof decodedToken === "string" ? decodedToken : decodedToken.email;

      const users = await strapi.entityService.findMany(
        "plugin::users-permissions.user",
        {
          filters: { email },
        }
      );

      const user = users.length > 0 ? users[0] : null;

      if (!user) {
        return ctx.unauthorized("No estas autorizado");
      }

      ctx.state.user = user;

      return await next();
    } catch (error) {
      return ctx.unauthorized("Token inválido");
    }
  };
};
