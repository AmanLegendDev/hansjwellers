"use client";

import { useCartStore } from "@/store/cartStore";
import { useState } from "react";
import Script from "next/script";

export default function CheckoutPage(){

const cart = useCartStore(state=>state.cart);

const subtotal = cart.reduce(
(acc,item)=>acc+item.price*item.qty,
0
);

const formatPrice = (price) => {
return new Intl.NumberFormat("en-IN").format(price);
};          

const [form,setForm]=useState({
name:"",
phone:"",
address:"",
note:""
});

const [confirmPopup,setConfirmPopup]=useState(false);
const [selectedMethod,setSelectedMethod]=useState(null);


/*
FORM CHANGE
*/

const handleChange=(e)=>{

setForm({
...form,
[e.target.name]:e.target.value
});

};


/*
VALIDATION
*/

const validateForm=()=>{

if(!form.name||!form.phone||!form.address){

alert("Please fill required fields");

return false;

}

return true;

};


/*
OPEN CONFIRMATION
*/

const openConfirmation=(method)=>{

if(!validateForm()) return;

setSelectedMethod(method);

setConfirmPopup(true);

};


/*
ONLINE PAYMENT
*/

const handleOnlinePayment=async()=>{

setConfirmPopup(false);

/*
CREATE RAZORPAY ORDER
*/

const paymentOrder=await fetch(
"/api/payment/create-order",
{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
amount:subtotal
})
}
);

const razorpayOrder=
await paymentOrder.json();


const options={

key:process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,

amount:razorpayOrder.amount,

currency:"INR",

name:"Hans Jewellers Shimla",

description:"Jewelry Purchase",

order_id:razorpayOrder.id,


handler:async function(){

/*
CREATE ORDER IN DB
*/

const res=await fetch(
"/api/orders/create",
{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({

customerName:form.name,
phone:form.phone,
address:form.address,
note:form.note,

items:cart,
totalAmount:subtotal,

paymentStatus:"paid",
paymentMethod:"online",
orderStatus:"placed"

})
}
);

const data=await res.json();


/*
SAVE ORDER LOCALLY FOR SUCCESS PAGE
*/

localStorage.setItem(
"lastOrder",
JSON.stringify({

customerName:form.name,
phone:form.phone,
address:form.address,

items:cart,

totalAmount:subtotal,

paymentMethod:"online",
paymentStatus:"paid",
orderStatus:"placed",

trackingId:data.trackingId

})
);

window.location.href="/order-success";

}

};


const rzp=new window.Razorpay(options);

rzp.open();

};


/*
COD ORDER
*/

const handleCOD=async()=>{

setConfirmPopup(false);

const res=await fetch(
"/api/orders/create",
{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({

customerName:form.name,
phone:form.phone,
address:form.address,
note:form.note,

items:cart,
totalAmount:subtotal,

paymentStatus:"cod",
paymentMethod:"cod",
orderStatus:"placed"

})
}
);

const data=await res.json();


/*
SAVE ORDER FOR SUCCESS PAGE
*/

localStorage.setItem(
"lastOrder",
JSON.stringify({

customerName:form.name,
phone:form.phone,
address:form.address,

items:cart,

totalAmount:subtotal,

paymentMethod:"cod",
paymentStatus:"cod",
orderStatus:"placed",

trackingId:data.trackingId

})
);

window.location.href="/order-success";

};


/*
WHATSAPP ORDER
*/

const handleWhatsApp=()=>{

setConfirmPopup(false);

const message=`

New Jewelry Order Request

Name: ${form.name}

Phone: ${form.phone}

Address: ${form.address}

Items:

${cart.map(
item=>`${item.title} x ${item.qty}`
).join("\n")}

Total: ₹${subtotal}

`;

window.open(
`https://wa.me/918219174058?text=${encodeURIComponent(message)}`
);

};


return(

<>

<Script src="https://checkout.razorpay.com/v1/checkout.js"/>


<section className="bg-white min-h-screen">


<div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12">


{/* FORM */}

<div className="bg-[#FAF8F3] rounded-2xl p-8 shadow-soft">

<h2 className="text-2xl font-heading text-[#0F2A44] mb-6">

Customer Details

</h2>


<input
name="name"
placeholder="Full Name"
className="border rounded-lg p-3 w-full mb-4"
onChange={handleChange}
/>


<input
name="phone"
placeholder="Phone Number"
className="border rounded-lg p-3 w-full mb-4"
onChange={handleChange}
/>


<textarea
name="address"
placeholder="Full Address"
className="border rounded-lg p-3 w-full mb-4"
onChange={handleChange}
/>


<textarea
name="note"
placeholder="Order Note (optional)"
className="border rounded-lg p-3 w-full"
onChange={handleChange}
/>

</div>


{/* SUMMARY */}

<div className="bg-white rounded-2xl shadow-soft p-8">

<h2 className="text-2xl font-heading text-[#0F2A44] mb-6">

Order Summary

</h2>


{cart.map(item=>(

<div
key={item._id}
className="flex justify-between mb-3 text-sm"
>

<span>

{item.title} × {item.qty}

</span>

<span>


₹ {formatPrice(item.price*item.qty)}
</span>

</div>

))}


<hr className="my-4"/>


<div className="flex justify-between text-lg font-semibold">

<span>Total</span>

<span className="text-[#D4AF37]">

₹ {formatPrice(subtotal)}

</span>

</div>


<button
onClick={()=>openConfirmation("online")}
className="mt-6 w-full bg-[#0F2A44] text-white py-3 rounded-full"
>

Pay Securely Online

</button>


<button
onClick={()=>openConfirmation("cod")}
className="mt-4 w-full border border-[#0F2A44] text-[#0F2A44] py-3 rounded-full"
>

Cash on Delivery

</button>


<button
onClick={()=>openConfirmation("whatsapp")}
className="mt-4 w-full bg-green-500 text-white py-3 rounded-full"
>

Order via WhatsApp

</button>


</div>

</div>


{/* CONFIRM POPUP */}

{confirmPopup&&(

<div className="fixed inset-0 bg-black/40 flex items-center justify-center">

<div className="bg-white rounded-2xl p-8 w-[320px] text-center">

<h3 className="text-xl font-heading text-[#0F2A44]">

Confirm Order

</h3>

<p className="text-sm mt-2 text-neutral-500">

Proceed with selected payment method?

</p>


<button

onClick={

selectedMethod==="online"
?handleOnlinePayment

:selectedMethod==="cod"
?handleCOD

:handleWhatsApp

}

className="mt-6 w-full bg-[#0F2A44] text-white py-2 rounded-full"

>

Confirm

</button>


<button

onClick={()=>setConfirmPopup(false)}

className="mt-3 text-sm text-neutral-500"

>

Cancel

</button>

</div>

</div>

)}

</section>

</>

);

}