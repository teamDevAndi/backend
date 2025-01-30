module.exports = {
  routes: [
    {
      method: 'POST',
      path: '/auth/register',
      handler: 'user-auth.register',
      config: {
          policies: [],
          middlewares: [],
      },
    },
    {
      method: 'POST',
      path: '/auth/send-verification-code',
      handler: 'user-auth.sendVerificationCode',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'POST',
      path: '/auth/send-reset-code',
      handler: 'user-auth.sendResetCode',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'POST',
      path: '/auth/verification-code',
      handler: 'user-auth.verifyVerificationCode',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
