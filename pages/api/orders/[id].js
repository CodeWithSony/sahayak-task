import connectToDatabase from '../../../lib/mongodb';
import Order from '../../../models/Order';

export default async function handler(req, res) {
  await connectToDatabase();
  const { id } = req.query;

  if (req.method === 'GET') {
    const order = await Order.findById(id).populate('product');
    res.status(200).json(order);
  } else if (req.method === 'PUT') {
    const order = await Order.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(order);
  } else if (req.method === 'DELETE') {
    await Order.findByIdAndDelete(id);
    res.status(204).end();
  } else {
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
