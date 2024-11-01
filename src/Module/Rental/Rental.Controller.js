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

// Get Rental 


export const GetUserRentals = async (req, res) => {
    try {
        const userId = req.user.id; 

       
        const rentals = await RentalModel.findAll({
            where: {
                [Op.or]: [ // ملاحظة : الفكرة انه اذا المستخدم الي عامل لوج ان هو يوزر بجيب كل عمليات الايجار الي هو عملهم 
                    // اما اذا كان الي عامل لوج ان هو المالك بجيب العناصر الي تم استئجاره منه
                    { ItemOwner: userId },
                    { ItemTenant: userId }
                ]
            },
            include: [
                { model: ItemModel, as: 'item' } 
            ]
        });

        if (rentals.length === 0) {
            return res.status(404).json({ message: "No rentals found for this user" });
        }

        
        res.status(200).json(rentals);
    } catch (error) {
        res.status(500).json({ message: "Error fetching rentals for user", error });
    }
};



// Delete Rental 
export const DeleteRental = async (req, res) => {
    try {
        const { RentalId } = req.params;
        const rental = await RentalModel.findById(RentalId);
        if (!rental) {
            return res.status(404).json({ message: "Rental not found" });
        }

        await rental.destroy();
        res.status(200).json({ message: "Rental deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting rental", error });
    }
};
