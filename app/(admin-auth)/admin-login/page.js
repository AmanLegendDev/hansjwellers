"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin(){

const router = useRouter();

const[email,setEmail]=useState("");
const[password,setPassword]=useState("");
const[loading,setLoading]=useState(false);

const handleSubmit=async(e)=>{

e.preventDefault();

setLoading(true);

const res=await fetch("/api/admin/login",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

email,
password

})

});

const data=await res.json();

setLoading(false);

if(res.ok){

router.push("/admin/dashboard");

router.refresh();

}else{

alert(data.message||"Login failed");

}

};


return(

<section className="min-h-screen flex items-center justify-center relative overflow-hidden">


{/* BACKGROUND */}

<div className="absolute inset-0 bg-[#0F2A44]" />


{/* GOLD GLOW */}

<div className="absolute -top-40 -right-40 w-[400px] h-[400px] bg-[#D4AF37]/20 blur-[140px] rounded-full"/>


{/* CARD */}

<div className="relative z-10 w-[380px] bg-white rounded-2xl shadow-2xl p-10">


{/* LOGO */}

<div className="flex flex-col items-center mb-6">

<img

src="/logo.png"

className="h-10"

/>

<h2 className="text-xl font-semibold text-[#0F2A44] mt-3">

Hans Admin Panel

</h2>

</div>


<form

onSubmit={handleSubmit}

className="space-y-5"

>


{/* EMAIL */}

<input

type="email"

placeholder="Admin Email"

required

className="w-full border border-neutral-200 p-3 rounded-lg outline-none focus:ring-2 focus:ring-[#D4AF37]/40"

value={email}

onChange={(e)=>setEmail(e.target.value)}

/>


{/* PASSWORD */}

<input

type="password"

placeholder="Password"

required

className="w-full border border-neutral-200 p-3 rounded-lg outline-none focus:ring-2 focus:ring-[#D4AF37]/40"

value={password}

onChange={(e)=>setPassword(e.target.value)}

/>


{/* BUTTON */}

<button

disabled={loading}

className="w-full bg-[#0F2A44] text-white py-3 rounded-lg hover:scale-[1.02] transition shadow-lg"

>

{loading?"Signing in...":"Secure Login"}

</button>


</form>


{/* FOOTER */}

<p className="text-xs text-neutral-400 text-center mt-6">

Authorized access only • Hans Jewellers Shimla

</p>


</div>

</section>

);

}