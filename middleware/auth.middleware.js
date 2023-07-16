const jwt =require("jsonwebtoken");
require("dotenv").config()

const auth=(req,res,next)=>{
    try {
       const token=req.headers.authorization?.split(" ")[1];

      if (token){
        const decoded=jwt.verify(token,process.env.secretKey);

        if (decoded){
            req.body.creator=decoded.userID;
            req.body.username=decoded.username;
            next()
        }
      }
       else{
          return res.status(200).json({msg:"token is not valid"})
       }
   } 
   catch (error) {
   return res.status(404).json({error:error.message})

}

   
}
module.exports={auth}