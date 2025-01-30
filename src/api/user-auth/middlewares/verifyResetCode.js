const admin = require('../../../config/firebase');

module.exports = {
    async verifyResetCode(ctx) {
        const { email, code } = ctx.request.body;

        if (!email || !code) {
            return ctx.badRequest('Email y código son requeridos');
        }

        try {
            // Buscar al usuario en la base de datos
            const user = await strapi.entityService.findMany('plugin::users-permissions.user', {
                filters: { email },
                limit: 1,
            });

            if (!user.length) {
                return ctx.badRequest('El correo no está registrado');
            }

            const registeredUser = user[0];

            // Obtener el token de confirmación
            const resetPasswordToken = JSON.parse(registeredUser.resetPasswordToken || '{}');

            // Verificar si el código coincide y no ha expirado
            if (resetPasswordToken?.code !== code) {
                return ctx.badRequest('Código de verificación incorrecto');
            }

            if (new Date(resetPasswordToken.expiresAt) < new Date()) {
                return ctx.badRequest('El código de verificación ha expirado');
            }

            return ctx.send({ message: 'Codigo verificado exitosamente' });
        } catch (error) {
            console.error('Error al verificar el código:', error.message);
            return ctx.badRequest('No se pudo verificar el código');
        }
    }
}