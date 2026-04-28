"use client";

import {
ShieldCheck,
Gem,
Truck,
MessageCircle
} from "lucide-react";

import { motion } from "framer-motion";

export default function TrustStrip(){

const features=[

{
title:"Hallmarked Gold",
desc:"Certified purity guarantee",
icon:<ShieldCheck size={26}/>
},

{
title:"Premium Craftsmanship",
desc:"Traditional & modern designs",
icon:<Gem size={26}/>
},

{
title:"Safe Delivery",
desc:"Secure packaging & tracking",
icon:<Truck size={26}/>
},

{
title:"WhatsApp Support",
desc:"Instant jewelry consultation",
icon:<MessageCircle size={26}/>
}

];

return(

<section className="bg-[#0F2A44] text-white">

<div className="max-w-7xl mx-auto px-6 py-14">


<div className="grid grid-cols-2 md:grid-cols-4 gap-10">


{features.map((item,index)=>(

<motion.div
key={index}
initial={{opacity:0,y:20}}
whileInView={{opacity:1,y:0}}
transition={{delay:index*.1}}
viewport={{once:true}}
className="text-center space-y-3"
>


<div className="w-12 h-12 mx-auto flex items-center justify-center rounded-full bg-[#D4AF37]/20">

{item.icon}

</div>


<h3 className="font-semibold text-sm">

{item.title}

</h3>


<p className="text-xs text-white/70">

{item.desc}

</p>


</motion.div>

))}


</div>

</div>

</section>

);

}