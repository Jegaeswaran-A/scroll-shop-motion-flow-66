
import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  id: String,
  name: String,
  description: String,
  price: Number,
  image: String,
  category: String,
  featured: Boolean
}, { timestamps: true });

export default mongoose.model('Product', productSchema);
