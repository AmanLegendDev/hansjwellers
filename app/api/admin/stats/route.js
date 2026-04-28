import { connectDB } from "@/lib/db";
import Product from "@/models/Product";
import Category from "@/models/Category";
import Order from "@/models/Order";

export async function GET(){

await connectDB();


/*
TOTAL COUNTS
*/

const products =
await Product.countDocuments();

const categories =
await Category.countDocuments();

const orders =
await Order.countDocuments();


/*
TODAY RANGE
*/

const todayStart =
new Date();

todayStart.setHours(0,0,0,0);


const todayEnd =
new Date();

todayEnd.setHours(23,59,59,999);


/*
TODAY ORDERS
*/

const todayOrders =
await Order.countDocuments({

createdAt:{
$gte:todayStart,
$lte:todayEnd
}

});


/*
TODAY REVENUE
*/

const todayRevenueOrders =
await Order.find({

createdAt:{
$gte:todayStart,
$lte:todayEnd
}

});


const todayRevenue =
todayRevenueOrders.reduce(
(sum,order)=>sum+order.totalAmount,
0
);


/*
PENDING ORDERS
(not delivered yet)
*/

const pendingOrders =
await Order.countDocuments({

orderStatus:{
$ne:"delivered"
}

});


/*
RECENT ORDERS
*/

const recentOrders =
await Order.find()
.sort({createdAt:-1})
.limit(5)
.select(
"customerName trackingId totalAmount"
);
const orderHistory =
await Order.countDocuments({

orderStatus:"delivered",
paymentStatus:"paid"

});


/*
RETURN RESPONSE
*/

return Response.json({

products,
categories,
orders,
todayOrders,
todayRevenue,
pendingOrders,
recentOrders,
orderHistory

});

}