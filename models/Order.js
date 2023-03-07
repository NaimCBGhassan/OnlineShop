import { Schema, model } from "mongoose";

const orderSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    customerId: {
      type: String,
    },
    paymentIntentId: {
      type: String,
    },
    products: [
      {
        id: { type: String },
        title: { type: String, required: true },
        description: { type: String, required: true },
        unit_price: { type: String, required: true },
        picture_url: { type: String, required: true },
        quantity: { type: String, required: true },
      },
    ],
    subtotal: { type: Number, required: true },
    total: { type: Number, required: true },
    deliveryStatus: { type: String, default: "pending" },
    paymentStatus: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export default model("Order", orderSchema);
