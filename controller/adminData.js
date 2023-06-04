
const model = require("../model/model")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")


const registerAdmin = async(req,res)=>{
    try{


        var email = req.body.email;

        var findEmail = await model.adminData.find({email : email})

        if(findEmail != null){

            var password = req.body.password;
            
            var hashedPass = await bcrypt.hash(password, 10);
            console.log('this is hashed password', hashedPass)
            var lockModel = new model.adminData({
                firstName : req.body.fname,
                lastName : req.body.lname,
                email :req.body.email,
                password : hashedPass
            })
            
            await lockModel.save();
            
            res.status(200).json({success : false, msg : "admin Created Successfully"})

        }else{
            res.status(302).json({success : false, msg : "Email already exist"})
        }

    }catch(err){
        res.status(500).json({success : false, msg : "something went wrong in server"})
    }
}


const adminLogin = async(req,res)=>{
    try{


        if(!req.body.email || !req.body.password){
            return{success : false, msg : "invalid creditionals"}
        }

        var password = req.body.password;

        var findAccountWithEmail = await model.adminData.findOne({email : req.body.email});
        console.log('this is data', findAccountWithEmail)
        if(findAccountWithEmail != null){

            var match = await bcrypt.compareSync(password, findAccountWithEmail.password)
            
            if(match == true){
                
                var token = jwt.sign({ id: findAccountWithEmail._id },process.env.sercretKey);


                console.log('this is secretKey', token)


                findAccountWithEmail.password = "-"
                
                res.status(200).json({success : true, data:findAccountWithEmail, token: token})
            }else{

                res.status(404).json({success : false, msg : 'invalid email or password'})
            }
            
        }else{
            
            res.status(404).json({success : false, msg : "invalid email or password", data:[]})
        }


    }catch(err){
        console.log('this is Error', err)
        res.status(500).json({success:false, msg : "something went wrong in server"})
    }
}






module.exports = {adminLogin , registerAdmin}