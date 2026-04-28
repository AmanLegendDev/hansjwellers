"use client";

import { useCartStore } from "@/store/cartStore";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import { Trash2 } from "lucide-react";

export default function CartPage() {

const cart = useCartStore(state => state.cart);
const formatPrice = (price) => {
return new Intl.NumberFormat("en-IN").format(price);
};

const addToCart = useCartStore(state => state.addToCart);

const removeItem = useCartStore(state => state.removeItem);

const decreaseQty = useCartStore(state => state.decreaseQty);

const subtotal = cart.reduce(
(acc, item) =>
acc + item.price * item.qty,
0
);

/*
EMPTY CART STATE
*/

if (cart.length === 0)
return (

<section className="bg-white min-h-screen">

<Navbar />

<div className="flex flex-col items-center justify-center py-32 text-center">

<h2 className="text-4xl font-heading text-[#0F2A44]">
Your Jewelry Cart is Empty
</h2>

<p className="text-neutral-500 mt-3 max-w-md">
Explore premium gold, silver & bridal collections from Hans Jewellers Shimla
</p>

<Link
href="/products"
className="mt-8 bg-[#0F2A44] text-white px-8 py-3 rounded-full shadow-md hover:shadow-lg transition"
>
Explore Collection
</Link>

</div>

</section>

);

/*
MAIN CART UI
*/

return (

<section className="bg-white min-h-screen">

<Navbar />

<div className="max-w-6xl mx-auto px-6 py-16">

<h1 className="text-4xl font-heading text-[#0F2A44] mb-12">
Your Selected Jewelry
</h1>

<div className="grid md:grid-cols-3 gap-10">

{/* LEFT SIDE */}

<div className="md:col-span-2 space-y-6">

{cart.map(item => (

<div
key={item._id}
className="flex gap-6 p-6 bg-[#FAF8F3] rounded-2xl hover:shadow-md transition"
>

{/* IMAGE */}

<img
src={
item.images?.find(Boolean)
|| "/logo.png"
}
className="w-28 h-28 object-contain bg-white rounded-xl p-2"
/>

{/* INFO */}

<div className="flex-1">

<h3 className="text-lg font-heading text-[#0F2A44]">
{item.title}
</h3>

<p className="text-[#D4AF37] font-semibold mt-1">
₹ {formatPrice(item.price)}
</p>

{/* META BADGES */}

<div className="flex flex-wrap gap-3 mt-2 text-xs text-neutral-500">

{item.weight && ( <span>⚖ {item.weight}</span>
)}

{item.purity && ( <span>✨ {item.purity}</span>
)}

{item.material && ( <span>💎 {item.material}</span>
)}

</div>

{/* QUANTITY */}

<div className="flex gap-3 mt-4 items-center">

<button
onClick={() =>
decreaseQty(item._id)
}
className="px-3 py-1 border rounded-lg hover:bg-white"

>

− </button>

<span className="font-medium">
{item.qty}
</span>

<button
onClick={() =>
addToCart(item)
}
className="px-3 py-1 border rounded-lg hover:bg-white"

>

*

</button>

</div>

</div>

{/* DELETE */}

<button
onClick={() =>
removeItem(item._id)
}
className="text-red-500 hover:scale-110 transition"

>

<Trash2 size={20} />
</button>

</div>

))}

</div>

{/* RIGHT SIDE SUMMARY */}

<div className="bg-[#FAF8F3] rounded-2xl p-8 sticky top-24 h-fit">

<h2 className="text-2xl font-heading text-[#0F2A44] mb-6">
Order Summary
</h2>

<div className="flex justify-between mb-3 text-neutral-600">
<span>Subtotal</span>
<span>₹ {formatPrice(subtotal)}</span>
</div>

<div className="flex justify-between mb-6 text-neutral-600">
<span>Shipping</span>
<span className="text-green-600">
Free
</span>
</div>

<hr />

<div className="flex justify-between text-lg font-semibold mt-6 text-[#0F2A44]">
<span>Total</span>
<span>₹ {formatPrice(subtotal)}</span>
</div>

<Link
href="/checkout"
className="mt-8 block text-center bg-[#0F2A44] text-white py-3 rounded-full hover:shadow-lg transition"
>
Proceed to Checkout
</Link>

<a
href={`https://wa.me/918219174058?text=Hi I want to order jewelry items worth ₹${subtotal}`}
target="_blank"
className="mt-4 block text-center border border-[#0F2A44] text-[#0F2A44] py-3 rounded-full hover:bg-[#0F2A44] hover:text-white transition"

>

Order via WhatsApp </a>

<Link
href="/products"
className="mt-4 block text-center text-[#D4AF37] hover:underline"
>
Continue Shopping
</Link>

</div>

</div>

</div>

</section>

);

}
