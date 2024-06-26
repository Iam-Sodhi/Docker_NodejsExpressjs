const Post= require("../models/postModel.js")

exports.getAllPosts= async (req,res,next)=>{
    
    try{
        const  posts= await Post.find();   
        res.status(200).json({
            status: "success",
            results: posts.length,
            data: {
                posts
            }
        })

    }
    catch(err){
        res.status(400).json({
            status: "failed"
        })
    }
}

exports.getOnePost= async (req,res,next)=>{
    
    try{
        const  posts= await Post.findById(req.params.id);   
        res.status(200).json({
            status: "success",
            results: posts.length,
            data: {
                posts
            }
        })

    }
    catch(err){
        res.status(400).json({
            status: "failed"
        })
    }
}
exports.createPost= async (req,res,next)=>{
    
    try{
        const  posts= await Post.create(req.body);   
        res.status(200).json({
            status: "success",
            results: posts.length,
            data: {
                posts
            }
        })

    }
    catch(err){
        console.log(err)
        res.status(400).json({
            status: "failed"
        })
    }
}
exports.updatePost= async (req,res,next)=>{
    
    try{
        const  posts= await Post.findByIdAndUpdate(req.params.id,req.body,{
            new:true,
            runValidators: true
        });   
        res.status(200).json({
            status: "success",
            results: posts.length,
            data: {
                posts
            }
        })

    }
    catch(err){
        res.status(400).json({
            status: "failed"
        })
    }
}
exports.deletePost= async (req,res,next)=>{
    
    try{
        const  posts= await Post.findByIdAndDelete(req.params.id,req.body,{
            new:true,
            runValidators: true
        });   
        res.status(200).json({
            status: "success",
        })

    }
    catch(err){
        res.status(400).json({
            status: "failed"
        })
    }
}