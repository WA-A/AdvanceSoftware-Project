import DeliveryModel from "../models/DeliveryModel.js"; // Adjust the import path as necessary

// Create Delivery
export const createDelivery = async (req, res) => {
  try {
    const { rentalId, userId, tenantAddress, ownerAddress, deliveryAddress, deliveryMethod } = req.body;

    const newDelivery = await DeliveryModel.create({
      rentalId,
      userId,
      tenantAddress,
      ownerAddress,
      deliveryAddress,
      deliveryMethod,
    });

    return res.status(201).json({ message: "Delivery created successfully", newDelivery });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

// Get Deliveries by User ID
export const getDeliveriesByUserId = async (req, res) => {
  const userId = req.params.userId;
  try {
    const deliveries = await DeliveryModel.getDeliveriesByUserId(userId);
    if (deliveries.length === 0) {
      return res.status(404).json({ message: "No deliveries found for this user" });
    }
    res.status(200).json(deliveries);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

// Update Delivery Details
export const updateDeliveryDetails = async (req, res) => {
  const { deliveryId } = req.params;
  const updatedFields = req.body;

  try {
    const [updated] = await DeliveryModel.update(updatedFields, {
      where: { id: deliveryId },
    });

    if (updated) {
      const updatedDelivery = await DeliveryModel.findByPk(deliveryId);
      return res.status(200).json(updatedDelivery);
    }
    throw new Error("Delivery not found");
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

// Update Delivery Status
export const updateDeliveryStatus = async (req, res) => {
  const { deliveryId } = req.params;
  const { newStatus } = req.body;

  try {
    const updated = await DeliveryModel.updateDeliveryStatus(deliveryId, newStatus);
    if (updated[0] === 0) {
      return res.status(404).json({ message: "Delivery not found" });
    }
    return res.status(200).json({ message: "Delivery status updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

// Update Payment Status
export const updatePaymentStatus = async (req, res) => {
  const { deliveryId } = req.params;
  const { newStatus } = req.body;

  try {
    const updated = await DeliveryModel.updatePaymentStatus(deliveryId, newStatus);
    if (updated[0] === 0) {
      return res.status(404).json({ message: "Delivery not found" });
    }
    return res.status(200).json({ message: "Payment status updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};
