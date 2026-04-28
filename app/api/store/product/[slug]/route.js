import { connectDB } from "@/lib/db";
import Product from "@/models/Product";

export async function GET(req, context) {

await connectDB();

/* NEXT 16 FIX */

const { slug } = await context.params;

const product = await Product.findOne({
slug: slug,
isVisible: true
})
.populate("category", "name")
.lean();

if (!product) {

return Response.json(
{ error: "Product not found" },
{ status: 404 }
);

}

return Response.json(product);

}