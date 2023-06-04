const router = require("express").Router();
const generateFeeObj = require('../controller/generateWalletFee')






// generate wallet Fee post method
router.post('/generateWalletFee', generateFeeObj.generateWalletfeePostmethod)






// update generateate wallet fee patch method
router.patch('/updateGeneratedWalletFee', generateFeeObj.generateWalletFee)





router.get('/getGeneratedWalletFee', generateFeeObj.getGeneratedWalletFee)






module.exports = router