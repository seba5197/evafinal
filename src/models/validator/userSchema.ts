import Joi from "joi";
import { CreateUserDTO, UpdateUserDTO } from "../dto/userDTO";

export const createUserSchema: Joi.ObjectSchema<CreateUserDTO> = Joi.object().keys({
firstName: Joi.string().required(),
lastName: Joi.string().required(),
email:  Joi.string().required(),
password: Joi.string().required(),
level: Joi.string()
})

export const updateUserSchema: Joi.ObjectSchema<UpdateUserDTO> = Joi.object().keys({
    firstName: Joi.string(),
    lastName: Joi.string(),
    email:  Joi.string(),
    password: Joi.string(),
    level: Joi.string()
    })

