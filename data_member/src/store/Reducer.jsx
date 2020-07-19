import { createReducer, createAction } from "@reduxjs/toolkit";

const ADD_DATA = createAction("ADD_DATA");
const REMOVE_DATA = createAction("REMOVE_DATA");
const UPDATE_DATA = createAction("UPDATE_DATA");
const DATA_DELETE_F = createAction("DATA_DELETE_F");
const initialState = {
  data: [
    {
      id: 1,
      name: "eko",
      birth: "1995-07-15",
      country: "indonesia",
      created_at: "1995-02-07",
    },
  ],
  dataDelete: [],
};

const rootReducer = createReducer(initialState, {
  [ADD_DATA]: (state, action) => {
    const formdata = action.payload;
    return {
      ...state,
      data: [...state.data, formdata],
    };
  },
  [REMOVE_DATA]: (state, action) => {
    return {
      ...state,
      data: state.data.filter((data1) => data1.id !== action.payload),
    };
  },
  [UPDATE_DATA]: (state, action) => {
    const data_update = action.payload;
    const formdata_new = state.data.map((data1) => {
      if (data1.id === data_update.id) {
        return data_update;
      } else {
        return data1;
      }
    });
    return {
      ...state,
      data: formdata_new,
    };
  },
  //data id for delete data in firestore
  [DATA_DELETE_F]: (state, action) => {
    const data_delete = action.payload;
    return {
      ...state,
      dataDelete: data_delete,
    };
  },
});

export { rootReducer };
