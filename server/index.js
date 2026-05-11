import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import UserModel from './models/Users.js';
import PostModel from './models/Posts.js';
import bcrypt from 'bcrypt';

const app=express();

app.use(cors());
app.use(express.json());

app.listen(3002,()=>{
    console.log("Server Connected...")
})

const conStr="mongodb+srv://admin:admin123@postitapp-cluster.xezkj0z.mongodb.net/PostITAppDB-S2?appName=PostITApp-Cluster"
mongoose.connect(conStr)
        .then(()=>{console.log("Database Connected..")})
        .catch(error=>{console.log("Database Error..."+error)});

// http://localhost:3002/getUsers
app.get("/getUsers",async(req,res)=>{
    try{
        const users=await UserModel.find({});
        res.send(users);
    }
    catch(error){
        res.send("Read Error..."+error);
    }
});

app.post("/register",async(req,res)=>{
    try{
        const {username,email,password,profilepic}=req.body;
        const user=await UserModel.findOne({email:email});
        if(user)
            res.send({message:"User Exists"});
        else
            {
                const hpwd=await bcrypt.hash(password,10);
                const newuser=new UserModel({username,email,password:hpwd,profilepic});
                newuser.save();
                res.send({message:"User Registered"});
            }
    }
    catch(error){
        res.send("Read Error..."+error);
    }
});
app.post("/login",async(req,res)=>{
    try{
        const {email,password}=req.body;
        const user=await UserModel.findOne({email:email});
        if(user){
            const match=await bcrypt.compare(password,user.password);
            if(match)
                res.send({user:user,message:"success"});
            else
                res.send({message:"Invalid Credentials"});
        } 
        else
            {
                res.send({message:"Invalid Credentials"});
            }
    }
    catch(error){
        res.send("Read Error..."+error);
    }
});

app.post("/savePost",async(req,res)=>{
    try{
        //const {postMsg,email,lat,lng}=req.body;
        const newpost=new PostModel(req.body);
        newpost.save();
        res.send({message:"Message Posted"});
    }
    catch(error){
        res.send("Read Error..."+error);
    }
});
app.get("/getPosts",async(req,res)=>{
    try{
        const postsWithUser=await PostModel.aggregate([
            {
                $lookup:{
                    from:"UsersTbl",
                    localField:"email",
                    foreignField:"email",
                    as:"user"
                }
            },
            {
                $sort:{createdAt:-1}
            },
            {
                "$project":{
                   "user.email" :0,
                   "user.password":0
                }
            }
        ]);
        res.send({posts:postsWithUser});
    }
    catch(error){
        res.send("Read Error..."+error);
    }
});
app.delete("/delPost/:postid",async(req,res)=>{
    try{
        const postid=req.params.postid;
        const del=await PostModel.findOneAndDelete({_id:postid});
        if(del)
            res.send("Message Deleted");
        else
            res.send("Message Not Deleted");
    }
    catch(error){
        res.send("Read Error..."+error);
    }
});
app.put("/updPost",async(req,res)=>{
    try{
        console.log(req.body);
        const {postMsg,postid}=req.body;
        const post=await PostModel.findOne({_id:postid});
        post.postMsg=postMsg;
        await post.save();
        res.send("Message Updated");
    }
    catch(error){
        res.send("Read Error..."+error);
    }
});