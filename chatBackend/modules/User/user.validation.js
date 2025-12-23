import joi from "joi";
import mongoose from "mongoose"


export const registerSchema = joi.object({
    email: joi.string().email().lowercase().required(),
    password: joi.string().min(6).max(30).required(),
    name: joi.string().min(2).max(50).required(),
    username: joi.string().alphanum().min(4).max(30).optional(),
    avtar: joi.string().uri().optional(),
    role: joi.string().valid("user", "admin").default("user")
});

export const loginSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required()
})

export const userUpdateSchema = joi.object({
    name: joi.string().min(2).max(50),
    username: joi.string().alphanum().min(3).max(30),
    avtar: joi.string().uri(),
    status: joi.string().valid("online", "offline", "away")
});