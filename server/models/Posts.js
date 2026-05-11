import mongoose from "mongoose";

const PostSchema=mongoose.Schema({
    email:{type:String,require:true},
    postMsg:{type:String,require:true},
    lat:{type:Number},
    lng:{type:Number},
    likes:{users:{type:[String],default:[]}},
    comments:{users:{type:[String],default:[]}}
    },
    {timestamps:{createdAt:true,updatedAt:false}}
);

const PostModel=mongoose.model("PostsTbl", PostSchema,"PostsTbl")
export default PostModel;