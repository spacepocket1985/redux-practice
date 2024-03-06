import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StatusBarMessagePropsType } from "../../components/UI/StatusBarMessage";

type MainSliceStateType = {
  statusMessage: StatusBarMessagePropsType
};

const initialState: MainSliceStateType = {
  statusMessage: {
    status: null,
    title: null,
    message: null,
  },
};

const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    showStatusMessage: (state,action: PayloadAction<StatusBarMessagePropsType>)=>{
      state.statusMessage = {
        status: action.payload.status,
        title: action.payload.title,
        message: action.payload.message
      }

    }
  }
})

export const mainActions = mainSlice.actions;
export default mainSlice.reducer;
