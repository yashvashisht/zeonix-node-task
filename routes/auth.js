const authController = require('../controllers/auth');
const app = require('express');
const router = app.Router();
const schema = require('../middelware/validator');
const joi = require('joi');
const auth = require('../middelware/auth');

const usignupSchema = {
    first_name: joi.string().required(),
    last_name: joi.string().required(),
    email: joi.string().required(),
    password: joi.string().required(),
    role: joi.string().required(),
}
router.post('/signUp',schema.validator(usignupSchema),authController.signUp);


const verifyEmailSchema = {
    user_id: joi.string().required(),
};

router.post('/verifyEmail',schema.validator(verifyEmailSchema),authController.verifyEmail);

const forgotPasswordSchema = {
    email: joi.string().required(),
};

router.post('/forgotPassword',schema.validator(forgotPasswordSchema),authController.forgotPassword);

const resetPasswordSchema = {
    token:joi.string().required(),
    password:joi.string().required(),
}
router.post('/resetPassword',schema.validator(resetPasswordSchema),authController.resetPassword);


const loginSchema = {
    email:joi.string().required(),
    password:joi.string().required(),
}
router.post('/login',schema.validator(loginSchema),authController.logIn,auth.encode);


module.exports = router;