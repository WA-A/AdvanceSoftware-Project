import DeliveryModel from "../../Modle/DeliveryModel.js"; // Adjust the import path as necessary
import RentalModel from "../../Modle/RentalModel.js";

// Create Delivery
export const createDelivery = async (req, res) => {
  try {
    const { tenantAddress, ownerAddress, deliveryAddress, deliveryMethod } =
      req.body;
    const { rentalId } = req.params;
    const userId = req.user.id;

    const rental = await RentalModel.findOne({ rentalId });
    if (!rental) {
      return res.status(404).json({ message: "Rental not found" });
    }

    const newDelivery = await DeliveryModel.create({
      rentalId,
      userId,
      tenantAddress,
      ownerAddress,
      deliveryAddress,
      deliveryMethod,
    });

    return res
      .status(201)
      .json({ message: "Delivery created successfully", newDelivery });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};
