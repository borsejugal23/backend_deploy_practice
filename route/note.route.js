const express=require("express");
const { auth } = require("../middleware/auth.middleware");
const { postModel } = require("../model/note.model");


const noteRouter=express.Router();

noteRouter.post("/add",auth,async(req,res)=>{
    try {
        // const {title,content}=req.body
        // const existpost=await postModel.find(req._id);
        // if (!existpost){
        //     const userpost=new postModel(req.body);
        //     await userpost.save()
        //     res.status(200).json({msg:"new post added",post:req.body})

        // }else{
        //     res.status(200).json({msg:"same post already added"})

        // }
        const userpost=new postModel(req.body);
            await userpost.save()
            // await userpost.populate("creator")
            res.status(200).json({msg:"new post added",userpost})
       

    } catch (error) {
        res.status(400).json({error:error.message})

    }

})

noteRouter.get("/search", async (req, res) => {
    try {
      const { query } = req.query;
      let title = new RegExp(query, "i");
      const notes = await postModel.find({title});
      res.send({notes:notes});
    } catch (error) {
      res.status(500).json({ message: 'An error occurred while searching for notes.' });
    }
  });

  noteRouter.patch("/update/:postID", auth, async (req, res) => {
    const userIDinUserDoc = req.body.creator;
    try {
      const { postID } = req.params;
      const post = await postModel.findById(postID);
      const userIDinpostDoc = post.creator.toString(); 
  
    //   console.log(userIDinUserDoc, userIDinpostDoc);
      if (userIDinpostDoc === userIDinUserDoc) {
        await postModel.findByIdAndUpdate(postID, req.body);
        res.json({ msg: "Post updated" });
      } else {
        res.json({ msg: "Not authorized" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  




  noteRouter.delete("/delete/:postID", auth, async (req, res) => {
    const userIDinUserDoc = req.body.creator;
    try {
      const { postID } = req.params;
      const post = await postModel.findById(postID);
      const userIDinpostDoc = post.creator.toString();
  
      console.log(userIDinUserDoc, userIDinpostDoc);
      if (userIDinpostDoc === userIDinUserDoc) {
        await postModel.findByIdAndDelete(postID);
        res.json({ msg: "Post deleted" });
      } else {
        res.json({ msg: "Not authorized" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });



  noteRouter.patch("/like/:postId", auth, async (req, res) => {
    try {
      const post = await postModel.findById(req.params.postId);
      console.log(req.body.creator)
    //   console.log(req.creator) always undefined
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }
  
      const index = post.like.findIndex((id) => id === req.body.creator);
      console.log(index)
      if (index === -1) {
        post.like.push(req.body.creator);
      } else {
        post.like = post.like.filter((id) => id !== req.body.creator);
      }
  
      const updatedPost = await postModel.findByIdAndUpdate(req.params.postId, post, { new: true });
      res.json(updatedPost);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  noteRouter.patch("/comment/:postId", auth, async (req, res) => {
    try {
      const post = await postModel.findById(req.params.postId);
      console.log(req.body.creator)
    //   console.log(req.creator) always undefined
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }
  
      const index = post.comment.findIndex((id) => id === req.body.creator);
      console.log(index)
      if (index === -1) {
        post.comment.push(req.body.creator);
      } else {
        post.comment = post.comment.filter((id) => id !== req.body.creator);
      }
  
      const updatedPost = await postModel.findByIdAndUpdate(req.params.postId, post, { new: true });
      res.json(updatedPost);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
module.exports={noteRouter}
