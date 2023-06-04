const router = require("express").Router();
const lockBNBObj = require("../controller/lockBNB");

// lock BNB

router.post("/lockBNB", lockBNBObj.lockBNB);

// router
router.delete("/deleteLockedBNB/:id", lockBNBObj.deleteLockedBNB);

// get locked bnb for listing Page
router.post("/getlockedBNBforListing/", lockBNBObj.getlockedBNBforListing);

router.post(
  "/getLockedBNBByWalletAddressAndChainID",
  lockBNBObj.getLockedBNBByWalletAddressAndChainID
);

router.post(
  "/getAllLockedBNBBYWalletAddres",
  lockBNBObj.getAllLockedBNBBYWalletAddres
);

router.post("/getLockedBNbById", lockBNBObj.getLockedBNBByID);

// fintere locked BNB

router.post("/filtereLockedBNB", lockBNBObj.filtereLockedBNB);

router.patch("/updatedLockedBNB", lockBNBObj.updatedLockedBNB);

module.exports = router;
