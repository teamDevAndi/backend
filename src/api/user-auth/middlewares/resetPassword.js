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

      const resetCodeJson = JSON.parse(user.resetPasswordToken);

      if (!user || resetCodeJson.code !== resetCode) {
        return ctx.badRequest(
          "Código de verificación incorrecto o usuario no encontrado."
        );
      }

      strapi.entityService.update("plugin::users-permissions.user", user.id, {
        data: {
          password: newPassword,
          resetPasswordToken: null,
        },
      });

      return ctx.send({ message: "Contraseña restablecida exitosamente" });
    } catch (error) {
      return ctx.badRequest("No se pudo restablecer la contraseña");
    }
  },
};
