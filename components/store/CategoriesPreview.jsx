"use client";

import { useEffect,useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function CategoriesPreview(){

const[categories,setCategories]=useState([]);

useEffect(()=>{

fetch("/api/categories/dropdown")
.then(res=>res.json())
.then(setCategories);

},[]);

if(!categories.length)return null;

return(

<section className="bg-[#FAF8F3]">

<div className="max-w-7xl mx-auto px-5 md:px-6 py-20 md:py-24">


{/* HEADER */}

<div className="text-center mb-12 md:mb-16">

<p className="text-[#D4AF37] uppercase tracking-[3px] text-xs">

Browse Collection

</p>

<h2 className="text-3xl md:text-4xl font-heading text-[#0F2A44] mt-2">

Shop By Category

</h2>

</div>



{/* CATEGORY GRID */}

<div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">


{categories.map((cat,index)=>(

<Link
key={cat._id}
href={`/products?category=${cat._id}`}
className={`

relative overflow-hidden rounded-2xl group shadow-soft

${index===0
? "col-span-2 md:row-span-2 h-[260px] md:h-[420px]"
: "h-[140px] md:h-[200px]"}

`}
>


{/* IMAGE */}

<img
src={cat.image}
className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition duration-700"
/>


{/* OVERLAY */}

<div className="absolute inset-0 bg-[#0F2A44]/40 group-hover:bg-[#0F2A44]/55 transition"/>


{/* GOLD LIGHT */}

<div className="absolute -bottom-8 -right-8 w-[120px] h-[120px] bg-[#D4AF37]/25 blur-[70px] rounded-full"/>


{/* TEXT */}

<div className="absolute inset-0 flex items-center justify-center">

<h3 className="text-white text-lg md:text-2xl font-heading tracking-wide">

{cat.name}

</h3>

</div>


{/* BORDER EFFECT */}

<div className="absolute inset-0 border border-white/10 opacity-0 group-hover:opacity-100 transition"/>


</Link>

))}

</div>



{/* CTA */}

<div className="text-center mt-14">

<Link
href="/products"
className="px-10 py-3 bg-[#0F2A44] text-white rounded-full shadow-xl hover:scale-[1.05] transition"
>

Explore Full Collection

</Link>

</div>


</div>

</section>

);

}