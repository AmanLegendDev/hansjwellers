import { connectDB } from "@/lib/db";
import Category from "@/models/Category";
import slugify from "slugify";

export async function POST(req){

await connectDB();

const body = await req.json();

/*
VALIDATION
*/

if(!body.name){

return Response.json(
{ error:"Category name required" },
{ status:400 }
);

}

if(!body.image){

return Response.json(
{ error:"Category image required" },
{ status:400 }
);

}


/*
CREATE SLUG
*/

const slug = slugify(body.name,{
lower:true,
trim:true
});


/*
CHECK EXISTING
*/

const exists = await Category.findOne({ slug });

if(exists){

return Response.json(
{ error:"Category already exists" },
{ status:400 }
);

}


/*
CREATE CATEGORY
*/

const category = await Category.create({

name: body.name,

slug,

image: body.image

});


return Response.json({

success:true,

category

});

}