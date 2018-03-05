const expect = require('expect');
const request = require('supertest');

const {app} = require('./../../index');
//consists of price, time, and volume
const {Intraday} = require('../models/intradayPrice');

const prices = [
        {
            "volume": 12,
            "_id": "5a9c91da0cd7a63deac066f4",
            "price": 172.12,
            "time": "16:00:00",
            "__v": 0
        },
        {
            "volume": 1,
            "_id": "5a9c921bd6644f3e0469e66e",
            "price": 172.12,
            "time": "16:00:00",
            "__v": 0
        }
    ];

beforeEach((done) => {
  Intraday.remove({})
    .then(() => {
      return Intraday.insertMany(prices);
    })
    .then(() => done());
});

describe('POST /AAPL/stock', () => {
  it('should add apple stock data', (done) => {
    var data = {
      price: 172.12,
      time: "16:00:00",
      volume: 12
    };

    request(app)
      .post("/AAPL/prices")
      .send({
        price: data.price,
        time: data.time,
        volume: data.volume
      })
      .expect(200)
      .expect(res => {
        expect(res.body.price).toBe(data.price);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        Intraday.find({volume: 1}).then((intraday) => {
          expect(intraday.length).toBe(1);
          expect(intraday[0].price).toBe(data.price);
          done();
        })
        .catch(err => {
          done(e);
        });
      });
  });
});

describe('GET /AAPL/stock', () => {
  it('should get all prices', done => {
    request(app)
      .get('/AAPL/prices')
      .expect(200)
      .expect(res => {
        expect(res.body.prices.length).toBe(2);
      })
      .end(done);
  });
});
