import joi from "joi";

// Create Validation Schemas
export const CreateReviewSchema = joi
  .object({
    Rating: joi.number().min(1).max(5).required(),
    ReviewText: joi.string().optional(),
  })
  .options({ allowUnknown: true });
