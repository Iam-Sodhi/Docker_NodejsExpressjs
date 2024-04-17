const User= require("../models/userModel.js")
const bcrypt= require("bcryptjs");

exports.signUp= async(req,res)=>{
  const {username, password} = req.body;
    try{
      const hashPassword= await bcrypt.hash(password,12);
      const newUser= await User.create({
        username,
        password: hashPassword
      });

      req.session.user=newUser;
        res.status(200).json({
        status: "success",
        data:{
             newUser,
        }
      })
    }
    catch(err){
            res.status(400).json({
                status: "failure",
                message: err.message,
            })
    }
}
exports.login= async(req,res)=>{
  const {username, password} = req.body;
    try{
      const user=await User.findOne({username})

      if(!user){
         res.status(404).json({
          status: "failed",
          message: "user not found"
        })
      }

      const isPasswordCorrect= await bcrypt.compare(password,user.password);

      if(!isPasswordCorrect){
        req.session.user= user;
       res.status(400).json({
          status: "failed",
          message: "Incorrect Password"
        })
      }
     res.status(201).json({
        status: "success",
        data:{
             user,
        }
      })
    }
    catch(err){
         return    res.status(400).json({
                status: "failure",
                message : err.message
            })
    }
}