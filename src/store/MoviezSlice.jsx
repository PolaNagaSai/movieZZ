import { createSlice } from "@reduxjs/toolkit";

const initialState={
    bannerData:[],
    imgUrl:''
}

export const moviezSlice=createSlice({
    name:'moviez',
    initialState,
    reducers:{
        setBannerData:(state,action)=>{
            state.bannerData=action.payload
        },
        setImgUrl:(state,action)=>{
            state.imgUrl=action.payload
        }
    }
})

export const{setBannerData,setImgUrl}=moviezSlice.actions

export default moviezSlice.reducer