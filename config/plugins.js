module.exports = ({ env }) => ({
  email: {
    config: {
      provider: "nodemailer",
      providerOptions: {
        host: "smtp.gmail.com", // Servidor SMTP de Gmail
        port: 587, // Puerto SMTP de Gmail
        secure: false, // Cambia a true si usas SSL (puerto 465)
        auth: {
          user: env("SMTP_USER"), // Tu correo de Gmail
          pass: env("SMTP_PASS"), // Tu contraseña de Gmail o app password
        },
      },
      settings: {
        defaultFrom: env("SMTP_USER"), // El correo desde el que se envían los emails
        defaultReplyTo: env("SMTP_USER"), // Correo para respuestas
      },
    },
  },
  upload: {
    config: {
      provider: "cloudinary",
      providerOptions: {
        cloud_name: env("CLOUDINARY_NAME"),
        api_key: env("CLOUDINARY_KEY"),
        api_secret: env("CLOUDINARY_SECRET"),
      },
      actionOptions: {
        upload: {},
        uploadStream: {},
        delete: {},
      },
    },
  },
  "users-permissions": {
    config: {
      jwt: {
        secret: env("JWT_SECRET"),
        expiresIn: "7d",
        algorithm: env("JWT_ALGORITHM"),
      }
    }
  }
});
