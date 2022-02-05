const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const Wallet = require("./model/Wallet");

app.use(express.json());
app.use(cors());

require("dotenv").config();

app.get("/", (req, res) => {
  res.send("welcome to alpha safe API");
});

app.post("/create", (req, res) => {
  const wallet = new Wallet({
    walletAddr: req.body.addr,
    owners: req.body.owners,
  });

  wallet
    .save()
    .then((data) => {
      if (data) {
        res
          .status(200)
          .json({ data, message: "successfully saved wallet's details" });
      } else {
        res.status(404).send({ message: "wallet detail's not saved" });
      }
    })
    .catch((err) => {
      res.status(404).json({ err, message: "wallet detail's not saved" });
    });
});

app.get("/load/:addr", (req, res) => {
 

  Wallet.find({ owners: req.params.addr })
    .then((data) => {
  
      if (data) {
        res
          .status(200)
          .json({ data, message: "successfully loaded wallet details" });
      } else {
        res.status(404).send({ message: "wallet detail's not loaded" });
      }
    })
    .catch((err) => {
      res.status(404).json({ err, message: "wallet detail's does not exist" });
    });
});

app.patch("/:wallet", (req, res) => {
  Wallet.findOneAndUpdate({ walletAddr: req.params.wallet }, {owners: req.body.owners})
    .then((data) => {
      if (data) {
        res
          .status(200)
          .json({ data, message: `successfully changed owners of wallet address: ${req.params.wallet}` });
      } else {
        res.status(404).send({ message: "could not change owners" });
      }

    })
    .catch((err) => {
        res.status(404).json({ err, message: "wallet detail's does not exist" });
    });
});

mongoose.connect(
  process.env.DB_CONNECT,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("connected to MongoDb");
  }
);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
