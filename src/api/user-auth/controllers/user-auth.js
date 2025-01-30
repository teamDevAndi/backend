'use strict';
const admin = require('../../../config/firebase');
const sendVerificationCode = require('../middlewares/sendVerificationCode');
const register = require('../middlewares/register');
const sendResetCode = require('../middlewares/sendResetCode');
const verifyVerificationCode = require('../middlewares/verifyVerificationCode');
const verifyResetCode = require('../middlewares/verifyResetCode');

module.exports = {
    ...register,
    ...sendVerificationCode,
    ...sendResetCode,
    ...verifyVerificationCode,
    ...verifyResetCode
};