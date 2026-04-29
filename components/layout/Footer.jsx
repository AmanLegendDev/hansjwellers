import Link from "next/link";

export default function Footer(){

return(

<footer className="bg-[#0F2A44] text-white mt-24">


<div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-4 gap-10">


{/* BRAND */}

<div>

<img
src="/logo.png"
className="h-10"
/>

<p className="text-white/70 mt-4 text-sm leading-relaxed">

Hans Jewellers is a trusted jewellery showroom located at
Mall Road Shimla offering hallmarked gold jewellery,
custom orders and personalised in-store assistance.

</p>


<a
href="https://wa.me/918219174058"
target="_blank"
className="inline-block mt-5 px-6 py-2 bg-[#D4AF37] text-white rounded-full text-sm"
>

WhatsApp Support

</a>

</div>



{/* QUICK LINKS */}

<div>

<h3 className="font-semibold mb-4 text-[#D4AF37]">

Quick Links

</h3>

<div className="flex flex-col gap-2 text-sm text-white/70">

<Link href="/">Home</Link>

<Link href="/products">Products</Link>

<Link href="/orders">Track Orders</Link>

<Link href="/cart">Cart</Link>

</div>

</div>



{/* STORE INFO */}

<div>

<h3 className="font-semibold mb-4 text-[#D4AF37]">

Visit Our Store

</h3>

<div className="flex flex-col gap-2 text-sm text-white/70">

<p>94, The Mall Road Shimla</p>

<p>Himachal Pradesh, India</p>

<p>📞 98056-11112</p>

<p>📞 96259-70888</p>

</div>

</div>



{/* SOCIAL */}

<div>

<h3 className="font-semibold mb-4 text-[#D4AF37]">

Connect With Us

</h3>

<div className="flex flex-col gap-3 text-sm">

<a
href="https://www.instagram.com/hansjewellersshimla?igsh=amZjcGxneWFxMmgw"
target="_blank"
className="text-white/70 hover:text-white"
>

Instagram

</a>

<a
href="https://www.facebook.com/HansJewellers"
target="_blank"
className="text-white/70 hover:text-white"
>

Facebook

</a>

<a
href="https://wa.me/919625970888?text=Hello%20Hans%20Jewellers%20Shimla,%20I%20am%20contacting%20you%20through%20your%20website%20regarding%20jewellery%20enquiry.%20Please%20assist%20me%20with%20details."
target="_blank"
className="text-white/70 hover:text-white"
>

WhatsApp

</a>

</div>

</div>


</div>



{/* BOTTOM STRIP */}

<div className="border-t border-white/10 text-center text-xs text-white/60 py-5 px-6">

© {new Date().getFullYear()} Hans Jewellers Shimla. All rights reserved.

<br/>

Designed & Developed by <span className="text-[#D4AF37] font-medium">Aman Digital Solutions</span>

</div>


</footer>

);

}