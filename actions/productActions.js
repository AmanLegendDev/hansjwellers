"use server";

import { connectDB } from "@/lib/db";
import Product from "@/models/Product";
import slugify from "slugify";
import mongoose from "mongoose";
import Category from "@/models/Category";


// CREATE PRODUCT

export async function createProduct(data) {

try {

await connectDB();

const slug = slugify(data.title, {
lower: true
});

await Product.create({

title: data.title,

slug,

shortDescription: data.shortDescription,

description: data.description,

/* JEWELRY FIELDS */

weight: data.weight,

purity: data.purity,

material: data.material,

stoneType: data.stoneType,

makingCharges: data.makingCharges,

deliveryTime: data.deliveryTime,

customizable: data.customizable,

/* PRICE */

price: data.price,

/* MEDIA */

images: data.images,

/* CATEGORY */

category: data.category,

/* INVENTORY */

stock: data.stock ?? 0,

/* FLAGS */

isFeatured: data.isFeatured ?? false,

isVisible: data.isVisible ?? true

});

return { success: true };

} catch (err) {

console.log(err);

return { error: "Server error" };

}

}


// GET FEATURED PRODUCTS (homepage ke liye)

export async function getFeaturedProducts() {

  await connectDB();

  const products = await Product.find({
    isFeatured: true,
    isVisible: true,
  })
    .select("title price slug images")
    .limit(4)
    .lean();

  return products.map(product => ({
    ...product,
    _id: product._id.toString()
  }));

}

export async function getProducts() {

  await connectDB();

  return Product.find()
    .select("title price slug shortDescription images category isVisible isFeatured stock")
    .populate("category", "name")
    .sort({ createdAt: -1 })
    .lean();

}

export async function deleteProduct(id) {
  await connectDB();

  await Product.findByIdAndDelete(id);

  return { success: true };
}

export async function toggleProductField(
  id,
  field,
  value
) {
  await connectDB();

  await Product.findByIdAndUpdate(id, {
    [field]: value,
  });

  return { success: true };
}



export async function getSingleProduct(id) {

  await connectDB();

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return null;
  }

  return Product.findById(id)
    .populate("category", "name")
    .lean();

}

export async function updateProduct(id, data) {

await connectDB();

const existingProduct =
await Product.findById(id);

if (!existingProduct) {

return { error: "Product not found" };

}

await Product.findByIdAndUpdate(id, {

title: data.title,

slug: slugify(data.title, { lower: true }),

shortDescription: data.shortDescription,

description: data.description,

weight: data.weight,

purity: data.purity,

material: data.material,

stoneType: data.stoneType,

makingCharges: data.makingCharges,

deliveryTime: data.deliveryTime,

customizable: data.customizable,

price: Number(data.price),

category: data.category,

stock: data.stock ?? existingProduct.stock,

isFeatured: data.isFeatured ?? false,

isVisible: data.isVisible ?? true,

images:
Array.isArray(data.images) &&
data.images.length > 0
? data.images
: existingProduct.images

});

return { success: true };

}