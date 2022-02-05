const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WalletSchema = new Schema(
  {
    walletAddr: {
      type: String,
      required: true,
    },
    owners: [
        String
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Wallet", WalletSchema);