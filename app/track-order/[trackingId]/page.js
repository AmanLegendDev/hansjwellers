"use client";

import { useEffect,useState } from "react";
import { useParams } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Link from "next/link";

import {
CheckCircle,
Package,
Truck,
ShoppingBag
} from "lucide-react";

export default function TrackOrderPage(){

const params=useParams();

const [order,setOrder]=useState(null);

const formatPrice=(price)=>
new Intl.NumberFormat("en-IN").format(price);

useEffect(()=>{

const fetchOrder=()=>{

fetch(`/api/orders/track/${params.trackingId}`)
.then(res=>res.json())
.then(data=>{

if(data?.order){

setOrder(data.order);

}else{

setOrder(data);

}

});

};

fetchOrder();

/*
Polling every 5 seconds
*/

const interval=setInterval(fetchOrder,5000);

/*
Cleanup when page closes
*/

return()=>clearInterval(interval);

},[params.trackingId]);


if(!order)
return(
<section className="min-h-screen bg-white">
<Navbar/>
<div className="text-center py-32 text-neutral-400">
Loading tracking details...
</div>
</section>
);


return(

<section className="bg-white min-h-screen">

<Navbar/>

<div className="max-w-4xl mx-auto px-6 py-14">


{/* HEADER */}

<div className="text-center mb-12">

<h1 className="text-4xl font-heading text-[#0F2A44]">

Track Your Order

</h1>

<p className="text-neutral-500 mt-2">

Tracking ID: #{order.trackingId}

</p>

</div>



{/* DELIVERY SUCCESS MESSAGE */}

{order.orderStatus==="delivered" && (

<div className="bg-green-50 border border-green-200 rounded-2xl p-6 text-center mb-10">

<h3 className="text-green-700 font-semibold text-lg">

Your parcel has been delivered successfully 🎉

</h3>

<p className="text-green-600 text-sm mt-1">

Thank you for shopping with Hans Jewellers Shimla

</p>

</div>

)}



{/* STATUS */}

<div className="bg-[#FAF8F3] rounded-2xl p-8 shadow-soft mb-12">

<h2 className="text-xl font-heading text-[#0F2A44] mb-6">

Delivery Status

</h2>

<OrderTimeline order={order}/>

</div>



{/* ORDER SUMMARY */}

<div className="bg-white shadow-soft rounded-2xl p-8">

<h2 className="text-xl font-heading text-[#0F2A44] mb-6">

Order Summary

</h2>

{order.items.map(item=>(

<div
key={item._id}
className="flex justify-between border-b py-2 text-sm"
>

<span>

{item.title} × {item.qty}

</span>

<span>

₹ {formatPrice(item.price*item.qty)}

</span>

</div>

))}

<div className="flex justify-between mt-5 font-semibold text-lg">

<span>Total Amount</span>

<span className="text-[#D4AF37]">

₹ {formatPrice(order.totalAmount)}

</span>

</div>

</div>



{/* ADDRESS */}

<div className="bg-white shadow-soft rounded-2xl p-8 mt-10">

<h2 className="text-lg font-heading text-[#0F2A44]">

Delivery Address

</h2>

<p className="text-neutral-600 mt-2">

{order.address}

</p>

</div>



{/* SUPPORT */}

<div className="bg-[#FAF8F3] rounded-2xl shadow-soft p-8 mt-12 text-center">

<h2 className="text-lg font-heading text-[#0F2A44]">

Need Help With Your Order?

</h2>

<p className="text-neutral-500 mt-2">

Contact showroom anytime for delivery support

</p>

<div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">

<a
href="https://wa.me/919625970888"
target="_blank"
className="px-7 py-3 rounded-full bg-[#0F2A44] text-white hover:scale-[1.04] transition"
>

WhatsApp Support

</a>

<Link
href="/cart"
className="px-7 py-3 rounded-full border border-[#0F2A44] text-[#0F2A44] hover:bg-[#0F2A44] hover:text-white transition"
>

Back To Cart

</Link>

</div>

</div>

</div>

</section>

);

}



/*
TIMELINE COMPONENT
*/

function OrderTimeline({order}){

const steps=[

{
id:"placed",
label:"Order Placed",
icon:<ShoppingBag size={20}/>,
time:order.placedAt
},

{
id:"confirmed",
label:"Confirmed",
icon:<CheckCircle size={20}/>,
time:order.confirmedAt
},

{
id:"packed",
label:"Packed",
icon:<Package size={20}/>,
time:order.packedAt
},

{
id:"shipped",
label:"Shipped",
icon:<Truck size={20}/>,
time:order.shippedAt
},

{
id:"delivered",
label:"Delivered",
icon:<Truck size={20}/>,
time:order.deliveredAt
}

];


return(

<div className="space-y-6">

{steps.map(step=>{

const active=
steps.findIndex(s=>s.id===order.orderStatus)
>=
steps.findIndex(s=>s.id===step.id);

return(

<div
key={step.id}
className="flex items-start gap-4"
>

<div
className={`

w-10 h-10 flex items-center justify-center rounded-full mt-1

${active
?"bg-[#0F2A44] text-white"
:"bg-neutral-200 text-neutral-400"}

`}
>

{step.icon}

</div>

<div>

<p
className={`font-medium

${active
?"text-[#0F2A44]"
:"text-neutral-400"}

`}
>

{step.label}

</p>

<p className="text-xs text-neutral-400 mt-1">

{step.time
?new Date(step.time).toLocaleString()
:"Pending"}

</p>

</div>

</div>

);

})}

</div>

);

}