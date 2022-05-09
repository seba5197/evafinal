import Joi from "joi";
import { CreateUserDTO } from "../dto/userDTO";

export const loginSchema: Joi.ObjectSchema<CreateUserDTO> = Joi.object().keys({

email:  Joi.string().required(),
password: Joi.string().required(),
})

export const registerUserSchema: Joi.ObjectSchema<CreateUserDTO> = Joi.object().keys({
    firsName: Joi.string().required(),
    lastName: Joi.string().required(),
    email:  Joi.string().required(),
    password: Joi.string().required(),
    level: Joi.string().required(),
    })