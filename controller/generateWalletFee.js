const model = require("../model/model");

// post gnenerate wllet Fee Method
const generateWalletfeePostmethod = async (req, res) => {
  try {
    // generateing new fee

    var newFee = new model.generateWalletsFee({
      monthly: req.body.month,
      yearly: req.body.year,
      payPerUse: payPerUse,
    });

    var genGeneratedWalletFee = await model.generateWalletsFee.find();

    if (genGeneratedWalletFee.length > 0) {
      res.status(200).json({ success: false, msg: "Fee already Generated" });
    } else {
      await newFee.save();
      res.status(200).json({ success: true, msg: "fee Generated" });
    }
  } catch (err) {
    console.log("this si error", err);
    res.status(500).json({ msg: "something went wrong", success: false });
  }
};

// update generate wallet fee
const generateWalletFee = async (req, res) => {
  try {
    await model.generateWalletsFee.findOneAndUpdate(
      { _id: req.body.id },
      {
        payPerUse: payPeruse,
        monthly: monthly,
        yearly: yearly,
      }
    );

    res.status(200).json({ success: true, msg: "fee updated successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, msg: "something went wrong in server" });
  }
};

// get Generated WalletFee

const getGeneratedWalletFee = async (req, res) => {
  try {
    var genGeneratedWalletFee = await model.generateWalletsFee.find();

    if (genGeneratedWalletFee != null) {
      res
        .status(200)
        .json({ success: true, generatedFee: genGeneratedWalletFee[0] });
    } else {
      res.status(404).json({ success: false, msg: "not generated Fee Found" });
    }
  } catch (err) {
    res.status(500).json({ success: false, msg: "something went wrong" });
  }
};

const generateFeeObj = {
  generateWalletfeePostmethod,
  generateWalletFee,
  getGeneratedWalletFee,
};

module.exports = generateFeeObj;
