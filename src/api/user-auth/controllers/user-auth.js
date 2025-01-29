'use strict';
const admin = require('../../../config/firebase');

module.exports = {
    async register(ctx) {
        const { email, password } = ctx.request.body;

        if (!email || !password) {
            return ctx.badRequest('Email y contraseña son requeridos');
        }

        try {
            // Crear usuario en Firebase
            const userRecord = await admin.auth().createUser({
                email,
                password,
                emailVerified: false, // Aún no está verificado
            });

            // Guardar el usuario en la base de datos de Strapi (opcional)
            const newUser = await strapi.entityService.create('plugin::users-permissions.user', {
                data: {
                    username: email,
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
    },
    async sendVerificationCode(ctx) {
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

        // Verificar si el usuario ya está confirmado
        if (registeredUser.confirmed) {
            return ctx.badRequest('El usuario ya está confirmado');
        }

        // Generar un código aleatorio de 5 dígitos
        const verificationCode = Math.floor(10000 + Math.random() * 90000).toString();

        // Crear un token con el código y la fecha de expiración
        const confirmationData = {
            code: verificationCode,
            expiresAt: new Date(Date.now() + 10 * 60 * 1000), // Expira en 10 minutos
        };
    
        // Actualizar el usuario con el token
        await strapi.entityService.update('plugin::users-permissions.user', registeredUser.id, {
            data: {
            confirmationToken: JSON.stringify(confirmationData), // Guardar como JSON
            },
        });
    
        await strapi.plugins['email'].services.email.send({
        to: email,
        subject: 'Código de verificación',
        text: `Tu código de verificación es: ${verificationCode}`,
        html: `<p>Tu código de verificación es: <strong>${verificationCode}</strong></p>`,
        });
    
          return ctx.send({ message: 'Código de verificación enviado al correo' });
        } catch (error) {
          console.error('Error al enviar el código de verificación:', error.message);
          return ctx.badRequest('No se pudo enviar el código de verificación');
        }
      },
};