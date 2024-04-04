const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../../../server.js");
const Concert = require("../../../models/concert.model.js");

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe("GET /api/concerts", () => {
  before(async () => {
    const testConcertOne = new Concert({
      _id: "5d9f1140f10a81216cfd4408",
      performer: "Mike Wazowski",
      genre: "R&B",
      price: 30,
      day: 2,
      image: "/img/uploads/1fsd3dd5fsdg.jpg",
    });
    await testConcertOne.save();

    const testConcertTwo = new Concert({
      _id: "5d9f1159f81ce8d1ef2bee48",
      performer: "Spider Man",
      genre: "Pop",
      price: 70,
      day: 3,
      image: "/img/uploads/1fsd3dd5fqeg.jpg",
    });
    await testConcertTwo.save();

    const testConcertThree = new Concert({
      _id: "5d9f1159f81ce8d1ef2bee54",
      performer: "Snoop Dog",
      genre: "Rap",
      price: 88,
      day: 1,
      image: "/img/uploads/1fsd3addfrr7b.jpg",
    });
    await testConcertThree.save();
  });

  it("/concerts/performer/:performer should return concert by performer", async () => {
    const res = await request(server).get("/api/concerts/performer/snoop");
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an("array");
    expect(res.body).to.not.be.null;
  });

  it("/concerts/genre/:genre should return concerts by genre", async () => {
    const res = await request(server).get("/api/concerts/genre/rap");
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an("array");
    expect(res.body).to.not.be.null;
  });

  it("/concerts/price/:price_min/:price_max should return concerts by price range", async () => {
    const res = await request(server).get("/api/concerts/price/30/70");
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an("array");
    expect(res.body).to.not.be.null;
  });

  it("/concerts/day/:day should return concerts by day", async () => {
    const res = await request(server).get("/api/concerts/day/1");
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an("array");
    expect(res.body).to.not.be.null;
  });

  after(async () => {
    await Concert.deleteMany();
  });
});
