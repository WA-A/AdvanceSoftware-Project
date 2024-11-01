import joi from "joi";

// Schema for creating a new rental
export const CreateRentalSchema = joi.object({
  itemId: joi.number().integer().required().messages({
    "any.required": "Item ID is required",
    "number.base": "Item ID should be a valid number",
  }),
  RentalDays: joi.number().integer().min(1).required().messages({
    "any.required": "RentalDays is required",
    "number.base": "RentalDays should be a valid number",
    "number.min": "RentalDays should be at least 1 day",
  }),
  ItemTenant: joi.number().integer().required().messages({
    "any.required": "ItemTenant is required",
    "number.base": "ItemTenant should be a valid user ID",
  }),
});

// Schema for updating 
export const UpdateRentalSchema = joi.object({
  RentalDays: joi.number().integer().min(1).optional().messages({
    "number.base": "RentalDays should be a valid number",
    "number.min": "RentalDays should be at least 1 day",
  }),
  ItemTenant: joi.number().integer().optional().messages({
    "number.base": "ItemTenant should be a valid user ID",
  }),
});
