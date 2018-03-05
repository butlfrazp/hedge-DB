const {mongoose} = require('../DB/mongoose');

const Stock = mongoose.model('Stock', {
  symbol: {
    type: String,
    required: true,
    trim: true
  },
  open: {
    type: Number,
    required: true,
    trim: true
  },
  high: {
    type: Number,
    required: true,
    trim: true
  },
  low: {
    type: Number,
    required: true,
    trim: true
  },
  close: {
    type: Number,
    required: false,
    trim: true
  },
  volume: {
    type: Number,
    required: true,
    trim: true
  },
  todaysReturn: {
    type: Number,
    required: true,
    trim: true
  }
});

module.exports = {Stock};
