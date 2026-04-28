"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import ProductCard from "@/components/store/ProductCard";
import Navbar from "@/components/layout/Navbar";
import Link from "next/link";

export default function ProductsPage(){

const searchParams = useSearchParams();
const selectedCategory = searchParams.get("category");

const [products,setProducts]=useState([]);
const [categories,setCategories]=useState([]);
const [loading,setLoading]=useState(true);


useEffect(()=>{

const fetchData=async()=>{

try{

const [productsRes,categoriesRes]=await Promise.all([
fetch("/api/store/products"),
fetch("/api/categories/dropdown")
]);

const productsData=await productsRes.json();
const categoriesData=await categoriesRes.json();

setProducts(productsData);
setCategories(categoriesData);

}catch(err){

console.log(err);

}

setLoading(false);

};

fetchData();

},[]);



if(loading){

return(

<section className="bg-white min-h-screen">

<Navbar/>

<div className="flex items-center justify-center h-[40vh] text-[#0F2A44] text-lg">

Loading Premium Collection...

</div>

</section>

);

}



const filteredProducts=selectedCategory
?products.filter(p=>p.category?._id===selectedCategory)
:products;



return(

<section className="bg-[#FAF8F3] min-h-screen">

<Navbar/>


{/* HERO MINI HEADER */}
<div className="relative h-[260px] md:h-[300px] w-full overflow-hidden">

<img
src="/hero-jewelry.jpg"
className="absolute w-full h-full object-cover"
/>


{/* DARK OVERLAY */}

<div className="absolute inset-0 bg-[#0F2A44]/75 backdrop-blur-[2px]" />


{/* CONTENT */}

<div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-6">

<p className="text-[#D4AF37] uppercase tracking-[3px] text-xs">

Hans Jewellers Shimla

</p>

<h1 className="text-3xl md:text-5xl font-heading mt-4">

Luxury Jewelry Collection

</h1>

<p className="mt-3 text-white/80 max-w-xl">

Explore handcrafted gold jewellery designed for weddings, gifting and timeless elegance.

</p>

</div>

</div>



<div className="max-w-7xl mx-auto px-5 sm:px-6 py-14">


{/* CATEGORY PILLS */}

<div className="sticky top-[70px] z-30 bg-[#FAF8F3] pb-6">

<div className="flex gap-3 overflow-x-auto scrollbar-hide">

<Link
href="/products"
className={`px-6 py-2 rounded-full whitespace-nowrap text-sm font-medium transition

${!selectedCategory
?"bg-[#0F2A44] text-white shadow"
:"border border-[#0F2A44] text-[#0F2A44] hover:bg-[#0F2A44]/10"}
`}
>

All

</Link>


{categories.map(cat=>(

<Link
key={cat._id}
href={`/products?category=${cat._id}`}
className={`px-6 py-2 rounded-full whitespace-nowrap text-sm font-medium transition

${selectedCategory===cat._id
?"bg-[#0F2A44] text-white shadow"
:"border border-[#0F2A44] text-[#0F2A44] hover:bg-[#0F2A44]/10"}
`}
>

{cat.name}

</Link>

))}

</div>

</div>



{/* CATEGORY TITLE */}

{selectedCategory &&(

<h2 className="text-3xl font-heading text-[#0F2A44] mb-10">

{categories.find(c=>c._id===selectedCategory)?.name}

</h2>

)}



{/* PRODUCT GRID */}

{filteredProducts.length===0?(

<div className="text-center py-20 text-neutral-500">

No products found in this category

</div>

):(


<div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">

{filteredProducts.map(product=>(

<ProductCard
key={product._id}
product={product}
/>

))}

</div>

)}



{/* BOTTOM SPACE */}

<div className="h-10"/>

</div>

</section>

);

}