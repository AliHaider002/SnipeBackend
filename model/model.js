const mongoose = require("mongoose");

// lock TOKEN funtion
const schema = new mongoose.Schema({
  walletAddress: {
    type: String,
    required: true,
  },
  tokenAddress: {
    type: String,
    required: true,
  },
  tokenName: {
    type: String,
    required: true,
  },
  tokenSymbol: {
    type: String,
    required: true,
  },
  tokenDecimal: {
    type: String,
    required: true,
  },
  unLock_Date: {
    type: Date,
  },
  Lock_Date: {
    type: Date,
  },
  lockTitle: {
    type: String,
    required: true,
  },
  total_Locked_Amount: {
    type: String,
    required: true,
  },
  total_Locked_Value: {
    type: String,
  },
  Owner: {
    type: String,
    required: true,
  },

  TGE_Date: {
    type: Date,
    default: " "
  },
  tGE_Percentage: {
    type: String,
  },
  cycle_Days: {
    type: String,
  },
  cycle_ReleasePercentage: {
    type: String,
  },
  network: {
    type: String,
    required: true,
  },
  chainID: {
    type: Number,
    required: true,
  },
  isLpToken: {
    type: Boolean,
    default: "false",
  },
  lockID: {
    type: String,
  },
  isTokenUnlocked: {
    type: Boolean,
    default: false,
  },
  Date: { type: Date, default: Date.now },
});

// lock BNB funtion
const schema2 = new mongoose.Schema({
  walletAddress: {
    type: String,
    required: true,
  },

  lockTitle: {
    type: String,
    required: true,
  },
  total_Locked_Amount: {
    type: String,
    required: true,
  },
  Owner: {
    type: String,
    required: true,
  },
  unLock_Date: {
    type: Date,
  },
  Lock_Date: {
    type: Date,
  },
  TGE_Date: {
    type: Date,
    default: "",
  },
  tGE_Percentage: {
    type: String,
  },
  cycle_Days: {
    type: String,
  },
  cycle_ReleasePercentage: {
    type: String,
  },
  network: {
    type: String,
    required: true,
  },
  chainID: {
    type: Number,
    required: true,
  },
  lockID: {
    type: String,
  },
  isBNBUnLocked: {
    type: Boolean,
    default: false,
  },
  Date: { type: Date, default: Date.now },
});
// lock LIQUIDITY funtion
const schema3 = new mongoose.Schema({
  walletAddress: {
    type: String,
    required: true,
  },
  liquidityTitle: {
    type: String,
    required: true,
  },
  total_Liquidity_Amount: {
    type: String,
    required: true,
  },
  total_Liquidity_Value: {
    type: String,
    // required: true,
  },
  Owner: {
    type: String,
    required: true,
  },
  unLock_Date: {
    type: Date,
  },
  Lock_Date: {
    type: Date,
  },
  TGE_Date: {
    type: Date,
    default: " "
  },
  tGE_Percentage: {
    type: String,
  },
  cycle_Days: {
    type: String,
  },
  cycle_ReleasePercentage: {
    type: String,
  },
  network: {
    type: String,
    required: true,
  },
  liquiditySymbol: {
    type: String,
    required: true,
  },
  chainID: {
    type: Number,
    required: true,
  },
  lockID: {
    type: String,
  },
  liquidityAddress: {
    type: String,
    required: true,
  },
  liquidityDecimal: {
    type: String,
    required: true,
  },
  isLiquidityLocked: {
    type: Boolean,
    default: false,
  },
  liquidityName: {
    type: String,
    default: false,
  },
  liquidityID: {
    type: String,
    default: false,
  },
  Date: { type: Date, default: Date.now },
});

// Services Fees
const schema4 = new mongoose.Schema({
  payPerUse: {
    type: String,
    required: true,
  },
  monthly: {
    type: String,
  },
  yearly: {
    type: String,
  },
});

// adminData

const schema5 = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  Date: { type: Date, default: Date.now },
});

// generwate Walltes

const schema6 = new mongoose.Schema({
  walletAddress: {
    type: String,
    required: true,
  },
  timeStamp: {
    type: String,
    required: true,
  },
  isUsed: {
    type: Boolean,
    required: true,
  },
  Date: { type: Date, default: Date.now },
});

// lock CIC funtion
const schema7 = new mongoose.Schema({
  walletAddress: {
    type: String,
    required: true,
  },

  lockTitle: {
    type: String,
    required: true,
  },
  total_Locked_Amount: {
    type: String,
    required: true,
  },
  Owner: {
    type: String,
    required: true,
  },
  unLock_Date: {
    type: Date,
  },
  TGE_Date: {
    type: Date,
    default: " "
  },
  tGE_Percentage: {
    type: String,
  },
  cycle_Days: {
    type: String,
  },
  cycle_ReleasePercentage: {
    type: String,
  },
  network: {
    type: String,
    required: true,
  },
  chainID: {
    type: Number,
    required: true,
  },
  lockID: {
    type: String,
  },
  Lock_Date: {
    type: Date,
  },
  isCICUnLocked: {
    type: Boolean,
    default: false,
  },
  Date: { type: Date, default: Date.now },
});

// Locked TokenSchema
const tokenLockInfo = mongoose.model("tokenLockedInfo", schema);
const bnbLockInfo = mongoose.model("bnbLockedInfo", schema2);
const liquidityLockedInfo = mongoose.model("liquidityLockedInfo", schema3);
const generateWalletsFee = mongoose.model("servicesFee", schema4);
const adminData = mongoose.model("Admin", schema5);
const generateWalletFeeRecords = mongoose.model("walletFeeRecords", schema6);
const cicLockInfo = mongoose.model("cicLockedInfo", schema7);

// models to export
const modles = {
  tokenLockInfo: tokenLockInfo,
  bnbLockInfo: bnbLockInfo,
  generateWalletsFee: generateWalletsFee,
  adminData: adminData,
  generateWalletFeeRecords: generateWalletFeeRecords,
  liquidityLockedInfo: liquidityLockedInfo,
  cicLockInfo
};

module.exports = modles;
