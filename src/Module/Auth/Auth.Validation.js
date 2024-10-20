import joi from 'joi';


export const RegisterSchema = joi.object({
    Name: joi.string().alphanum().min(3).max(30).required(),
    Password: joi.string().pattern(/^[A-Z][a-z0-9]{3,20}$/),
    Email: joi.string().email().required(),
    Address:joi.string().min(10).required(),
    PhoneNumber:joi.string().pattern(/^[0-9]{10,15}$/).required()
});


export const LoginSchema = joi.object({
    Email: joi.string().email().required(),
    Password: joi.string().pattern(/^[A-Z][a-z0-9]{3,20}$/),
});

export const SendCodeSchema = joi.object({
    Email: joi.string().email().required(),
});

export const ForgetPasswordSchema = joi.object({
    Password: joi.string().pattern(/^[A-Z][a-z0-9]{3,20}$/),
    Email: joi.string().email().required(),
    code:joi.string().length(4),
});