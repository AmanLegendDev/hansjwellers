"use client";

import Link from "next/link";
import { useState } from "react";
import {
Menu,
X,
ShoppingCart,
ClipboardList,
Search,
Phone
} from "lucide-react";

import {
motion,
AnimatePresence
} from "framer-motion";

import {
useCartStore
} from "@/store/cartStore";


export default function Navbar(){

const [open,setOpen]=useState(false);

const cart = useCartStore(
state=>state.cart
);

const totalItems = cart.reduce(
(acc,item)=>acc+item.qty,
0
);


return(

<nav className="sticky top-0 z-50 backdrop-blur-lg bg-white/80 border-b border-neutral-200 shadow-sm">

<div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">


{/* LOGO */}

<Link
href="/"
className="flex items-center gap-3"
>

<img
src="/logo.png"
className="h-9"
/>

<div className="leading-tight">

<p className="text-[#0F2A44] font-heading text-lg tracking-wide">

HANS JWELLERS

</p>

<p className="text-[11px] text-[#D4AF37] tracking-widest">

SHIMLA

</p>

</div>

</Link>



{/* DESKTOP MENU */}

<div className="hidden md:flex items-center gap-8 text-sm font-medium">


<Link
href="/products"
className="hover:text-[#D4AF37] transition flex items-center gap-1"
>

<Search size={17}/>

Explore

</Link>


<Link
href="/orders"
className="hover:text-[#D4AF37] transition flex items-center gap-1"
>

<ClipboardList size={17}/>

Orders

</Link>


<a
href="https://wa.me/918219174058"
target="_blank"
className="flex items-center gap-1 px-4 py-2 rounded-full border border-[#0F2A44] text-[#0F2A44] hover:bg-[#0F2A44] hover:text-white transition"
>

<Phone size={16}/>

Consult

</a>


<Link
href="/cart"
className="relative hover:text-[#D4AF37] transition"
>

<ShoppingCart size={20}/>

{totalItems>0&&(

<span className="absolute -top-2 -right-2 bg-[#D4AF37] text-white text-xs px-1.5 rounded-full">

{totalItems}

</span>

)}

</Link>


</div>



{/* MOBILE BUTTON */}

<button
onClick={()=>setOpen(!open)}
className="md:hidden"
>

{open?<X size={24}/>:<Menu size={24}/>}

</button>

</div>



{/* MOBILE MENU */}

<AnimatePresence>

{open&&(

<motion.div

initial={{opacity:0,y:-20}}

animate={{opacity:1,y:0}}

exit={{opacity:0,y:-20}}

transition={{duration:.2}}

className="md:hidden bg-white border-t"

>

<div className="flex flex-col px-6 py-6 gap-5 text-sm font-medium">


<Link
href="/products"
onClick={()=>setOpen(false)}
className="flex items-center gap-2"
>

<Search size={18}/>

Explore Collection

</Link>


<Link
href="/orders"
onClick={()=>setOpen(false)}
className="flex items-center gap-2"
>

<ClipboardList size={18}/>

Track Orders

</Link>


<Link
href="/cart"
onClick={()=>setOpen(false)}
className="flex items-center gap-2"
>

<ShoppingCart size={18}/>

Cart

{totalItems>0&&(

<span className="bg-[#D4AF37] text-white text-xs px-2 rounded-full">

{totalItems}

</span>

)}

</Link>


<a
href="https://wa.me/918219174058"
target="_blank"
className="flex items-center justify-center gap-2 bg-[#0F2A44] text-white py-3 rounded-full"
>

Consult on WhatsApp

</a>


</div>

</motion.div>

)}

</AnimatePresence>

</nav>

);

}