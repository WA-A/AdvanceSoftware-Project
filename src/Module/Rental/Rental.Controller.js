import RentalModel from "../../Modle/RentalModel.js";
import ItemModel from "../../Modle/ItemModel.js";
import UserModel from "../../Modle/UserModule.js";
import { sendEmail } from "../../../Utls/SendEmail.js";
import { Op } from "sequelize";

RentalModel.belongsTo(ItemModel, { foreignKey: "Item", as: "item" });
ItemModel.hasMany(RentalModel, { foreignKey: "Item", as: "rentals" });

// Create New Rental
export const CreateRental = async (req, res) => {
  try {
    const { itemId } = req.params;
    const { RentalDays } = req.body;
    const ItemTenant = req.user.id;

    const item = await ItemModel.findByPk(itemId);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    // Check if item is available for renting
    if (item.Status == "Rented") {
      return res.status(404).json({
        message: "Item Unavailable because its currently unavailable",
      });
    }
    if (!RentalDays || !ItemTenant) {
      return res
        .status(400)
        .json({ message: "RentalDays and ItemTenant are required" });
    }
    if (!RentalDays || !ItemTenant) {
      return res
        .status(400)
        .json({ message: "RentalDays and ItemTenant are required" });
    }

    const ItemOwner = item.Owner;
    const owner = await UserModel.findByPk(ItemOwner);
    if (!item) {
      return res.status(404).json({ message: "Owner not found" });
    }

    // Calculate final cost
    const FinalCost = item.DailyPrice * RentalDays;

    const NewRental = await RentalModel.create({
      RentalDays,
      RentalDate: new Date(),
      ItemOwner,
      ItemTenant,
      FinalCost,
      Item: item.id,
    });

    const tenant = await UserModel.findByPk(ItemTenant);
    const tenantEmail = tenant.Email;

    //send email to notify the item's owner that the item has been requested for renting
    await sendEmail(
      owner.Email,
      "New Rental Request Received",
      `Hello ${owner.Name},\n\n${tenant.Name} has requested to rent your item "${item.NameItem}" for ${RentalDays} days. Please review and confirm the rental.\n\nBest regards,\nYour Rental App`,
      "Rental App",
      owner.Email
    );

    // notify the tenant that the request has been sent
    await sendEmail(
      tenantEmail,
      "Rental Request Submitted",
      `Hello ${tenant.Name},\n\nYour rental request for the item "${item.NameItem}" has been submitted successfully. The owner will review your request and get back to you shortly.\n\nBest regards,\nYour Rental App`,
      "Rental App",
      "bookbliss24@gmail.com"
    );

    res.status(201).json({
      message: "Rental created successfully",
      FinalCost,
      NewRental,
    });
  } catch (error) {
    console.error("Error details:", error);
    res
      .status(500)
      .json({ message: "Error creating rental", error: error.message });
  }
};

// Update Rental
export const UpdateRental = async (req, res) => {
  try {
    const { rentalId } = req.params;
    const { RentalDays, ItemTenant } = req.body;
    let FinalCost = 1;

    const rental = await RentalModel.findByPk(rentalId);
    if (!rental) {
      return res.status(404).json({ message: "Rental not found" });
    }

    const item = await ItemModel.findByPk(rental.Item);
    if (!item) {
      return res.status(404).json({ message: "Associated item not found" });
    }

    FinalCost = item.DailyPrice * RentalDays;

    // Log the update details for debugging
    console.log(`Updating rental with ID ${rentalId}:`, {
      RentalDays,
      ItemTenant,
      FinalCost,
    });

    const [updatedCount, updatedRentals] = await RentalModel.update(
      { RentalDays, ItemTenant, FinalCost },
      {
        where: {
          id: rentalId, // Check if 'id' is indeed the correct field
        },
        returning: true,
      }
    );

    console.log("Update count:", updatedCount);
    console.log("Updated rentals:", updatedRentals);

    if (updatedCount === 0) {
      return res.status(404).json({
        message: "No rental updated, please check the rental ID and data",
      });
    }

    res.status(200).json({
      message: "Rental updated successfully",
      updatedRental: updatedRentals,
    });
  } catch (error) {
    console.error("Error details:", error);
    res
      .status(500)
      .json({ message: "Error updating rental", error: error.message });
  }
};

// Get Rental
export const GetUserRentals = async (req, res) => {
  try {
    const userId = req.user.id;
    const rentals = await RentalModel.findAll({
      where: {
        [Op.or]: [{ ItemOwner: userId }, { ItemTenant: userId }],
      },
      include: [{ model: ItemModel, as: "item" }],
    });

    if (rentals.length === 0) {
      return res
        .status(404)
        .json({ message: "No rentals found for this user" });
    }

    res.status(200).json(rentals);
  } catch (error) {
    console.error("Error details:", error.message);
    console.error("Error stack:", error.stack);
    res.status(500).json({
      message: "Error fetching rentals for user",
      error: error.message,
    });
  }
};

// Delete Rental
export const DeleteRental = async (req, res) => {
  try {
    const { rentalId } = req.params;
    const rental = await RentalModel.findByPk(rentalId);
    if (!rental) {
      return res.status(404).json({ message: "Rental not found" });
    }

    await rental.destroy();
    res.status(200).json({ message: "Rental deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting rental", error });
  }
};

// Confirm Rental By Item Owner and Update the Item status to Rented
export const ConfirmRentalByOwner = async (req, res) => {
  try {
    const { rentalId } = req.params;
    const rental = await RentalModel.findByPk(rentalId);
    if (!rental) {
      return res.status(404).json({ message: "Rental not found" });
    }
    //check if the logged user is the one who owns the item
    if (rental.ItemOwner !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Not authorized to confirm this rental" });
    }
    // Update the Rental status to confirmed
    rental.Status = "confirmed";
    await rental.save();
    // Update the Item status to Rented
    const item = await ItemModel.findByPk(rental.Item);
    if (item) {
      item.Status = "Rented";
      await item.save();
    }
    // Send email to notify the tenant that the rental has been confirmed
    const tenant = await UserModel.findByPk(rental.ItemTenant);
    if (tenant) {
      await sendEmail(
        tenant.Email,
        "Rental Confirmed",
        `Hello ${tenant.Name},\n\nYour rental request for the item "${item.NameItem}" has been confirmed. \nYou can now continue for Payment and Delivery.\n\nBest regards,\nYour Rental App`,
        "Rental App",
        req.user.Email
      );
    }
    return res.status(200).json({
      message: "Rental confirmed by owner and item status updated to rented",
    });
  } catch (error) {
    console.error("Error confirming rental by owner:", error); // Log the error to the console
    res.status(500).json({
      message: "Error confirming rental by owner",
      error: error.message,
    });
  }
};
