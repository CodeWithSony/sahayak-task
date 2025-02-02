import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true },
  status: { type: String, default: 'Pending' },
});

export default mongoose.models.Order || mongoose.model('Order', OrderSchema);
