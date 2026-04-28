"use client";

import { useEffect, useState } from "react";

export default function CategoriesPage(){

const [name,setName]=useState("");
const [image,setImage]=useState("");
const [categories,setCategories]=useState([]);
const [loading,setLoading]=useState(false);
const [uploading,setUploading]=useState(false);


/*
FETCH CATEGORIES
*/

const fetchCategories = async () => {

try{

const res = await fetch("/api/categories/list");

const data = await res.json();

setCategories(data);

}catch(err){

console.log("Fetch categories failed",err);

}

};


useEffect(()=>{

fetchCategories();

},[]);



/*
UPLOAD IMAGE (USES SAME API AS PRODUCTS)
*/

const uploadImage = async(file)=>{

if(!file) return;

setUploading(true);

try{

const formData = new FormData();

formData.append("file",file);

const res = await fetch("/api/upload",{

method:"POST",

body:formData

});

const data = await res.json();

if(data?.url){

setImage(data.url);

}else{

alert("Upload failed");

}

}catch(err){

console.log("Upload error",err);

}

setUploading(false);

};



/*
CREATE CATEGORY
*/

const handleSubmit = async(e)=>{

e.preventDefault();

if(!name || !image){

alert("Name and image required");

return;

}

setLoading(true);

await fetch("/api/categories/create",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

name,
image

})

});

setName("");
setImage("");

fetchCategories();

setLoading(false);

};



/*
DELETE CATEGORY
*/

const deleteCategory = async(id)=>{

if(!confirm("Delete category?")) return;

await fetch("/api/categories/delete",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({id})

});

fetchCategories();

};



return(

<div className="space-y-10 max-w-3xl">

{/* HEADER */}

<div>

<h1 className="text-3xl font-semibold text-primary">

Categories Manager

</h1>

<p className="text-neutral-500 mt-1">

Create categories with image for homepage slider

</p>

</div>



{/* CREATE CATEGORY */}

<div className="bg-white shadow-soft rounded-xl p-6">

<form
onSubmit={handleSubmit}
className="space-y-4"
>


<input
placeholder="Category name"
value={name}
onChange={e=>setName(e.target.value)}
className="border p-3 rounded-lg w-full"
/>


<input
type="file"
onChange={e=>uploadImage(e.target.files[0])}
/>


{uploading && (

<p className="text-sm text-neutral-400">

Uploading image...

</p>

)}


{image && (

<img
src={image}
className="w-20 h-20 rounded-lg object-cover"
/>

)}


<button
disabled={loading}
className="bg-blue-400 text-white px-6 py-2 rounded-lg cursor-pointer "
>

{loading ? "Creating..." : "Create Category"}

</button>

</form>

</div>



{/* CATEGORY LIST */}

<div className="bg-white shadow-soft rounded-xl">

{categories.length === 0 ? (

<div className="p-8 text-neutral-400 text-center">

No categories yet

</div>

) : (

categories.map(cat => (

<div
key={cat._id}
className="flex justify-between items-center px-6 py-4 border-b last:border-none"
>


<div className="flex gap-4 items-center">


<img
src={cat.image || "/placeholder.png"}
className="w-12 h-12 rounded-lg object-cover"
/>


<span className="font-medium">

{cat.name}

</span>

</div>


<button
onClick={()=>deleteCategory(cat._id)}
className="text-white font-bold bg-red-600 p-2 rounded-xl text-sm cursor-pointer"
>

Delete

</button>

</div>

))

)}

</div>


</div>

);

}