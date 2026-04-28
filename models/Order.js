import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
{
trackingId: {
type: String,
unique: true
},

customerName: String,

phone: String,

address: String,

note: String,

items: [
{
productId: mongoose.Schema.Types.ObjectId,
title: String,
price: Number,
qty: Number
}
],

totalAmount: Number,

paymentStatus: {
type: String,
enum: ["pending","paid"],
default: "pending"
},

placedAt: {
type: Date,
default: Date.now
},

confirmedAt: Date,

packedAt: Date,

shippedAt : Date,

deliveredAt: Date,

orderStatus: {
type: String,
enum: ["placed","confirmed","packed","delivered"],
default: "placed"
},
statusHistory: [
{
status: String,
time: Date
}
],

},

{ timestamps: true }
);

export default mongoose.models.Order ||
mongoose.model("Order", orderSchema);