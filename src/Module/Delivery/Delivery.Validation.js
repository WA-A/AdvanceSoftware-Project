import Joi from "joi";

export const CreateDeliverySchema = Joi.object({
  rentalId: Joi.number().integer().required(),
  tenantAddress: Joi.string().required(),
  ownerAddress: Joi.string().required(),
  deliveryAddress: Joi.string().required(),
});

// Middleware function for validation
export const validateDelivery = (req, res, next) => {
  const { error } = deliverySchema.validate(req.body, { abortEarly: false });
  if (error) {
    const errors = error.details.map((err) => ({
      message: err.message,
      field: err.path[0],
    }));
    return res.status(400).json({ errors });
  }
  next();
};
