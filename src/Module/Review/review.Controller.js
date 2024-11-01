import ReviewModel from "../../Modle/ReviewModel.js";

// Create New Review
export const CreateItem = async (req, res) => {
  const { ReviewText, Rating } = req.body;
  const userId = req.user.id;
  const { id } = req.params;

  const item = await ItemModel.findOne({
    where: {
      id: Number(id),
    },
  });

  if (!item) {
    return res.status(404).json({
      message: "Item not found or you're not authorized to edit this item.",
    });
  }

  try {
    const newReview = await ReviewModel.create({
      ReviewText,
      Rating,
      UserId: userId,
      ItemId: id,
    });

    res.status(201).json({ message: "Success Review", newReview });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
