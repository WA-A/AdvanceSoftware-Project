import RentalModel from "../../Modle/RentalModel.js";
import PaymentModel from "../../Modle/PaymentModel.js";
import stripe from "../../../config/stripeConfig.js";
import { sendEmail } from "../../../Utls/SendEmail.js";
import UserModel from "../../Modle/UserModule.js";
import ItemModel from "../../Modle/ItemModel.js";

export const CreatePayment = async (req, res) => {
  try {
    const { rentalId } = req.params;
    const rental = await RentalModel.findByPk(rentalId);
    if (!rental) return res.status(404).json({ message: "Rental not found" });
    if (rental.Status !== "confirmed")
      return res
        .status(404)
        .json({ message: "Rental hasn't been confirmed by the Owner." });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { name: `Rental for Item ${rental.Item}` },
            unit_amount: Math.round(rental.FinalCost * 100),
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: "http://localhost:4000/payment-success",
      cancel_url: "http://localhost:4000/payment-cancel",
    });

    // Store session info in PaymentModel
    const payment = await PaymentModel.create({
      RentalId: rental.id,
      amount: rental.FinalCost,
      currency: "usd",
      paymentIntentId: session.id,
      status: "pending",
    });

    res
      .status(200)
      .json({ sessionId: session.id, message: "Payment session created" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const PaymentSuccess = async (req, res) => {
  try {
    const { session_id } = req.query;
    const session = await stripe.checkout.sessions.retrieve(session_id);
    const payment = await PaymentModel.findOne({
      where: { paymentIntentId: session.id },
    });
    if (payment) {
      payment.status = "completed";
      await payment.save();
    }
    const rental = await RentalModel.findByPk(payment.RentalId);
    if (rental) {
      rental.PaymentStatus = "paid";
      rental.FinalCost = 0;
      await rental.save();
    }
    const tenant = await UserModel.findByPk(rental.ItemTenant);
    const item = await ItemModel.findByPk(rental.Item);
    if (item) {
      item.Status = "Rented";
      await item.save();
    }
    // Send a confirmation email or notification to the tenant
    await sendEmail(
      tenant.Email,
      "Payment Successful - Proceeding with Delivery",
      `Hello ${tenant.Name},\n\n We are pleased to inform you that your payment has been successfully processed. Your order is now ready for delivery.
      \nOur team will prepare everything for shipment, and you will receive a confirmation email with tracking details once your package is dispatched.
      \nWe look forward to delivering your order soon!
      \n\nBest regards,\n`,
      "Rental App",
      "bookbliss24@gmail.com"
    );
    res.status(200).json({ message: "Payment successful!", rental });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const PaymentCancel = async (req, res) => {
  try {
    const { session_id } = req.query;
    const session = await stripe.checkout.sessions.retrieve(session_id);
    const payment = await PaymentModel.findOne({
      where: { paymentIntentId: session.id },
    });
    if (payment) {
      payment.status = "cancelled";
      await payment.save();
    }
    res.status(200).json({ message: "Payment cancelled!" });
    // Send a cancellation email or notification to the user
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const CreatePaymentForPreviousDamages = async (req, res) => {
  try {
    const { rentalId } = req.params;
    const rental = await RentalModel.findByPk(rentalId);
    if (!rental) return res.status(404).json({ message: "Rental not found" });
    if (rental.Status !== "confirmed")
      return res
        .status(404)
        .json({ message: "Rental hasn't been confirmed by the Owner." });

    if (rental.damageAmount === 0)
      return res.status(400).json({ message: "No damages found" });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { name: `Rental for Item ${rental.Item}` },
            unit_amount: Math.round(rental.FinalCost * 100),
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: "http://localhost:4000/payment-success",
      cancel_url: "http://localhost:4000/payment-cancel",
    });

    // Store session info in PaymentModel
    const payment = await PaymentModel.create({
      RentalId: rental.id,
      amount: rental.damageAmount,
      currency: "usd",
      paymentIntentId: session.id,
      status: "pending",
    });

    res.status(200).json({
      sessionId: session.id,
      message: "Payment For Damages session created",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const PaymentSuccessForPreviousDamages = async (req, res) => {
  try {
    const { session_id } = req.query;
    const session = await stripe.checkout.sessions.retrieve(session_id);
    const payment = await PaymentModel.findOne({
      where: { paymentIntentId: session.id },
    });
    if (payment) {
      payment.status = "completed";
      await payment.save();
    }
    const rental = await RentalModel.findByPk(payment.RentalId);
    if (rental) {
      rental.damageAmount = 0;
      await rental.save();
    }
    const tenant = await UserModel.findByPk(rental.ItemTenant);

    // Send a confirmation email or notification to the tenant
    await sendEmail(
      tenant.Email,
      "Payment Successful - Proceeding with Delivery",
      `Hello ${tenant.Name},\n\n We are pleased to inform you that your payment has been successfully processed.
      \nNow you are able for renting again.
      \n\nBest regards,\n`,
      "Rental App",
      "bookbliss24@gmail.com"
    );
    res.status(200).json({ message: "Payment For Damage successful!", rental });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
