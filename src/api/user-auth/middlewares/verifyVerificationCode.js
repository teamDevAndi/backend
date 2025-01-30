const admin = require('../../../config/firebase');

module.exports = {
    async verifyVerificationCode(ctx) {
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

            // Verificar si el usuario ya está confirmado
            if (registeredUser.confirmed) {
                return ctx.badRequest('El usuario ya está confirmado');
            }

            // Obtener el token de confirmación
            const confirmationToken = JSON.parse(registeredUser.confirmationToken || '{}');

            // Verificar si el código coincide y no ha expirado
            if (confirmationToken?.code !== code) {
                return ctx.badRequest('Código de verificación incorrecto');
            }

            if (new Date(confirmationToken.expiresAt) < new Date()) {
                return ctx.badRequest('El código de verificación ha expirado');
            }

            // Marcar al usuario como confirmado
            await strapi.entityService.update('plugin::users-permissions.user', registeredUser.id, {
                data: {
                    confirmed: true,
                    confirmationToken: null, // Limpiar el token
                },
            });

            // Actualizar el estado de verificación en Firebase (opcional)
            await admin.auth().updateUser(registeredUser.firebase_uid, {
                emailVerified: true,
            });

            return ctx.send({ message: 'Usuario verificado exitosamente' });
        } catch (error) {
            console.error('Error al verificar el código:', error.message);
            return ctx.badRequest('No se pudo verificar el código');
        }
    }
}