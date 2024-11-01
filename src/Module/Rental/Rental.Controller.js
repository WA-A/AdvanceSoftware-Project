import RentalModel from '../models/RentalModel.js';
import ItemModel from '../models/ItemModel.js';


// Create New Rental
export const CreateRental = async (req, res) => {
    try {
        const { itemId } = req.params; 
        const { RentalDays, ItemTenant } = req.body; 

        
        const item = await ItemModel.findById(itemId);
        if (!item) {
            return res.status(404).json({ message: "Item not found" });
        }

        const ItemOwner = item.ownerId;
        const FinalCost = item.DailyPrice * RentalDays;

        const NewRental = await RentalModel.create({
            RentalDays,
            RentalDate: new Date(),
            ItemId: itemId,
            ItemOwner,
            ItemTenant,
            FinalCost
        });

        res.status(201).json({ message: "Rental created successfully", FinalCost, NewRental });
    } catch (error) {
        res.status(500).json({ message: "Error creating rental", error });
    }
};


// Update Rental
export const UpdateRental = async (req, res) => {
    try {
        const { rentalId } = req.params;
        const { RentalDays, ItemTenant } = req.body;

        const rental = await RentalModel.findById(rentalId);
        if (!rental) {
            return res.status(404).json({ message: "Rental not found" });
        }

        if (RentalDays) {
            rental.RentalDays = RentalDays;
            const item = await ItemModel.findById(rental.ItemId);
            rental.FinalCost = item.DailyPrice * RentalDays;
        }
        if (ItemTenant) rental.ItemTenant = ItemTenant;

        await rental.save();
        res.status(200).json({ message: "Rental updated successfully", rental });
    } catch (error) {
        res.status(500).json({ message: "Error updating rental", error });
    }
};

// Get Rental Own Tenant

// Get Rental Own Ownar

// Delete Rental 