import connectToDatabase from '../../../lib/mongodb';
import Product from '../../../models/Product';

export default async function handler(req, res) {
  await connectToDatabase();
  const { id } = req.query;

  if (req.method === 'GET') {
    const product = await Product.findById(id);
    res.status(200).json(product);
  } else if (req.method === 'PUT') {
    const product = await Product.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(product);
  } else if (req.method === 'DELETE') {
    await Product.findByIdAndDelete(id);
    res.status(204).end();
  } else {
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
