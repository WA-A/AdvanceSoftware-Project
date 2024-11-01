import RentalModel from '../models/RentalModel.js';
import ItemModel from '../models/ItemModel.js';

export const createRental = async (req, res) => {
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
            finalCost
        });

        res.status(201).json({ message: "Rental created successfully", FinalCost, NewRental });
    } catch (error) {
        res.status(500).json({ message: "Error creating rental", error });
    }
};
