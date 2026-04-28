import bcrypt from "bcryptjs";
import { connectDB } from "./db.js";
import Admin from "../models/Admin.js";

export async function seedAdmin() {

await connectDB();

const exists = await Admin.findOne({
email: "admin@hansjewellers.com"
});

if (exists) {

await Admin.deleteOne({
email: "admin@hansjewellers.com"
});

}

const hashedPassword =
await bcrypt.hash(
"Hans@2026Admin",
10
);

await Admin.create({
email: "admin@hansjewellers.com",
password: hashedPassword,
role: "admin"
});

console.log("Admin created successfully");

}