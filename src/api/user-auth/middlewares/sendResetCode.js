module.exports = {
    async sendResetCode(ctx) {
    const { email } = ctx.request.body;
    
        if (!email) {
          return ctx.badRequest('El correo electrónico es requerido');
        }

        try {
        // Verificar si el usuario existe en la base de datos
        const user = await strapi.entityService.findMany('plugin::users-permissions.user', {
            filters: { email },
            limit: 1,
        });

        if (!user.length) {
            return ctx.badRequest('El correo no está registrado');
        }

        const registeredUser = user[0];

        // Generar un código aleatorio de 5 dígitos
        const resetCode = Math.floor(10000 + Math.random() * 90000).toString();

        // Crear un token con el código y la fecha de expiración
        const resetData = {
            code: resetCode,
            expiresAt: new Date(Date.now() + 10 * 60 * 1000), // Expira en 10 minutos
        };
    
        // Actualizar el usuario con el token
        await strapi.entityService.update('plugin::users-permissions.user', registeredUser.id, {
            data: {
            resetPasswordToken: JSON.stringify(resetData), // Guardar como JSON
            },
        });
    
        await strapi.plugins['email'].services.email.send({
        to: email,
        subject: 'Código de Restablecimiento de Contraseña',
        text: `Tu código de restablecimiento de contraseña es: ${resetCode}`,
        html: `<p>Tu código de restablecimiento es: <strong>${resetCode}</strong></p>`,
        });
    
          return ctx.send({ message: 'Código de restablecimiento fue enviado al correo' });
        } catch (error) {
          console.error('Error al enviar el código de verificación:', error.message);
          return ctx.badRequest('No se pudo enviar el código de verificación');
        }
    }
}