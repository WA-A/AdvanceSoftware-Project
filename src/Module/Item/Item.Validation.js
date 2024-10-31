import joi from "joi";

// Create Validation Schemas
export const CreateItemSchema = joi.object({
  NameItem: joi.string().required(),
  Description: joi.string().required(),
  Category: joi
    .string()
    .valid(
      "Tools",
      "Sports Equipment",
      "Electronics",
      "Furniture",
      "Vehicles",
      "Others"
    )
    .required(),
  DailyPrice: joi.number().positive().required(),
  RentalDays: joi.number().integer().positive().required(),
});

// Update Item Schema
export const UpdateItemSchema = joi.object({
  NameItem: joi.string().optional(),
  Description: joi.string().optional(),
  DailyPrice: joi.number().positive().optional(),
  RentalDays: joi.number().integer().positive().optional(),
});
