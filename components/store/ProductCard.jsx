"use client";

import Link from "next/link";
import Image from "next/image";

export default function ProductCard({ product }) {

const image =
product.images?.[0]
? product.images[0].replace("/upload/","/upload/f_auto,q_auto/")
: "/logo.png";

const formatPrice = (price) => {
return new Intl.NumberFormat("en-IN").format(price);
};


return (

<Link
href={`/products/${product.slug}`}
className="block"
>

<div className="group relative bg-white rounded-2xl overflow-hidden border border-neutral-100 hover:border-[#D4AF37]/50 transition-all duration-300 hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)]">


{/* IMAGE BLOCK */}

<div className="relative w-full aspect-square overflow-hidden rounded-t-2xl bg-gradient-to-b from-[#FAF8F3] to-white">

<Image
src={image}
alt={product.title}
fill
sizes="(max-width:768px) 50vw, 25vw"
className="object-contain rounded-t-2xl transition duration-500 group-hover:scale-[1.05]"
/>




{/* GOLD CORNER BADGE */}

{product.featured && (

<div className="absolute top-3 left-3 text-[10px] bg-[#D4AF37] text-white px-3 py-[3px] rounded-full shadow">

Featured

</div>

)}

</div>



{/* CONTENT */}

<div className="px-4 py-4 space-y-2">


{/* TITLE */}

<h3 className="font-heading text-[16px] md:text-[18px] text-[#0F2A44] leading-snug line-clamp-2">

{product.title}

</h3>



{/* META ROW */}

<div className="flex gap-3 flex-wrap text-[11px] text-neutral-500">

{product.weight && (

<span className="bg-[#FAF8F3] px-2 py-[2px] rounded">

{product.weight}

</span>

)}

{product.purity && (

<span className="bg-[#FAF8F3] px-2 py-[2px] rounded">

{product.purity}

</span>

)}

</div>



{/* SHORT DESCRIPTION */}

{product.shortDescription && (

<p className="text-[12px] text-neutral-400 line-clamp-2">

{product.shortDescription}

</p>

)}



{/* PRICE + CTA */}

<div className="flex justify-between items-center pt-2">


{/* PRICE */}

<div>

<p className="text-[12px] text-neutral-400">

Starting From

</p>

<p className="text-[#D4AF37] font-semibold text-[18px]">

₹ {formatPrice(product.price)}

</p>

</div>



{/* CTA */}

<span className="text-[13px] font-medium text-[#0F2A44] group-hover:text-[#D4AF37] transition">

View →

</span>

</div>

</div>



{/* GOLD HOVER GLOW */}

<div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300 pointer-events-none rounded-2xl shadow-[0_0_60px_rgba(212,175,55,0.18)]" />


</div>

</Link>

);

}