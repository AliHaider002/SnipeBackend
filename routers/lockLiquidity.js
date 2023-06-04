const router = require("express").Router();

const liquidtyObj = require("../controller/lockLiquidity");

// addd locked Token
router.post("/LockedLiquidty", liquidtyObj.LockedLiquidty);
// search token by Address
router.post("/filterLockedLiquidty", liquidtyObj.filterLockedLiquidty);
// get locked Tokens Data by address (used on listing Page)
router.post(
  "/getLockedLiquidtyByAddressAndChainID",
  liquidtyObj.getLockedLiquidtyByAddressAndChainID
);
// get locked tokens by wallet Address
router.post(
  "/getLockedLiquidtyByWalletAddress",
  liquidtyObj.getLockedLiquidtyByWalletAddress
);
router.post(
  "/getLiquidtyForListingPage",
  liquidtyObj.getLiquidtyForListingPage
);
// get all tokens using token Address
router.post(
  "/getAllLiquidtyAddressUsingAddress",
  liquidtyObj.getAllLiquidtyAddressUsingAddress
);
router.get("/getAllLiquidty", liquidtyObj.getAllLiquidty);
router.post("/getLiquidtyByID", liquidtyObj.getLiquidtyByID);
router.post("/deleteLockedLiquidtyById", liquidtyObj.deleteLockedLiquidtyById);
router.patch("/updateLockedLiquidty", liquidtyObj.updateLockedLiquidty);

module.exports = router;
