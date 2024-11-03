export const validateDelivery = (req, res, next) => {
  const { rentalId, userId, tenantAddress, ownerAddress, deliveryAddress } = req.body;

  if (!rentalId || !userId || !tenantAddress || !ownerAddress || !deliveryAddress) {
    return res.status(400).json({ message: "Missing required delivery information" });
  }

  next();
};
