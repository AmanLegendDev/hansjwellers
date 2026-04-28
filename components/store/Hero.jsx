"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const heroImages = [
  "/hero-bangles.jpg",
  "/hero-bridal.jpg",
  "/hero-necklace.jpg",
];

// sparkle fixed positions (no Math.random)
const sparklePositions = [
  { top: "15%", left: "10%" },
  { top: "30%", left: "80%" },
  { top: "55%", left: "20%" },
  { top: "70%", left: "75%" },
  { top: "25%", left: "50%" },
  { top: "60%", left: "40%" },
  { top: "45%", left: "90%" },
  { top: "80%", left: "15%" },
];

export default function Hero() {

  const [index, setIndex] = useState(0);

  /*
  AUTO ROTATE HERO BACKGROUND
  */

  useEffect(() => {

    const interval = setInterval(() => {

      setIndex(prev =>
        (prev + 1) % heroImages.length
      );

    }, 4000);

    return () => clearInterval(interval);

  }, []);


  return (

<section className="relative h-[88vh] min-h-[620px] flex items-center justify-center overflow-hidden">

{/* BACKGROUND ROTATING IMAGE */}

<img
src={heroImages[index]}
loading="eager"
className="absolute inset-0 w-full h-full object-cover transition-opacity duration-[1500ms]"
/>


{/* DARK OVERLAY */}

<div className="absolute inset-0 bg-[#0F2A44]/70"/>


{/* GOLD LIGHT GLOW */}

<div className="absolute -top-20 -left-20 w-[400px] h-[400px] bg-[#D4AF37]/20 blur-[140px] rounded-full"/>


{/* FLOATING SPARKLES */}

<div className="absolute inset-0 pointer-events-none">

{sparklePositions.map((pos,i)=>(

<motion.div
key={i}
initial={{opacity:0,y:20}}
animate={{
opacity:[0,.8,0],
y:[0,-40]
}}
transition={{
duration:4,
delay:i*.8,
repeat:Infinity
}}
className="absolute w-1 h-1 bg-[#D4AF37] rounded-full"
style={pos}
/>

))}

</div>



<div className="relative z-10 max-w-7xl mx-auto px-6 text-center md:text-left">


{/* TEXT CONTENT */}

<motion.div

initial={{opacity:0,y:40}}

animate={{opacity:1,y:0}}

transition={{duration:.8}}

>


<p className="text-[#D4AF37] tracking-[3px] uppercase text-xs font-medium">

Hans Jewellers Shimla

</p>


<h1 className="mt-6 text-4xl md:text-6xl font-heading text-white leading-tight">

Timeless Jewelry

<span className="text-[#D4AF37]">

 Crafted For You

</span>

</h1>


<p className="mt-6 text-white/80 max-w-xl mx-auto md:mx-0 text-lg">

Explore handcrafted gold, silver & bridal collections designed with purity and elegance.

</p>



<div className="flex flex-wrap gap-4 mt-10 justify-center md:justify-start">


<Link
href="/products"
className="bg-[#D4AF37] text-white px-8 py-3 rounded-full shadow-xl hover:scale-[1.05] transition"
>

Explore Collection

</Link>


<a
href="https://wa.me/918219174058"
target="_blank"
className="border border-white text-white px-8 py-3 rounded-full hover:bg-white hover:text-[#0F2A44] transition"
>

WhatsApp Consultation

</a>


</div>


{/* TRUST STRIP */}

<div className="flex gap-6 mt-10 text-white/80 text-sm justify-center md:justify-start flex-wrap">

<span>✔ Hallmarked Gold</span>

<span>✔ Trusted Shimla Store</span>

<span>✔ Custom Jewelry Available</span>

</div>


</motion.div>


{/* SCROLL DOWN ARROW */}

<motion.div

animate={{y:[0,12,0]}}

transition={{repeat:Infinity,duration:1.5}}

className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white text-sm"

>

↓

</motion.div>


</div>


</section>

  );

}