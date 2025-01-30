"use strict";

/**
 * `resetPassword` middleware
 */

module.exports = {
  async resetPassword(ctx) {
    try {
      const { email, resetCode, newPassword } = ctx.request.body;

      if (!email || !resetCode || !newPassword) {
        return ctx.badRequest(
          "Correo, código de restablecimiento y nueva contraseña son requeridos"
        );
      }

      const users = await strapi.entityService.findMany(
        "plugin::users-permissions.user",
        {
          filters: { email },
        }
      );

      const user = users.length > 0 ? users[0] : null;

      console.log(user);

      const resetCodeJson = JSON.parse(user.resetPasswordToken);

      if (!user || resetCodeJson.code !== resetCode) {
        return ctx.badRequest(
          "Código de verificación incorrecto o usuario no encontrado."
        );
      }

      strapi.entityService.update("plugin::users-permissions.user", user.id, {
        data: {
          password: newPassword,
          resetCode: null,
        },
      });

      return ctx.send({ message: "Contraseña restablecida exitosamente" });
    } catch (error) {
      console.log(error);
      return ctx.badRequest("No se pudo restablecer la contraseña");
    }
  },
  async requestResetCode(ctx) {
    try {
      const { email } = ctx.request.body;
      if (!email) {
        return ctx.badRequest("El correo electrónico es requerido");
      }

      const users = await strapi.entityService.findMany(
        "plugin::users-permissions.user",
        {
          filters: { email },
        }
      );

      const user = users.length > 0 ? users[0] : null;

      if (!user) {
        return ctx.badRequest("Usuario no encontrado");
      }

      const resetCode = Math.floor(
        10000 + Math.random() * 90000
      ).toString();

      const verificationData = {
        code: resetCode,
        expiresAt: new Date(Date.now() + 10 * 60 * 1000),
      };

      strapi.entityService.update("plugin::users-permissions.user", user.id, {
        data: {
          resetPasswordToken: JSON.stringify(verificationData),
        },
      });

      console.log(user);

      return ctx.send({
        message: "Código de restablecimiento solicitado",
        resetCode,
      });
    } catch (error) {
      console.log(error);
      return ctx.badRequest(
        "No se pudo solicitar el código de restablecimiento"
      );
    }
  },
};
