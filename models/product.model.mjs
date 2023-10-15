import { Schema, model } from 'mongoose';

const ProductSchema = new Schema(
    {
        name: { type: String, required: true },
        price: { type: Number, required: true },
        avatar: { type: String, required: true },
        soldDate: { type: Date, default: Date.now() },
        timesSold: { type: Number, default: 0 },
    },
    { timestamps: true },
);

ProductSchema.index({ name: 'text' });

const Product = model('Product', ProductSchema);

export default Product;
