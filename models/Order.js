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
        name: { type: String },
        brand: { type: String },
        desc: { type: String },
        price: { type: String },
        image: { type: String },
        cartQuantity: { type: String },
      },
    ],
    subTotal: { type: Number, required: true },
    total: { type: Number, required: true },
    deliveryStatus: { type: String, default: "pending" },
    paymentStatus: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export default model("Order", orderSchema);
