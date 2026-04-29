import { connectDB } from "@/lib/db";
import Order from "@/models/Order";

export async function GET(req, context) {

try {

const params = await context.params;

await connectDB();

const order = await Order.findOne({
trackingId: params.trackingId
}).lean();


if (!order) {

return Response.json(
{ error: "Order not found" },
{ status: 404 }
);

}


/*
AUTO FALLBACK TIMESTAMP SUPPORT
(agar placedAt missing ho)
*/

if (!order.placedAt) {

order.placedAt = order.createdAt;

}


/*
CANCEL STATUS SUPPORT
*/

if (order.orderStatus === "cancelled") {

order.cancelled = true;

}


return Response.json({

success: true,

order

});

} catch (err) {

console.log(err);

return Response.json(
{ error: "Tracking fetch failed" },
{ status: 500 }
);

}

}