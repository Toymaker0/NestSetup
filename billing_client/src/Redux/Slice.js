import { createSlice } from "@reduxjs/toolkit";


const initialState={
    user:0
  }

  const slice =createSlice({
    name:'AutherSlies',
    initialState,
    reducers:{
      setUserData:(state,action)=>{
         // console.log(action.payload);
          const userData=action.payload
          state.userData=userData
        },
        removeUserId:(state,action)=>{

        }
    }
  })

  export const {setUserData,removeUserId}=slice.actions
  export default slice.reducer