import ReviewModel from "../../Modle/ReviewModel.js";
import ItemModel from "../../Modle/ItemModel.js";

// Create New Review
export const CreateReview = async (req, res) => {
  const { itemId } = req.params;
  const userId = req.user.id;
  const { ReviewText, Rating } = req.body;

  console.log("Item Id:", itemId);
  console.log("USER Id:", userId);
  try {
    const newReview = await ReviewModel.create({
      ReviewText,
      Rating,
      UserId: Number(userId),
      ItemId: Number(itemId),
    });

    res.status(201).json({ message: "Success Review", newReview });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update Review
export const UpdateReview = async (req, res) => {
  const { reviewId } = req.params;
  const userId = req.user.id;
  const { ReviewText, Rating } = req.body;

  try {
    const review = await ReviewModel.findOne({
      where: { id: reviewId, UserId: userId },
    });

    if (!review) {
      return res.status(404).json({
        message: "Review not found or you are not authorized to update it.",
      });
    }

    review.ReviewText = ReviewText || review.ReviewText;
    review.Rating = Rating || review.Rating;

    await review.save();

    res.status(200).json({ message: "Review updated successfully", review });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete Review
export const DeleteReview = async (req, res) => {
  const { reviewId } = req.params;
  const userId = req.user.id;

  try {
    const review = await ReviewModel.findOne({
      where: { id: reviewId, UserId: userId },
    });

    if (!review) {
      return res.status(404).json({
        message: "Review not found or you are not authorized to delete it.",
      });
    }

    await review.destroy();

    res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Reviews for an Item
export const GetItemReviews = async (req, res) => {
  const { itemId } = req.params;

  try {
    const reviews = await ReviewModel.findAll({ where: { ItemId: itemId } });

    res.status(200).json({ message: "Reviews fetched successfully", reviews });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
