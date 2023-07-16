const mongoose=require("mongoose");

const postSchema=mongoose.Schema(
    {
        title : {type:String,required:true},
        content : {type:String,required:true},
        creator:{type:mongoose.Schema.Types.ObjectId,ref:"user",required:true},
        // user_id:{type:String,required:true},
        username:{type:String,required:true},
        like:{type:[String],default:[]},
        comment:{type:[String],default:[]},
        tags:{type:[String],default:[]}


   },
   
   {
    versionKey:false
   }
)

const postModel=mongoose.model("Post",postSchema);

module.exports={postModel}