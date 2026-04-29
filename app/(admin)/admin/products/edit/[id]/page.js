"use client";

import { useEffect,useState } from "react";
import { useParams,useRouter } from "next/navigation";
import { motion,AnimatePresence } from "framer-motion";

export default function EditProductPage(){

const {id}=useParams();
const router=useRouter();

const [form,setForm]=useState(null);
const [categories,setCategories]=useState([]);
const [images,setImages]=useState([]);
const [uploading,setUploading]=useState(false);
const [showPopup,setShowPopup]=useState(false);


/*
FETCH DATA
*/

useEffect(()=>{

fetch(`/api/products/${id}`)
.then(res=>res.json())
.then(data=>{

setForm(data);
setImages(data.images||[]);

});

fetch("/api/categories/dropdown")
.then(res=>res.json())
.then(setCategories);

},[id]);


/*
UPLOAD IMAGE
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

if(data.url){

setImages(prev=>[...prev,data.url]);

}

setUploading(false);

};


/*
REMOVE IMAGE
*/

const removeImage=index=>{

setImages(prev=>prev.filter((_,i)=>i!==index));

};


/*
UPDATE PRODUCT
*/

const handleSubmit=async e=>{

e.preventDefault();

await fetch("/api/products/update",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

id,

data:{
...form,
images
}

})

});

setShowPopup(true);

setTimeout(()=>{

router.push("/admin/products");

},1500);

};


if(!form) return null;


return(

<div className="max-w-3xl mx-auto space-y-8">


{/* HEADER */}

<div className="flex items-center gap-4">

<img
src="/logo.png"
className="w-12"
/>

<div>

<h1 className="text-3xl font-heading text-primary">

Edit Jewelry Product

</h1>

<p className="text-neutral-500">

Update catalog item details

</p>

</div>

</div>



{/* SUCCESS POPUP */}

<AnimatePresence>

{showPopup&&(

<motion.div

initial={{opacity:0,scale:0.9}}
animate={{opacity:1,scale:1}}
exit={{opacity:0}}

className="fixed inset-0 flex items-center justify-center bg-black/40 z-50"

>

<div className="bg-white px-10 py-6 rounded-xl shadow-soft text-center">

<h2 className="text-lg font-semibold text-primary">

Product Updated Successfully ✨

</h2>

<p className="text-neutral-500 mt-1">

Hans Jewellers catalog updated

</p>

</div>

</motion.div>

)}

</AnimatePresence>



<form

onSubmit={handleSubmit}

className="bg-white rounded-xl shadow-soft p-6 space-y-5"

>


<InputField
label="Jewelry Title"
value={form.title}
onChange={v=>setForm({...form,title:v})}
/>


<TextAreaField
label="Short Description"
value={form.shortDescription||""}
onChange={v=>setForm({...form,shortDescription:v})}
/>


<TextAreaField
label="Full Description"
value={form.description||""}
onChange={v=>setForm({...form,description:v})}
/>



<InputField
label="Weight"
value={form.weight||""}
onChange={v=>setForm({...form,weight:v})}
/>


<InputField
label="Purity"
value={form.purity||""}
onChange={v=>setForm({...form,purity:v})}
/>


<InputField
label="Material"
value={form.material||""}
onChange={v=>setForm({...form,material:v})}
/>


<InputField
label="Stone Type"
value={form.stoneType||""}
onChange={v=>setForm({...form,stoneType:v})}
/>


<InputField
label="Making Charges"
value={form.makingCharges||""}
onChange={v=>setForm({...form,makingCharges:v})}
/>


<InputField
label="Delivery Time"
value={form.deliveryTime||""}
onChange={v=>setForm({...form,deliveryTime:v})}
/>

<InputField
label="Price"
value={form.price || ""}
onChange={v => setForm({ ...form, price: v })}
type="number"
/>


<select

value={form.category}

onChange={e=>setForm({

...form,
category:e.target.value

})}

className="border p-3 w-full rounded-lg"

>

{categories.map(cat=>(

<option key={cat._id} value={cat._id}>

{cat.name}

</option>

))}

</select>



<div>

<label className="text-sm font-medium">

Product Images

</label>

<input

type="file"

onChange={handleImageUpload}

className="mt-2"

/>


{uploading&&(

<p className="text-sm text-neutral-400">

Uploading...

</p>

)}


<div className="flex gap-3 flex-wrap mt-4">

{images.map((img,index)=>(

<div key={index} className="relative">

<img

src={img.replace("/upload/","/upload/f_auto,q_auto/")}

className="w-24 h-24 rounded-lg object-cover border"

/>

<button

type="button"

onClick={()=>removeImage(index)}

className="absolute top-0 right-0 bg-red-500 text-white text-xs px-1 rounded"

>

×

</button>

</div>

))}

</div>

</div>



<CheckboxField
label="Featured Jewelry"
value={form.isFeatured}
onChange={v=>setForm({...form,isFeatured:v})}
/>


<CheckboxField
label="Visible on Website"
value={form.isVisible}
onChange={v=>setForm({...form,isVisible:v})}
/>



<button

className="bg-primary text-white px-6 py-3 rounded-lg w-full bg-[#0c2135] hover:bg-[#173246] transition"

>

Update Jewelry Product

</button>


</form>

</div>

);

}



/*
INPUT FIELD
*/

function InputField({label,value,onChange,type="text"}){

return(

<div>

<label className="text-sm font-medium">

{label}

</label>

<input

type={type}

value={value}

onChange={e=>onChange(e.target.value)}

className="border p-3 w-full rounded-lg mt-1"

/>

</div>

);

}



/*
TEXT AREA
*/

function TextAreaField({label,value,onChange}){

return(

<div>

<label className="text-sm font-medium">

{label}

</label>

<textarea

value={value}

onChange={e=>onChange(e.target.value)}

className="border p-3 w-full rounded-lg mt-1"

/>

</div>

);

}



/*
CHECKBOX
*/

function CheckboxField({label,value,onChange}){

return(

<label className="flex gap-2 items-center">

<input

type="checkbox"

checked={value}

onChange={e=>onChange(e.target.checked)}

/>

{label}

</label>

);
}