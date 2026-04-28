"use client";

export const dynamic = "force-dynamic";

import { useEffect,useState } from "react";
import { useParams } from "next/navigation";
import { useCartStore } from "@/store/cartStore";
import Navbar from "@/components/layout/Navbar";
import ProductCard from "@/components/store/ProductCard";

export default function ProductPage(){

const { slug } = useParams();

const formatPrice = (price) => {
return new Intl.NumberFormat("en-IN").format(price);
};

const addToCart =
useCartStore(state=>state.addToCart);

const [product,setProduct]=useState(null);

const [selectedImage,setSelectedImage]=
useState(null);

const [relatedProducts,setRelatedProducts]=
useState([]);

const [showPopup,setShowPopup]=
useState(false);


/*
LOAD PRODUCT
*/

useEffect(()=>{

fetch(`/api/store/product/${slug}`,{
cache:"no-store"
})

.then(res=>res.json())

.then(data=>{

setProduct(data);

setSelectedImage(
data.images?.[0]
);

});

},[slug]);


/*
LOAD RELATED PRODUCTS
*/

useEffect(()=>{

if(!product?.category?._id)return;

fetch("/api/store/product")

.then(res=>res.json())

.then(data=>{

const filtered=data.filter(p=>

p.category?._id===

product.category._id

&&

p.slug!==product.slug

);

setRelatedProducts(filtered);

});

},[product]);


/*
ADD TO CART
*/

const handleAddToCart=()=>{

addToCart(product);

setShowPopup(true);

const handleAddToCart = () => {

addToCart(product);

setShowPopup(true);

};

};

function SpecRow({ label, value }) {

return (

<div className="flex justify-between items-center border-b border-neutral-200 pb-2">

<span className="text-neutral-500">

{label}

</span>

<span className="text-[#0F2A44] font-medium">

{value}

</span>

</div>

);

}


if(!product)

return(

<p className="text-center py-20">

Loading product...

</p>

);


return(

<section className="bg-white min-h-screen">

<Navbar/>


<div className="max-w-6xl mx-auto px-6 py-16">


{/* TOP GRID */}

<div className="grid md:grid-cols-2 gap-16">


{/* IMAGE SECTION */}

<div>


<img

src={selectedImage ||

"/placeholder.png"}

className="rounded-xl shadow-soft w-full object-cover"

/>


{/* THUMBNAILS */}

<div className="flex gap-3 mt-4 flex-wrap">

{product.images?.map((img,i)=>(

<img

key={i}

src={img}

onClick={()=>setSelectedImage(img)}

className={`

w-16 h-16 rounded-lg

cursor-pointer object-cover border

${selectedImage===img

?

"border-[#D4AF37]"

:

"border-neutral-200"}

`}

/>

))}

</div>

</div>


{/* RIGHT SIDE */}

<div>


<h1

className="text-4xl

font-heading

text-[#0F2A44]"

>

{product.title}

</h1>


<p

className="text-[#D4AF37]

text-3xl

mt-4

font-semibold"

>

₹ {formatPrice(product.price)}

</p>


{/* TRUST STRIP */}

<div

className="mt-4

text-sm

text-neutral-500

space-y-1"

>

<p>✔ Hallmarked Jewelry</p>

<p>✔ Secure Store Purchase</p>

<p>✔ WhatsApp Support Available</p>

</div>


{/* JEWELRY DETAILS */}

<div className="mt-10">

<h2 className="text-xl font-heading text-[#0F2A44] mb-4">

Jewelry Details

</h2>

<div className="bg-[#fafafa] rounded-2xl p-5 sm:p-6 grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 text-sm">

{product.weight && (
<SpecRow label="Weight" value={product.weight} />
)}

{product.purity && (
<SpecRow label="Purity" value={product.purity} />
)}

{product.material && (
<SpecRow label="Material" value={product.material} />
)}

{product.stoneType && (
<SpecRow label="Stone Type" value={product.stoneType} />
)}

{product.makingCharges && (
<SpecRow label="Making Charges" value={product.makingCharges} />
)}

{product.deliveryTime && (
<SpecRow label="Delivery Time" value={product.deliveryTime} />
)}

{product.customizable !== undefined && (
<SpecRow
label="Customization"
value={product.customizable ? "Available" : "Not Available"}
/>
)}

</div>

</div>

{/* BUTTONS */}

<div

className="flex gap-4 mt-8"

>

<button

onClick={handleAddToCart}

className="bg-[#0F2A44]

text-white

px-6

py-3

rounded-lg"

>

Add to Cart

</button>


<a

href={`https://wa.me/918219174058?text=Hi I want to enquire about ${product.title}`}

target="_blank"

className="border

border-[#0F2A44]

text-[#0F2A44]

px-6

py-3

rounded-lg"

>

WhatsApp Enquiry

</a>

</div>


</div>

</div>


{/* DESCRIPTION */}

{product.description&&(

<div

className="mt-16

bg-white

rounded-xl

shadow-soft

p-8"

>

<h2

className="text-2xl

font-heading

text-[#0F2A44]

mb-4"

>

Product Description

</h2>

<p>

{product.description}

</p>

</div>

)}


{/* RELATED PRODUCTS */}

{relatedProducts.length>0&&(

<div className="mt-20">


<h2

className="text-2xl

font-heading

text-[#0F2A44]

mb-8"

>

Related Jewelry

</h2>


<div

className="grid

grid-cols-2

md:grid-cols-3

lg:grid-cols-4

gap-6"

>

{relatedProducts.map(product=>(

<ProductCard

key={product._id}

product={product}

/>

))}

</div>

</div>

)}

</div>


{/* MOBILE CTA */}

<div

className="md:hidden

fixed bottom-0

left-0

w-full

bg-white

border-t

shadow-soft

p-4

flex gap-3"

>

<button

onClick={handleAddToCart}

className="flex-1

bg-[#0F2A44]

text-white

py-3

rounded-lg"

>

Add to Cart

</button>


<a

href={`https://wa.me/918219174058?text=Hi I want to enquire about ${product.title}`}

target="_blank"

className="flex-1

border

border-[#0F2A44]

text-[#0F2A44]

py-3

rounded-lg

text-center"

>

WhatsApp

</a>

</div>


{/* POPUP */}


{showPopup && (

<div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-4">

<div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-8 text-center relative">


{/* ICON */}

<div className="w-16 h-16 mx-auto rounded-full bg-[#D4AF37]/10 flex items-center justify-center text-3xl">

✔

</div>


{/* TITLE */}

<h3 className="text-2xl font-heading text-[#0F2A44] mt-5">

Added to Cart

</h3>


{/* MESSAGE */}

<p className="text-neutral-500 mt-2">

{product.title} has been added to your cart successfully

</p>


{/* BUTTONS */}

<div className="flex gap-4 mt-8 flex-col sm:flex-row">

<a
href="/cart"
className="flex-1 bg-[#0F2A44] text-white py-3 rounded-full hover:scale-[1.03] transition"
>

View Cart

</a>


<button
onClick={()=>setShowPopup(false)}
className="flex-1 border border-[#0F2A44] text-[#0F2A44] py-3 rounded-full hover:bg-[#0F2A44] hover:text-white transition"
>

Continue Shopping

</button>

</div>


{/* CLOSE BUTTON */}

<button
onClick={()=>setShowPopup(false)}
className="absolute top-4 right-5 text-neutral-400 hover:text-black"
>

✕

</button>


</div>

</div>

)}

</section>

);

}
