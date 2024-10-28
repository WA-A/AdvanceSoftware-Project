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






