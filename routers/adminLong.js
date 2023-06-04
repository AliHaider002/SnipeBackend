const router = require("express").Router();
const {adminLogin , registerAdmin} = require("../controller/adminData")




router.post("/createAdmin", registerAdmin)

router.post('/loginAdmin', adminLogin)




module.exports = router