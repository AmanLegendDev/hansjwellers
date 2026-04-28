"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ProductsPage() {

const [categories,setCategories]=useState([]);
const [images,setImages]=useState([]);
const [uploading,setUploading]=useState(false);
const [showPopup,setShowPopup]=useState(false);

const emptyForm={
title:"",
shortDescription:"",
description:"",
weight:"",
purity:"",
material:"",
stoneType:"",
makingCharges:"",
customizable:false,
deliveryTime:"",
price:"",
category:"",
isFeatured:false,
isVisible:true
};

const [form,setForm]=useState(emptyForm);


/*
FETCH CATEGORIES
*/

useEffect(()=>{

fetch("/api/categories/dropdown")
.then(res=>res.json())
.then(setCategories);

},[]);


/*
IMAGE UPLOAD
*/

const handleImageUpload=async e=>{

const file=e.target.files[0];

if(!file) return;

setUploading(true);

const formData=new FormData();

formData.append("file",file);

const res=await fetch("/api/upload",{
method:"POST",
body:formData
});

const data=await res.json();

if(data?.url){

setImages(prev=>[...prev,data.url]);

}

setUploading(false);

};


/*
SUBMIT PRODUCT
*/

const handleSubmit=async e=>{

e.preventDefault();

await fetch("/api/products/create",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
...form,
images
})

});

setShowPopup(true);

setForm(emptyForm);

setImages([]);

setTimeout(()=>{

setShowPopup(false);

},2000);

};



return(

<div className="max-w-3xl space-y-6 relative">


{/* SUCCESS POPUP */}

<AnimatePresence>

{showPopup &&(

<motion.div
initial={{opacity:0,scale:0.9}}
animate={{opacity:1,scale:1}}
exit={{opacity:0,scale:0.9}}
className="fixed inset-0 flex items-center justify-center bg-black/40 z-50"
>

<div className="bg-white rounded-xl shadow-soft px-8 py-6 text-center">

<h2 className="text-xl font-semibold text-green-600">

Jewelry Product Added Successfully ✨

</h2>

<p className="text-neutral-500 mt-2">

New jewelry item added to store catalog

</p>

</div>

</motion.div>

)}

</AnimatePresence>


<h1 className="text-3xl font-heading text-[var(--royal-blue)]">

Create Jewelry Product

</h1>


<form
onSubmit={handleSubmit}
className="bg-white p-6 rounded-xl shadow-soft space-y-4"
>


<InputField
placeholder="Jewelry title"
value={form.title}
onChange={v=>setForm({...form,title:v})}
/>


<TextAreaField
placeholder="Short Description"
value={form.shortDescription}
onChange={v=>setForm({...form,shortDescription:v})}
/>


<TextAreaField
placeholder="Full Description"
value={form.description}
onChange={v=>setForm({...form,description:v})}
/>


<InputField
placeholder="Weight (eg: 5g)"
value={form.weight}
onChange={v=>setForm({...form,weight:v})}
/>


<InputField
placeholder="Purity (eg: 22K)"
value={form.purity}
onChange={v=>setForm({...form,purity:v})}
/>


<InputField
placeholder="Material (Gold / Silver)"
value={form.material}
onChange={v=>setForm({...form,material:v})}
/>


<InputField
placeholder="Stone Type (Diamond / None)"
value={form.stoneType}
onChange={v=>setForm({...form,stoneType:v})}
/>


<InputField
placeholder="Making Charges"
value={form.makingCharges}
onChange={v=>setForm({...form,makingCharges:v})}
/>


<InputField
placeholder="Delivery Time (eg: 5 days)"
value={form.deliveryTime}
onChange={v=>setForm({...form,deliveryTime:v})}
/>


<label className="flex gap-2">

<input
type="checkbox"
checked={form.customizable}
onChange={e=>
setForm({...form,customizable:e.target.checked})
}
/>

Customizable Jewelry

</label>


<InputField
placeholder="Price"
type="number"
value={form.price}
onChange={v=>setForm({...form,price:v})}
/>


<select
value={form.category}
onChange={e=>
setForm({...form,category:e.target.value})
}
className="border p-3 w-full rounded-lg"
>

<option value="">Select Category</option>

{categories.map(cat=>(

<option key={cat._id} value={cat._id}>

{cat.name}

</option>

))}

</select>


<input
type="file"
onChange={handleImageUpload}
/>


{uploading &&(

<p className="text-sm text-neutral-500">

Uploading image...

</p>

)}


<div className="flex gap-3 flex-wrap">

{images.map((img,i)=>(

<img
key={i}
src={img}
className="w-20 h-20 rounded"
/>

))}

</div>


<label className="flex gap-2">

<input
type="checkbox"
checked={form.isFeatured}
onChange={e=>
setForm({...form,isFeatured:e.target.checked})
}
/>

Featured Jewelry

</label>


<label className="flex gap-2">

<input
type="checkbox"
checked={form.isVisible}
onChange={e=>
setForm({...form,isVisible:e.target.checked})
}
/>

Visible on Website

</label>


<button
className="bg-[var(--royal-blue)] hover:bg-[#0c2135] text-white px-6 py-3 rounded-lg w-full transition"
>

Save Jewelry Product

</button>

</form>

</div>

);

}


/*
REUSABLE INPUT
*/

function InputField({placeholder,value,onChange,type="text"}){

return(

<input
type={type}
placeholder={placeholder}
value={value}
onChange={e=>onChange(e.target.value)}
className="border p-3 w-full rounded-lg"
/>

);

}


function TextAreaField({placeholder,value,onChange}){

return(

<textarea
placeholder={placeholder}
value={value}
onChange={e=>onChange(e.target.value)}
className="border p-3 w-full rounded-lg"
/>

);

}