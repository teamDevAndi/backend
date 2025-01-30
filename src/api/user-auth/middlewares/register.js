const admin = require('../../../config/firebase');

module.exports = {
    async register(ctx) {
        const { email, password, userName } = ctx.request.body;

        if (!email || !password || !userName) {
            return ctx.badRequest('Email, contraseña y usuario son requeridos');
        }

        try {
            // Crear usuario en Firebase
            const userRecord = await admin.auth().createUser({
                username: userName,
                email,
                password,
                emailVerified: false, // Aún no está verificado
            });

            // Guardar el usuario en la base de datos de Strapi (opcional)
            const newUser = await strapi.entityService.create('plugin::users-permissions.user', {
                data: {
                    username: userName,
                    email,
                    provider: 'firebase',
                    firebase_uid: userRecord.uid,
                },
            });
            return ctx.send({ message: 'Usuario registrado exitosamente', user: newUser });
        } catch (error) {
            console.error('Error al registrar usuario:', error.message);
            return ctx.badRequest('No se pudo registrar al usuario');
        }
    }
}