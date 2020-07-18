const initialState = {
  data: [],
  dataDelete: [],
};
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_DATA":
      const formdata = action.payload;
      return {
        ...state,

        data: [...state.data, formdata],
      };

    case "REMOVE_DATA":
      return {
        ...state,
        data: state.data.filter((data1) => data1.id !== action.payload),
      };

    case "UPDATE_DATA":
      const formdata_update = action.payload;
      const formdata_new = state.data.map((data1) => {
        if (data1.id === formdata_update.id) {
          return formdata_update;
        } else {
          return data1;
        }
      });
      return {
        ...state,
        data: formdata_new,
      };
    //data id for delete data in direstore
    case "DATA_DELETE_F":
      const data_delete = action.payload;
      return {
        ...state,

        dataDelete: data_delete,
      };

    default:
      return state;
  }
};

export { rootReducer };
