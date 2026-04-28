"use client";

import Link from "next/link";
import { useEffect,useState } from "react";
import { useCartStore } from "@/store/cartStore";

export default function SuccessPage(){

const [order,setOrder]=useState(null);
const formatPrice = (price) => {
return new Intl.NumberFormat("en-IN").format(price);
};  

const resetCart =
useCartStore(state=>state.resetCart);

useEffect(()=>{

const storedOrder=
localStorage.getItem("lastOrder");

if(storedOrder){

setOrder(JSON.parse(storedOrder));

resetCart();

}

},[]);

if(!order)

return(

<p className="text-center py-24 text-[#0F2A44]">

Preparing your confirmation...

</p>

);

return(

<section className="bg-white min-h-screen">

<div className="max-w-4xl mx-auto px-6 py-20">

{/* HEADER */}

<div className="text-center">

<div className="w-20 h-20 mx-auto rounded-full bg-[#D4AF37]/10 flex items-center justify-center text-4xl">

✓

</div>

<h1 className="text-4xl font-heading text-[#0F2A44] mt-6">

Order Confirmed

</h1>

<p className="text-neutral-500 mt-2">

Thank you <span className="font-medium">

{order.customerName}

</span>,

your jewelry order has been successfully placed.

</p>

</div>

{/* SUMMARY CARD */}

<div className="bg-[#FAF8F3] rounded-2xl mt-12 p-8 shadow-soft">

<h2 className="text-xl font-heading text-[#0F2A44] mb-6">

Order Summary

</h2>

{order.items.map((item,i)=>(

<div
key={i}
className="flex justify-between py-2 border-b text-sm"
>

<span>

{item.title} × {item.qty}

</span>

<span>
₹ {formatPrice(item.price*item.qty)}


</span>

</div>

))}

<div className="flex justify-between mt-6 text-lg font-semibold text-[#0F2A44]">

<span>Total Amount</span>

<span className="text-[#D4AF37]">

₹ {formatPrice(order.totalAmount)}

</span>

</div>

</div>

{/* PAYMENT STATUS */}

<div className="bg-white rounded-2xl shadow-soft mt-10 p-8 space-y-4">

<div className="flex justify-between">

<span>Payment Method</span>

<span className="font-medium">

{order.paymentMethod}

</span>

</div>

<div className="flex justify-between">

<span>Payment Status</span>

<span className={

order.paymentStatus==="paid"

? "text-green-600 font-medium"

: order.paymentStatus==="cod"

? "text-blue-600 font-medium"

: "text-yellow-600 font-medium"

}>

{order.paymentStatus}

</span>

</div>

<div className="flex justify-between">

<span>Order Status</span>

<span className="text-[#0F2A44] font-medium">

{order.orderStatus}

</span>

</div>

</div>

{/* DELIVERY INFO */}

<div className="bg-white shadow-soft rounded-2xl mt-10 p-8">

<h2 className="text-lg font-heading text-[#0F2A44] mb-2">

Estimated Delivery

</h2>

<p>

Your order will be processed within 24 hours

and delivered within

<span className="font-medium">

2–5 working days

</span>

</p>

<p className="mt-2 text-neutral-500 text-sm">

Our team may contact you before dispatch confirmation.

</p>

</div>

{/* SUPPORT CARD */}

<div className="bg-[#FAF8F3] shadow-soft rounded-2xl mt-10 p-8 flex flex-col sm:flex-row justify-between items-center gap-4">

<div>

<h3 className="font-heading text-[#0F2A44]">

Need Help With Your Order?

</h3>

<p className="text-sm text-neutral-500">

Our support team is ready to assist you

</p>

</div>

<div className="flex gap-4">

<a

href="tel:8219174058"

className="px-6 py-2 rounded-full border border-[#0F2A44] text-[#0F2A44]"

>

Call Support

</a>

<a

href="https://wa.me/918219174058"

target="_blank"

className="px-6 py-2 rounded-full bg-[#0F2A44] text-white"

>

WhatsApp Support

</a>

</div>

</div>

{/* CTA */}

<div className="flex flex-wrap gap-4 mt-12 justify-center">

<Link

href="/products"

className="px-8 py-3 rounded-full bg-[#0F2A44] text-white"

>

Continue Shopping

</Link>

<Link
href={`/track-order/${order.trackingId}`}
className="px-8 py-3 rounded-full border border-[#0F2A44] text-[#0F2A44]"
>
Track Your Order
</Link>

</div>

<p className="text-center text-neutral-400 mt-12 text-sm">

Thank you for choosing Hans Jewellers Shimla

</p>

</div>

</section>

);

}
