"use strict";

module.exports = {
  async emailExists(ctx) {
    try {
      const { email } = ctx.request.body;

      if (!email) {
        return ctx.badRequest("El parámetro 'email' es requerido.");
      }

      // Buscar el usuario con el email dado
      const user = await strapi.db.query("plugin::users-permissions.user").findOne({
        where: { email },
      });

      return ctx.send({
        success: true,
        exists: !!user,
        message: user ? "El correo ya está registrado." : "El correo no está registrado.",
      });
    } catch (error) {
      console.error("Error en al verificar existencia del email:", error);
      return ctx.badRequest("No se pudo verificar la existencia del correo.");
    }
  },
};
