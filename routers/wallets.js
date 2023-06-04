const router = require("express").Router();

const wallets = require("../controller/generateWallets");

router.post("/generateWallets", wallets.generateWallets);

router.post("/TestGenerateWallets", wallets.testWalletGenerate);

module.exports = router;
