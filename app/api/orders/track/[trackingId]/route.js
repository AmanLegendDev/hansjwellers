import { connectDB } from "@/lib/db";
import Order from "@/models/Order";

export async function GET(req, context){

const params = await context.params;

await connectDB();

const order = await Order.findOne({
trackingId: params.trackingId
}).lean();

return Response.json(order);

}