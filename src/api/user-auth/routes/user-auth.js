module.exports = {
  routes: [
    {
      method: 'POST',
      path: '/auth/register',
      handler: 'user-auth.register',
      config: {
        auth: false,
          middlewares: [],
      },
    },
    {
      method: 'POST',
      path: '/auth/send-verification-code',
      handler: 'user-auth.sendVerificationCode',
      config: {
        auth: false,
        middlewares: [],
      },
    },
    {
      method: 'POST',
      path: '/auth/send-reset-code',
      handler: 'user-auth.sendResetCode',
      config: {
        auth: false,
        middlewares: [],
      },
    },
    {
      method: 'POST',
      path: '/auth/verification-code-email',
      handler: 'user-auth.verifyVerificationCode',
      config: {
        auth: false,
        middlewares: [],
      },
    },
    {
      method: 'POST',
      path: '/auth/verification-code-reset',
      handler: 'user-auth.verifyResetCode',
      config: {
        auth: false,
        middlewares: [],
      },
    },
    {
      method: "POST",
      path: "/auth/reset-password",
      handler: "user-auth.resetPassword",
      config: {
        auth: false,
        policies: [],
      },
    },
    {
      method: "POST",
      path: "/auth/login",
      handler: "user-auth.login",
      config: {
        auth: false,
      },
    },
  ],
};
