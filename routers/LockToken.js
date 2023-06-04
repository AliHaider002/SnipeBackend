const router = require("express").Router();

const tokensObj = require("../controller/lockedTokens");

// addd locked Token
router.post("/LockedToken", tokensObj.LockedToken);
// search token by Address
router.post("/filterTokenByTokenAddress", tokensObj.filterTokenByTokenAddress);
// get locked Tokens Data by address (used on listing Page)
router.post(
  "/getLockedSingleTokenDataByAddress",
  tokensObj.getLockedTokenDataByAddressAndChainID
);
// get locked tokens by wallet Address
router.post(
  "/getLockedTokensByWalletAddress",
  tokensObj.getLockedTokensByWalletAddress
);
router.post("/getTokensForListingPage", tokensObj.getTokensForListingPage);
// get all tokens using token Address
router.post(
  "/getAllTokenAddressUsingAddress",
  tokensObj.getAllTokenAddressUsingAddress
);
router.post("/getTokenByID", tokensObj.getTokenByID);
router.post("/deleteLockedTokenById", tokensObj.deleteLockedTokenById);
router.patch("/updateLockeToken", tokensObj.updateLockeToken);

module.exports = router;
