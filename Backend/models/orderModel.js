import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        products: [
            {
                name: {
                    type: String,
                    required: true,
                },
                quantity: {
                    type: Number,
                    required: true,
                    min: 1,
                },
                price: {
                    type: Number,
                    required: true,
                },
            }
        ],
        totalAmount: {
            type: Number,
            required: true,
        }
    },
    { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
