import ItemModel from "../../Modle/ItemModel.js";

// Create New Item
export const CreateItem = async (req, res) => {
  const { NameItem, Description, Category, DailyPrice, RentalDays } = req.body;
  const userId = req.user.id;
  if (!req.file) {
    return res.status(400).json({
      message: "Validation error",
      errors: [{ message: "Image file is required", path: "image" }],
    });
  }
  try {
    const imageUrl = req.file.path;
    const newItem = await ItemModel.create({
      NameItem,
      Description,
      Category,
      DailyPrice,
      RentalDays,
      Owner: userId,
      Image: imageUrl,
    });

    res.status(201).json({ message: "Success Add Item", newItem });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get All Own Items
export const GetItems = async (req, res) => {
  const Owner = req.user.id;
  console.log("Request Body:", req.body);
  console.log("User ID:", Owner);
  try {
    const items = await ItemModel.findAll({ where: { Owner } });
    res.status(200).json({ message: "Success", items });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Own Item
export const UpdateItem = async (req, res) => {
  console.log("Inside update controller");

  const { id } = req.params;
  const Owner = req.user.id;

  const { NameItem, Description, DailyPrice, RentalDays } = req.body;

  try {
    const item = await ItemModel.findOne({
      where: {
        id: Number(id),
        Owner,
      },
    });

    if (!item) {
      return res.status(404).json({
        message: "Item not found or you're not authorized to edit this item.",
      });
    }

    const [updatedItems] = await ItemModel.update(
      { NameItem, Description, DailyPrice, RentalDays },
      {
        where: {
          id: Number(id),
          Owner,
        },
        returning: true,
      }
    );

    res.status(200).json({
      message: "Item updated successfully",
      item: updatedItems[0],
    });
  } catch (error) {
    console.error("Error during update:", error);
    res.status(400).json({ message: error.message });
  }
};

// Delete Item
export const DeleteItem = async (req, res) => {
  const { id } = req.params;
  const Owner = req.user.id;

  try {
    const item = await ItemModel.findOne({ where: { id, Owner } });

    if (!item) {
      return res.status(404).json({
        message: "Item not found or you're not authorized to delete this item.",
      });
    }

    await item.destroy();

    res.status(200).json({ message: "Item deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
