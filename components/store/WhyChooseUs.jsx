"use client";

import { motion } from "framer-motion";

export default function WhyChooseHans(){

return(

<section className="bg-[#FAF8F3]">

<div className="max-w-7xl mx-auto px-6 py-24">


{/* HEADER */}

<div className="text-center mb-16">

<p className="text-[#D4AF37] uppercase tracking-[3px] text-xs">

Why Choose Us

</p>

<h2 className="text-4xl font-heading text-[#0F2A44] mt-3">

Why Choose Hans Jewellers

</h2>

<p className="text-neutral-500 mt-4 max-w-xl mx-auto">

Trusted jewellery showroom at The Mall Road Shimla delivering
hallmarked purity, craftsmanship and personalized service.

</p>

</div>



{/* TRUST GRID */}

<div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8 text-center">

{[
"Hallmarked Gold Jewellery",
"Trusted Mall Road Showroom",
"Custom Jewellery Orders Available",
"Direct WhatsApp Assistance"
].map((item,index)=>(

<motion.div
key={item}
initial={{opacity:0,y:20}}
whileInView={{opacity:1,y:0}}
transition={{delay:index*.12}}
viewport={{once:true}}
className="bg-white rounded-2xl shadow-soft px-6 py-8"
>

<div className="text-3xl text-[#D4AF37]">
✔
</div>

<p className="mt-4 font-medium text-[#0F2A44]">
{item}
</p>

</motion.div>

))}

</div>



{/* SHOWROOM BLOCK */}

<div className="mt-24 grid md:grid-cols-2 gap-12 items-center">


{/* LEFT */}

<div>

<h3 className="text-2xl font-heading text-[#0F2A44]">

Visit Our Store

</h3>

<p className="text-neutral-600 mt-4 leading-relaxed">

Located at the heart of Shimla's Mall Road, Hans Jewellers
offers authentic gold jewellery, transparent pricing and
long-term customer trust built over years.

</p>

<div className="mt-6 space-y-2 text-[#0F2A44] font-medium">

<p>📍 94, The Mall Road, Shimla</p>

<p>📞 98056-11112</p>

<p>📞 96259-70888</p>

</div>


<a
href="https://wa.me/918219174058"
target="_blank"
className="inline-block mt-6 px-7 py-3 bg-[#0F2A44] text-white rounded-full shadow-xl hover:scale-[1.05] transition"
>

Chat on WhatsApp

</a>

</div>



{/* MAP */}

<div className="rounded-2xl overflow-hidden shadow-soft">

<iframe
src="https://maps.google.com/maps?q=94%20The%20Mall%20Shimla&t=&z=15&ie=UTF8&iwloc=&output=embed"
width="100%"
height="340"
loading="lazy"
className="border-0"
/>

</div>


</div>


</div>

</section>

);

}