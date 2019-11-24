const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = mongoose.Schema({
  name: {
    required: true,
    type: String,
    unique: 1,
    maxlength: 100
  },
  description: {
    required: true,
    type: String,
    maxlength: 100000
  },
  price: {
    required: true,
    type: Number,
    maxlength: 255
  },
  brand: {
    required: true,
    type: Schema.Types.ObjectId,
    ref: 'Brand'
  },
  wood: {
    required: true,
    type: Schema.Types.ObjectId,
    ref: 'Wood'
  },
  frets: {
    required: true,
    type: Number
  },
  sold: {
    type: Number,
    maxlength: 100,
    default: 0
  },
  shipping: {
    required: true,
    type: Boolean
  },
  available: {
    required: true,
    type: Boolean
  },
  publish: {
    required: true,
    type: Boolean
  },
  images: {
    type: Array,
    default: []
  },
}, {timestamp: true});

const Product = mongoose.model('Product', ProductSchema);

module.exports = { Product };