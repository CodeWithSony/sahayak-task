// import connectToDatabase from '../../../lib/mongodb';
import connectToDatabase from "@/lib/mongodb";
// import Order from '../../../models/Order';
import Order from "@/models/Order";

export default async function handler(req, res) {
  await connectToDatabase();

  if (req.method === "GET") {
    const orders = await Order.find({}).populate("product");
    res.status(200).json(orders);
  } else if (req.method === "POST") {
    const order = new Order(req.body);
    await order.save();
    res.status(201).json(order);
  } else {
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
