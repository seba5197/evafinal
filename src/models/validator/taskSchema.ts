import Joi from "joi";
import { CreatetaskDTO, UpdatetaskDTO } from "../dto/taskDTO";

export const createTaskSchema: Joi.ObjectSchema<CreatetaskDTO> = Joi.object().keys({
title: Joi.string().required(),
content: Joi.string().required(),
done: Joi.boolean().required(),
userID: Joi.number().required()
})

export const updateTaskSchema: Joi.ObjectSchema<UpdatetaskDTO> = Joi.object().keys({
    title: Joi.string(),
    content: Joi.string(),
    done: Joi.boolean(),
    userID: Joi.number()
    })