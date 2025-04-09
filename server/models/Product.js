
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  id: String,
  name: String,
  description: String,
  price: Number,
  image: String,
  category: String,
  featured: Boolean
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
