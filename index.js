const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const publicPath = path.join(__dirname, './public');
const io = socketIO(server);

const {mongoose} = require('./server/DB/mongoose');
//consists of price, time, and volume
const {Intraday} = require('./server/models/intradayPrice');
const {Stock} = require('./server/models/stock');

const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static(publicPath))

app.post('/:symbol', (req, res) => {

  const stock = new Stock({
    symbol: req.body.symbol,
    open: req.body.open,
    high: req.body.high,
    low: req.body.low,
    close: req.body.close,
    volume: req.body.volume,
    todaysReturn: req.body.todaysReturn
  });

  stock.save()
    .then(doc => {
      res.send(doc)
    })
    .catch(error => {
      res.status(400).send(error);
    });
});

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

app.get('/:symbol', (req, res) => {
  Stock.find({symbol: req.param.symbol})
    .then(data => {
      res.send({data});
    })
    .catch(error => {
      res.status(400).send(error);
    })
});

app.get('/AAPL/prices', (req, res) => {
  Intraday.find().then(prices => {
    res.send({prices});
  })
  .catch(error => {
    res.status(400).send(error);
  });
});

io.on('connection', socket => {
  console.log("new user connected");

  socket.on('stockPurchased', (stock) => {
    console.log("stock purchased was", stock);
    io.emit('newShareOwned', {
      symbol: stock.symbol,
      price: stock.price,
      volume: stock.volume,
      createdAt: new Date().getTime()
    });
  });

  socket.on('disconnect', () => {
    console.log("User was disconnected");
  });
});

server.listen(port, () => {
  console.log(`Started up at port ${port}`);
});

module.exports = {app};
