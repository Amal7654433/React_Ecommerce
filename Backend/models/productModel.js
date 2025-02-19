
import mongoose from "mongoose";
const Schema = mongoose.Schema;

const productSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        detail: {
            type: String,
            required: true,
        },
        stock: {
            type: Number,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },

    }, { timestamps: true })
const Products = mongoose.model('productDetails', productSchema);
export default Products


