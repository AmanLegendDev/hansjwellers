import { connectDB } from "@/lib/db";
import Order from "@/models/Order";

export async function POST(req){

const { id, field, value } =
await req.json();

await connectDB();

const updateData={

[field]:value

};


/*
AUTO TIMESTAMP UPDATE
*/

if(field==="orderStatus"){

if(value==="confirmed")
updateData.confirmedAt=new Date();

if(value==="packed")
updateData.packedAt=new Date();

if(value==="shipped")
updateData.shippedAt=new Date();

if(value==="delivered")
updateData.deliveredAt=new Date();

}


if(field==="paymentStatus"
&& value==="paid"){

updateData.paidAt=new Date();

}


await Order.findByIdAndUpdate(

id,
updateData

);

return Response.json({

success:true

});

}