import ProductCard from "./ProductCard";
import { getFeaturedProducts } from "@/actions/productActions";
import Link from "next/link";

export default async function FeaturedProducts(){

const products = await getFeaturedProducts();

if(!products.length) return null;

return(

<section className="bg-white">

<div className="max-w-7xl mx-auto px-5 md:px-6 py-20">


{/* HEADER */}

<div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-14">


<div className="text-center md:text-left">

<p className="text-[#D4AF37] uppercase tracking-[3px] text-xs">

Our Picks

</p>

<h2 className="text-3xl md:text-4xl font-heading text-[#0F2A44] mt-2">

Featured Jewelry

</h2>

</div>


<Link
href="/products"
className="border border-[#0F2A44] text-[#0F2A44] px-6 py-2 rounded-full hover:bg-[#0F2A44] hover:text-white transition"
>

View All Products

</Link>


</div>



{/* PRODUCT GRID */}

<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-7">


{products.map(product=>(

<div
key={product._id}
className="group relative rounded-2xl overflow-hidden"
>


{/* FEATURED BADGE */}

<div className="absolute top-3 left-3 z-20 bg-white text-[#0F2A44] text-xs px-3 py-1 rounded-full shadow-soft">

Featured

</div>



{/* GOLD HOVER GLOW */}

<div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 pointer-events-none">

<div className="absolute bottom-[-40px] right-[-40px] w-[160px] h-[160px] bg-[#D4AF37]/30 blur-[90px] rounded-full"/>

</div>



{/* CARD */}

<div className="transform group-hover:-translate-y-2 transition duration-300">

<ProductCard product={product}/>

</div>



{/* QUICK WHATSAPP CTA */}

<a
href={`https://wa.me/919625970888?text=Hi%20I%20am%20interested%20in%20${product.title}`}
target="_blank"
className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-[#0F2A44] text-white text-xs px-5 py-2 rounded-full opacity-0 group-hover:opacity-100 transition duration-300"
>

Quick Enquiry

</a>


</div>

))}

</div>



{/* MOBILE EXTRA CTA */}

<div className="md:hidden mt-10 text-center">

<Link
href="/products"
className="inline-block px-8 py-3 bg-[#0F2A44] text-white rounded-full shadow-xl"
>

Explore Full Collection

</Link>

</div>



{/* DESKTOP CTA */}

<div className="hidden md:block mt-16 text-center">

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