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
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};





