import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
 
const initialState={
   posts:[],
   status:"idle",
   isLoading:false,
   isSuccess:false,
   isError:false
}
 
export const getPosts=createAsyncThunk("post/getPosts",async()=>{
    try{
        const response=await axios.get("http://localhost:3002/getPosts");
        return response.data.posts;
    }
    catch(error){
        console.log("Server Error.."+error)
    }
});

export const delPost=createAsyncThunk("post/delPost",async(postid)=>{
    try{
        const response=await axios.delete(`http://localhost:3002/delPost/${postid}`);
        return response.data;
    }
    catch(error){
        console.log("Server Error.."+error)
    }
});

export const updPost=createAsyncThunk("post/updPost",async(pdata)=>{
    try{
        const response=await axios.put("http://localhost:3002/updPost",pdata);
        return response.data;
    }
    catch(error){
        console.log("Server Error.."+error)
    }
});

export const PostSlice=createSlice({
    name:"post",
    initialState,
    extraReducers:(builder)=>{
        builder.addCase(getPosts.pending,(state)=>{
            state.isLoading=true;
            state.status="loading";
        })
        .addCase(getPosts.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isSuccess=true;
            state.status="loaded";
            state.posts=action.payload;
        })
        .addCase(getPosts.rejected,(state)=>{
            state.isLoading=false;
            state.isError=true;
            state.status="rejected";
        })
        .addCase(delPost.pending,(state)=>{
            state.isLoading=true;
            state.status="pending";
        })
        .addCase(delPost.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isSuccess=true;
            state.status="deleted";
            state.message=action.payload;
        })
        .addCase(delPost.rejected,(state)=>{
            state.isLoading=false;
            state.isError=true;
            state.status="rejected";
        })
        .addCase(updPost.pending,(state)=>{
            state.isLoading=true;
            state.status="pending";
        })
        .addCase(updPost.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isSuccess=true;
            state.status="updated";
            state.message=action.payload;
        })
        .addCase(updPost.rejected,(state)=>{
            state.isLoading=false;
            state.isError=true;
            state.status="rejected";
        })
    } 
});
 
export default PostSlice.reducer;
 