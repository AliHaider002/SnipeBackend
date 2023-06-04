const router = require("express").Router();
const lockCICObj = require("../controller/lockCIC");

// lock CIC

router.post("/lockCIC", lockCICObj.lockCIC);

// router
router.delete("/deleteLockedCIC/:id", lockCICObj.deleteLockedCIC);

// get locked CIC for listing Page
router.post("/getlockedCICforListing/", lockCICObj.getlockedCICforListing);

router.post(
  "/getLockedCICByWalletAddressAndChainID",
  lockCICObj.getLockedCICByWalletAddressAndChainID
);

router.post(
  "/getAllLockedCICBYWalletAddres",
  lockCICObj.getAllLockedCICBYWalletAddres
);

router.post("/getLockedCICById", lockCICObj.getLockedCICByID);

// fintere locked CIC

router.post("/filtereLockedCIC", lockCICObj.filtereLockedCIC);

router.patch("/updatedLockedCIC", lockCICObj.updatedLockedCIC);

module.exports = router;
