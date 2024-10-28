import ItemModel from "../../Modle/ItemModel.js";


// Create New Item 
export const CreateItem = async (req, res) => {
    const {NameItem,Description,Category,DailyPrice,RentalDays} = req.body
    const Owner = req.user.id;
    try {
        const newItem = await ItemModel.create({NameItem,Description,Category,DailyPrice,RentalDays});
        res.status(201).json({message:"Success Add Item",newItem});
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}



// Get All Own Items
export const GetOwnerItems = async (req, res) => {
    const Owner = req.user.id; 

    try {
        const items = await ItemModel.findAll({ where: { Owner } });
        res.status(200).json({message:"Success",items});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update Own Item

export const UpdateItem = async (req, res) => {
    const { idItem } = req.params; 
    const Owner = req.user.id; 
    const { NameItem, Description, DailyPrice, RentalDays} = req.body; 

    try {
        
        const item = await ItemModel.findOne({ where: { idItem, Owner } });
        
        if (!item) {
            return res.status(404).json({ message: "Item not found or you're not authorized to edit this item." });
        }

        
        await item.update({
            NameItem: NameItem || item.NameItem,
            Description: Description || item.Description,
            DailyPrice: DailyPrice || item.DailyPrice,
            RentalDays: RentalDays || item.RentalDays,
        });

        res.status(200).json({ message: "Item updated successfully", item });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};






