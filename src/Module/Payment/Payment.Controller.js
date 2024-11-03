import RentalModel from "../../Modle/RentalModel.js";
import PaymentModel from "../../Modle/PaymentModel.js";
import stripe from "../../../config/stripeConfig.js";

export const CreatePayment = async (req, res) => {
  const { rentalId } = req.params;

  try {
    const rental = await RentalModel.findByPk(rentalId);
    if (!rental) return res.status(404).json({ message: "Rental not found" });

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
      success_url: "http://localhost:3000/payment-success",
      cancel_url: "http://localhost:3000/payment-cancel",
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

export const Webhooks = async (req, res) => {
  constructEvent(request.body, sig, endpointSecret);
};

export const GetPaymentStatus = async (req, res) => {};
