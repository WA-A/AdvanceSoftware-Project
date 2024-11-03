import DeliveryModel from "../../Modle/DeliveryModel.js";
import RentalModel from "../../Modle/RentalModel.js";


export const CreateDelivery = async (req, res) => {
  try {
    const { rentalId } = req.params;
    const { deliveryAddress } = req.body;
    const userId = req.user.id;

    const rental = await RentalModel.findByPk(rentalId);
    if (!rental) {
      return res.status(404).json({ message: "Rental not found" });
    }

    const newDelivery = await DeliveryModel.create({
      rentalId,
      userId,
      deliveryAddress,
      deliveryStatus: "Pending",
    });

    res.status(201).json({ message: "Delivery created successfully", newDelivery });
  } catch (error) {
    console.error("Error creating delivery:", error);
    res.status(500).json({ message: "Error creating delivery", error: error.message });
  }
};

// Update Delivery Status
export const UpdateDeliveryStatus = async (req, res) => {
  try {
    const { deliveryId } = req.params;
    const { deliveryStatus } = req.body;

    const delivery = await DeliveryModel.findByPk(deliveryId);
    if (!delivery) {
      return res.status(404).json({ message: "Delivery not found" });
    }

    delivery.deliveryStatus = deliveryStatus;
    await delivery.save();

    res.status(200).json({ message: "Delivery status updated successfully", delivery });
  } catch (error) {
    console.error("Error updating delivery:", error);
    res.status(500).json({ message: "Error updating delivery status", error: error.message });
  }
};

// Get Deliveries for a User
export const GetUserDeliveries = async (req, res) => {
  try {
    const userId = req.user.id;
    const deliveries = await DeliveryModel.findAll({
      where: { userId },
      include: [{ model: RentalModel, as: "rental" }],
    });

    if (deliveries.length === 0) {
      return res.status(404).json({ message: "No deliveries found for this user" });
    }

    res.status(200).json(deliveries);
  } catch (error) {
    console.error("Error fetching deliveries:", error);
    res.status(500).json({ message: "Error fetching deliveries", error: error.message });
  }
};

// Delete Delivery
export const DeleteDelivery = async (req, res) => {
  try {
    const { deliveryId } = req.params;
    const delivery = await DeliveryModel.findByPk(deliveryId);
    if (!delivery) {
      return res.status(404).json({ message: "Delivery not found" });
    }

    await delivery.destroy();
    res.status(200).json({ message: "Delivery deleted successfully" });
  } catch (error) {
    console.error("Error deleting delivery:", error);
    res.status(500).json({ message: "Error deleting delivery", error: error.message });
  }
};
