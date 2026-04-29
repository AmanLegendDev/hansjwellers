"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import { useRouter } from "next/navigation";

export default function OrdersPage(){

const [orders,setOrders]=useState([]);

const router=useRouter();


useEffect(()=>{

fetch("/api/orders/list")
.then(res=>res.json())
.then(data=>{

/*
LATEST ORDER FIRST
*/

setOrders(
data.sort(
(a,b)=>new Date(b.createdAt)-new Date(a.createdAt)
)
);

});

},[]);



if(!orders.length)

return(

<section className="bg-white min-h-screen">

<Navbar/>

<div className="text-center py-32 text-neutral-400">

No orders yet

</div>

</section>

);



/*
LAST ORDER IDENTIFY
*/

const lastOrder=orders[0];



return(

<section className="bg-white min-h-screen">

<Navbar/>


<div className="max-w-6xl mx-auto px-6 py-14">


{/* HEADER */}

<div className="mb-10">

<h1 className="text-4xl font-heading text-[#0F2A44]">

Your Orders

</h1>

<p className="text-neutral-500 mt-2">

Track purchases & delivery updates from Hans Jewellers Shimla

</p>

</div>



{/* LAST ORDER CARD */}

<div className="bg-[#FAF8F3] rounded-2xl p-6 shadow-soft mb-12">

<div className="flex justify-between items-center flex-wrap gap-4">

<div>

<p className="text-sm text-neutral-500">

Latest Order

</p>

<h3 className="font-heading text-xl text-[#0F2A44]">

Order #{lastOrder.trackingId}

</h3>

</div>


<OrderStatusBadge status={lastOrder.orderStatus}/>


</div>


<div className="mt-4 text-sm text-neutral-600">

Placed on:

{new Date(lastOrder.createdAt).toLocaleString()}

</div>


<button

onClick={()=>
router.push(`/track-order/${lastOrder.trackingId}`)
}

className="mt-6 px-6 py-2 rounded-full bg-[#0F2A44] text-white"

>

Track Latest Order

</button>


</div>



{/* ORDER HISTORY */}

<h2 className="text-2xl font-heading text-[#0F2A44] mb-6">

Order History

</h2>


<div className="space-y-6">


{orders.map(order=>(

<div

key={order._id}

className="bg-white border border-neutral-200 rounded-2xl shadow-soft p-6 flex flex-col md:flex-row md:justify-between gap-6"

>


{/* LEFT */}

<div>

<h3 className="font-semibold text-lg text-[#0F2A44]">

Order #{order.trackingId}

</h3>


<p className="text-sm text-neutral-500">

{new Date(order.createdAt).toLocaleString()}

</p>


<div className="mt-3 text-sm text-neutral-600">

{order.items.map(item=>(

<div key={item._id}>

{item.title} × {item.qty}

</div>

))}

</div>

</div>



{/* RIGHT */}

<div className="flex flex-col items-start md:items-end gap-3">


<div className="flex gap-2">

<OrderStatusBadge status={order.orderStatus}/>

<PaymentBadge status={order.paymentStatus}/>

</div>


<p className="font-semibold text-[#0F2A44]">

₹ {order.totalAmount}

</p>


<button

onClick={()=>
router.push(`/track-order/${order.trackingId}`)
}

className="text-sm px-5 py-2 rounded-full border border-[#0F2A44] text-[#0F2A44] hover:bg-[#0F2A44] hover:text-white transition"

>

Track Order

</button>


</div>


</div>

))}


</div>



{/* SUPPORT */}

<div className="mt-14 bg-[#FAF8F3] rounded-2xl shadow-soft p-8 text-center">

<h2 className="text-lg font-heading text-[#0F2A44] mb-2">

Need Help With Delivery?

</h2>


<p className="text-neutral-500">

Contact our showroom anytime for assistance

</p>


<a

href="tel:9625970888"

className="inline-block mt-4 px-6 py-3 rounded-full bg-[#0F2A44] text-white"

>

Call Support

</a>


</div>



</div>

</section>

);

}



/*
ORDER STATUS BADGE
*/

function OrderStatusBadge({status}){

if(status==="delivered")

return(

<span className="px-3 py-1 text-xs bg-green-100 text-green-700 rounded-full">

Delivered

</span>

);

if(status==="packed")

return(

<span className="px-3 py-1 text-xs bg-yellow-100 text-yellow-700 rounded-full">

Packed

</span>

);

if(status==="confirmed")

return(

<span className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded-full">

Confirmed

</span>

);

return(

<span className="px-3 py-1 text-xs bg-[#0F2A44]/10 text-[#0F2A44] rounded-full">

Placed

</span>

);

}



/*
PAYMENT BADGE
*/

function PaymentBadge({status}){

if(status==="paid")

return(

<span className="px-3 py-1 text-xs bg-green-100 text-green-700 rounded-full">

<span className="text-black">Payemnt : </span>Paid

</span>

);

if(status==="cod")

return(

<span className="px-3 py-1 text-xs bg-[#D4AF37]/20 text-[#D4AF37] rounded-full">

Payment : COD

</span>

);

return(

<span className="px-3 py-1 text-xs bg-neutral-200 text-neutral-600 rounded-full">

Payemnt : Pending

</span>

);

}