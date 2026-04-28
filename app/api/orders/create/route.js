import { connectDB } from "@/lib/db";
import Order from "@/models/Order";
import generateTrackingId from "@/lib/generateTrackingId";

export async function POST(req) {

await connectDB();

const body = await req.json();

const trackingId = generateTrackingId();

const order = await Order.create({

...body,

trackingId,

paymentStatus: "pending",

orderStatus: "placed",

placedAt: new Date()

});

return Response.json({

success: true,

trackingId,

order

});

}