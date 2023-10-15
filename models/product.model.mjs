import {Schema, model} from 'mongoose';

const ProductSchema = new Schema({
    name: {type: String, required: true, unique: true},
    price: {type: Number, required: true},
    soldDate: {type: Date, default: Date.now()}
})