import Joi from 'joi';

// Create Validation Schemas
export const CreateItemSchema = Joi.object({
    NameItem: Joi.string().required(),
    Description: Joi.string().required(),
    Category: Joi.string().valid('Tools', 'Sports Equipment', 'Electronics', 'Furniture', 'Vehicles', 'Others').required(),
    DailyPrice: Joi.number().positive().required(),
    RentalDays: Joi.number().integer().positive().required()
});

// Update Item Schema
export const UpdateItemSchema = Joi.object({
    NameItem: Joi.string(),
    Description: Joi.string(),
    DailyPrice: Joi.number().positive(),
    RentalDays: Joi.number().integer().positive()
});
