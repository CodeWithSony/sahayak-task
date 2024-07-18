// import connectToDatabase from '../../../lib/mongodb';
import connectToDatabase from "@/lib/mongodb";
// import Product from '../../../models/Product';
import Product from "@/models/Product";

export default async function handler(req, res) {
  await connectToDatabase();

  if (req.method === "GET") {
    const products = await Product.find({});
    res.status(200).json(products);
  } else if (req.method === "POST") {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } else {
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
