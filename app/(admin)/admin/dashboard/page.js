"use client";

import { useEffect,useState } from "react";
import Link from "next/link";
import {
ShoppingCart,
Package,
Layers,
CheckCircle,
TrendingUp,
IndianRupee,
Plus
} from "lucide-react";

export default function Dashboard(){

const[stats,setStats]=useState({

products:0,
categories:0,
orders:0,
orderHistory:0,
todayOrders:0,
todayRevenue:0

});


useEffect(()=>{

fetch("/api/admin/stats")
.then(res=>res.json())
.then(setStats);

},[]);


return(

<div className="space-y-10">


{/* HEADER */}

<div className="flex flex-col md:flex-row md:justify-between gap-4">

<div>

<h1 className="text-4xl font-semibold text-[#0F2A44]">

Hans Admin Dashboard

</h1>

<p className="text-neutral-500 mt-1">

Manage store activity and daily performance

</p>

</div>


<div className="flex gap-3 flex-wrap">

<ActionBtn
link="/admin/products/create"
text="Add Product"
/>

<ActionBtn
link="/admin/orders"
text="Track Orders"
/>

</div>

</div>



{/* PRIMARY NAVIGATION CARDS */}

<div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">


<NavCard
title="Total Orders"
value={stats.orders}
icon={<ShoppingCart size={22}/>}
link="/admin/orders"
/>


<NavCard
title="Products"
value={stats.products}
icon={<Package size={22}/>}
link="/admin/products"
/>


<NavCard
title="Categories"
value={stats.categories}
icon={<Layers size={22}/>}
link="/admin/categories"
/>


<NavCard
title="Order History"
value={stats.orderHistory}
icon={<CheckCircle size={22}/>}
link="/admin/order-history"
/>

</div>



{/* TODAY ANALYTICS */}

<div className="grid md:grid-cols-2 gap-6">


<AnalyticsCard
title="Today's Orders"
value={stats.todayOrders}
icon={<TrendingUp size={20}/>}
/>


<AnalyticsCard
title="Today's Revenue"
value={`₹ ${formatPrice(stats.todayRevenue)}`}
icon={<IndianRupee size={20}/>}
/>

</div>



{/* QUICK ACTION PANEL */}

<div className="bg-white rounded-2xl shadow-soft p-6">

<h2 className="text-xl font-semibold text-[#0F2A44] mb-5">

Quick Actions

</h2>


<div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">

<ActionTile
link="/admin/products/create"
text="Create Product"
/>

<ActionTile
link="/admin/categories"
text="Manage Categories"
/>

<ActionTile
link="/admin/orders"
text="Track Orders"
/>

</div>

</div>


</div>

);

}



function formatPrice(price){

return new Intl.NumberFormat("en-IN").format(price||0);

}



/* NAV CARD */

function NavCard({

title,
value,
icon,
link

}){

return(

<Link
href={link}
className="rounded-2xl shadow-soft p-6 flex justify-between items-center bg-white hover:shadow-lg transition"
>

<div>

<p className="text-neutral-500 text-sm">

{title}

</p>

<h2 className="text-4xl font-semibold mt-2 text-[#0F2A44]">

{value}

</h2>

</div>


<div className="w-11 h-11 flex items-center justify-center rounded-xl bg-[#FAF8F3] text-[#0F2A44]">

{icon}

</div>

</Link>

);

}



/* ANALYTICS CARD */

function AnalyticsCard({

title,
value,
icon

}){

return(

<div className="bg-[#0F2A44] text-white rounded-2xl shadow-soft p-6 flex justify-between items-center">

<div>

<p className="text-white/70 text-sm">

{title}

</p>

<h2 className="text-3xl font-semibold mt-1">

{value}

</h2>

</div>


<div className="bg-white/20 p-2 rounded-lg">

{icon}

</div>

</div>

);

}



/* ACTION BUTTON */

function ActionBtn({

link,
text

}){

return(

<Link
href={link}
className="flex items-center gap-2 bg-[#0F2A44] text-white px-5 py-2 rounded-lg hover:scale-[1.02] transition"
>

<Plus size={16}/>

{text}

</Link>

);

}



/* TILE */

function ActionTile({

link,
text

}){

return(

<Link
href={link}
className="bg-[#FAF8F3] rounded-xl p-4 hover:bg-[#0F2A44] hover:text-white transition text-center font-medium"
>

{text}

</Link>

);

}