const mongoose=require("mongoose");

const blackSchema=mongoose.Schema(
    {
        blacklist:[String]
    }
)

const blackModel=mongoose.model("blacklist",blackSchema);

module.exports={blackModel}