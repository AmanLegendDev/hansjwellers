"use server";

import { connectDB } from "@/lib/db";
import Category from "@/models/Category";
import slugify from "slugify";


/*
CREATE CATEGORY
*/

export async function createCategory(name, image) {

try {

await connectDB();

if(!name || !image){

return {
error:"Name and image required"
};

}

const slug = slugify(name,{
lower:true
});

const exists = await Category.findOne({
slug
});

if(exists){

return {
error:"Category already exists"
};

}

await Category.create({

name,
slug,
image

});

return {
success:true
};

} catch(err){

return {
error:"Server error"
};

}

}



/*
GET CATEGORIES
*/

export async function getCategories(){

await connectDB();

return Category.find()
.select("name image")   // ← IMPORTANT FIX
.sort({createdAt:-1})
.lean();

}



/*
DELETE CATEGORY
*/

export async function deleteCategory(id){

await connectDB();

await Category.findByIdAndDelete(id);

return { success:true };

}