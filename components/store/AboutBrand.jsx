"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function AboutBrand(){

return(

<section className="bg-white">

<div className="max-w-7xl mx-auto px-6 py-28">


{/* HEADER */}

<div className="text-center mb-20">

<p className="text-[#D4AF37] uppercase tracking-[3px] text-xs">

Our Story

</p>

<h2 className="text-4xl font-heading text-[#0F2A44] mt-3">

About Hans Jewellers

</h2>


<p className="text-neutral-500 mt-4 max-w-2xl mx-auto">

Located at the heart of Mall Road Shimla, Hans Jewellers has
earned customer trust through hallmarked purity, elegant
designs and personalised jewellery service for years.

</p>

</div>



{/* MAIN GRID */}

<div className="grid md:grid-cols-2 gap-14 items-center">


{/* LEFT IMAGE BLOCK */}

<motion.div
initial={{opacity:0,x:-40}}
whileInView={{opacity:1,x:0}}
transition={{duration:.8}}
viewport={{once:true}}
className="relative"
>

<img
src="/storefront.jpg"
className="rounded-2xl shadow-soft"
/>


{/* GOLD LIGHT GLOW */}

<div className="absolute -bottom-10 -right-10 w-[200px] h-[200px] bg-[#D4AF37]/20 blur-[120px] rounded-full"/>

</motion.div>



{/* RIGHT CONTENT */}

<motion.div
initial={{opacity:0,x:40}}
whileInView={{opacity:1,x:0}}
transition={{duration:.8}}
viewport={{once:true}}
>

<h3 className="text-2xl font-heading text-[#0F2A44]">

A Trusted Jewellery Destination in Shimla

</h3>


<p className="text-neutral-600 mt-5 leading-relaxed">

Hans Jewellers proudly serves customers from our showroom
located at 94, The Mall Road Shimla. Known for authentic
hallmarked gold jewellery and transparent pricing, we focus
on delivering both elegance and long-term customer trust.

</p>


<p className="text-neutral-600 mt-5 leading-relaxed">

Whether you're selecting jewellery for weddings, special
celebrations or everyday elegance, our team ensures a
comfortable and reliable purchase experience.

</p>



{/* FEATURE POINTS */}

<div className="mt-7 space-y-2 text-[#0F2A44] font-medium">

<p>✔ Hallmarked Gold Jewellery</p>

<p>✔ Custom Jewellery Orders Available</p>

<p>✔ Trusted Mall Road Showroom</p>

<p>✔ Friendly In-Store Assistance</p>

</div>



{/* CTA BUTTONS */}

<div className="flex flex-wrap gap-4 mt-8">

<a
href="https://wa.me/918219174058?text=Hello%20Hans%20Jewellers%20Shimla,%20I%20would%20like%20to%20visit%20your%20showroom%20and%20explore%20your%20jewellery%20collection.%20Please%20guide%20me%20with%20store%20timings%20and%20available%20designs."
target="_blank"
className="px-7 py-3 bg-[#0F2A44] text-white rounded-full shadow-xl hover:scale-[1.05] transition"
>

Chat on WhatsApp

</a>


<Link
href="/products"
className="px-7 py-3 border border-[#0F2A44] text-[#0F2A44] rounded-full hover:bg-[#0F2A44] hover:text-white transition"
>

Explore Collection

</Link>

</div>


</motion.div>

</div>



{/* LEGACY STRIP */}

<div className="mt-24 bg-[#FAF8F3] rounded-2xl shadow-soft px-10 py-12 text-center">

<h3 className="text-xl font-heading text-[#0F2A44]">

A Jewellery Purchase is a Moment of Trust

</h3>

<p className="text-neutral-600 mt-3 max-w-3xl mx-auto">

At Hans Jewellers, every purchase is treated with care and
respect. Our goal is not just to sell jewellery but to build
lasting relationships with customers who trust us for their
most special occasions.

</p>

</div>



</div>

</section>

);

}