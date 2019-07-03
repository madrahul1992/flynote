const mongoose = require('mongoose');
const { Schema } = mongoose;

const BodmasSchema = new Schema({
  expression: {
    type: String,
    required: true,
    unique: true
  },
  answer: {
    type: Number, 
    required: true
  }
}, {
  timestamps: {},
});

module.exports = mongoose.model('Bodmas', BodmasSchema);
