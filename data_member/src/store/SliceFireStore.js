import { createSlice } from "@reduxjs/toolkit";
import { addData, getData, removeData, updateData } from "./ThunkData";
const initialState = {
  datas: [],
  events: [],
  loading: false,
  success: false,
  error: null,
};

const SliceFireStore = createSlice({
  name: "data1",
  initialState,
  reducers: {
    clear: (state) => initialState,
  },
  extraReducers: {
    //add data
    [addData.pending]: (state) => {
      state.loading = true;
    },
    [addData.fulfilled]: (state, action) => {
      state.loading = true;
      state.datas = action.payload;
    },
    [addData.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    //get data
    [getData.pending]: (state) => {
      state.loading = true;
    },
    [getData.fulfilled]: (state, action) => {
      state.datas = action.payload;
      state.loading = true;
      state.success = true;
      state.error = null;
    },
    [getData.rejected]: (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    },
    //update data
    [updateData.pending]: (state) => {
      state.loading = true;
    },
    [updateData.fulfilled]: (state, action) => {
      state.datas = action.payload;
      state.loading = true;
      state.success = true;
      state.error = null;
    },
    [updateData.rejected]: (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    },
    //remove data
    [removeData.pending]: (state) => {
      state.loading = true;
    },
    [removeData.fulfilled]: (state, action) => {
      state.data = action.payload;

      state.datas = action.payload;
      state.loading = true;
      state.success = true;
      state.error = null;
    },
    [removeData.rejected]: (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    },
  },
});

export const actions = {
  ...SliceFireStore.actions,
  addData,
  getData,
  removeData,
  updateData,
};
export const reducer = SliceFireStore.reducer;
