import { body, validationResult } from 'express-validator';

export const validateDelivery = [
  body('rentalId')
    .exists().withMessage('Rental ID is required')
    .isInt().withMessage('Rental ID must be an integer'),
  
  body('userId')
    .exists().withMessage('User ID is required')
    .isInt().withMessage('User ID must be an integer'),
  
  body('tenantAddress')
    .exists().withMessage('Tenant address is required')
    .isString().withMessage('Tenant address must be a string')
    .notEmpty().withMessage('Tenant address cannot be empty'),
  
  body('ownerAddress')
    .exists().withMessage('Owner address is required')
    .isString().withMessage('Owner address must be a string')
    .notEmpty().withMessage('Owner address cannot be empty'),
  
  body('deliveryAddress')
    .exists().withMessage('Delivery address is required')
    .isString().withMessage('Delivery address must be a string')
    .notEmpty().withMessage('Delivery address cannot be empty'),
  
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];
