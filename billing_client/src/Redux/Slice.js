import { createSlice } from "@reduxjs/toolkit";


const initialState={
    user:0
  }

  const slice =createSlice({
    name:'AutherSlies',
    initialState,
    reducers:{
      setUserId:(state,action)=>{
         // console.log(action.payload);
          const userId=action.payload
          state.Id=userId
        },
        removeUserId:(state,action)=>{

        }
    }
  })

  export const {setUserId,removeUserId}=slice.actions
  export default slice.reducer