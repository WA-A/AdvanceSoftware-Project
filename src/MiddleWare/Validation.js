export const Validation = (schema) => {
  return (req, res, next) => {
    const errorsMessage = [];

    if (req.file) {
      fileData.image = req.file;
    }
    const { error } = schema.validate({
      ...req.body,
      ...req.params,
      ...req.query,
    });

    if (error) {
      error.details.forEach((err) => {
        const key = err.context.key;
        errorsMessage.push({ [key]: err.message });
      });

      return res
        .status(400)
        .json({ message: "Validation error", errors: errorsMessage });
    }

    next();
  };
};

export const validateSchema = (schema) => (req, res, next) => {
  // Check if `file` exists if it’s required.
  if (!req.file) {
    return res.status(400).json({
      message: "Validation error",
      errors: [{ message: "Image file is required", path: "image" }],
    });
  }

  // Validate other fields using Joi schema
  const { error } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({
      message: "Validation error",
      errors: error.details.map((detail) => ({
        message: detail.message,
        path: detail.path.join("."),
      })),
    });
  }
  next();
};

export const validateDelivery = (req, res, next) => {
  const { rentalId, userId, tenantAddress, ownerAddress, deliveryAddress } =
    req.body;

  if (
    !rentalId ||
    !userId ||
    !tenantAddress ||
    !ownerAddress ||
    !deliveryAddress
  ) {
    return res
      .status(400)
      .json({ message: "Missing required delivery information" });
  }

  next();
};
