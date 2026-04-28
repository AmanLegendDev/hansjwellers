import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
{
title: {
type: String,
required: true
},

slug: {
type: String,
required: true,
unique: true,
index: true
},

shortDescription: String,

description: String,

weight: String,

purity: String,

material: String,

stoneType: String,

makingCharges: String,

customizable: {
type: Boolean,
default: false
},

deliveryTime: String,

price: {
type: Number,
required: true
},

images: [
{
type: String
}
],

category: {
type: mongoose.Schema.Types.ObjectId,
ref: "Category"
},

stock: {
type: Number,
default: 0
},

isFeatured: {
type: Boolean,
default: false
},

isVisible: {
type: Boolean,
default: true
}

},
{
timestamps: true
}
);

export default mongoose.models.Product ||
mongoose.model("Product", productSchema);