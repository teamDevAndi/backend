'use strict';

const admin = require('../../../config/firebase');
const sendVerificationCode = require('../middlewares/sendVerificationCode');
const register = require('../middlewares/register');
const sendResetCode = require('../middlewares/sendResetCode');
const verifyVerificationCode = require('../middlewares/verifyVerificationCode');
const verifyResetCode = require('../middlewares/verifyResetCode');
const resetPassword = require('../middlewares/resetPassword');
const login = require('../middlewares/login');
const registerSurvey = require('../middlewares/survey');

module.exports = {
    ...register,
    ...sendVerificationCode,
    ...sendResetCode,
    ...verifyVerificationCode,
    ...verifyResetCode,
    ...resetPassword,
    ...login,
    ...registerSurvey,
};