import { createSlice } from "@reduxjs/toolkit";

const SliceData = createSlice({
  name: "data",
  initialState: {
    data: [
      {
        id: 1,
        name: "eko Sanjaya",
        birth: "1995-07-15",
        country: "indonesia",
        created_at: "1995-02-07",
      },
    ],
    dataDelete: [],
  },
  reducers: {
    ADD_DATA: {
      reducer(state, action) {
        const formdata = action.payload;
        return {
          ...state,
          data: [...state.data, formdata],
        };
      },
    },
    REMOVE_DATA: {
      reducer(state, action) {
        return {
          ...state,
          data: state.data.filter((data1) => data1.id !== action.payload),
        };
      },
    },

    UPDATE_DATA: {
      reducer(state, action) {
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
    },
    DATA_DELETE_F: {
      reducer(state, action) {
        const data_delete = action.payload;
        return {
          ...state,
          dataDelete: data_delete,
        };
      },
    },
  },
});
const { actions, reducer } = SliceData;
console.log(this);
export const { ADD_DATA, UPDATE_DATA, DATA_DELETE_F, REMOVE_DATA } = actions;
export default reducer;
