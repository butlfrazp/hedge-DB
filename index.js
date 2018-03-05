const bodyParser = require('body-parser');
const express = require('express');
const app = express();

const {mongoose} = require('./server/DB/mongoose');
//consists of price, time, and volume
const {Intraday} = require('./server/models/intradayPrice');

const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/AAPL/prices', (req, res) => {

  const intraday = new Intraday({
    price: req.body.price,
    time: req.body.time,
    volume: req.body.volume
  });

  intraday.save()
    .then(doc => {
      res.send(doc);
    })
    .catch(error => {
      res.status(400).send(error);
    });
});

app.get('/AAPL/prices', (req, res) => {
  Intraday.find().then(prices => {
    res.send({prices});
  })
  .catch(error => {
    res.status(400).send(error);
  });
});

app.listen(port, () => {
  console.log(`Started up at port ${port}`);
});

module.exports = {app};
