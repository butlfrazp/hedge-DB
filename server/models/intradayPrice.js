const {mongoose} = require('../DB/mongoose');
//consists of price, time, and volume
const Intraday = mongoose.model('testIntraday', {
  price: {
    type: Number,
    required: true,
    minlength: 3,
    trim: true
  },
  time: {
    type: String,
    required: true,
    trim: true
  },
  volume: {
    type: Number,
    required: true,
    trim: true,
    minlength: 1,
    default: 1
  }
});

module.exports = {Intraday};
