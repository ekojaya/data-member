import { createAsyncThunk } from "@reduxjs/toolkit";
import dataBase from "../FirestoreConfig";

export const getData = createAsyncThunk("/", async (_, { rejectWithValue }) => {
  try {
    const Datas = [];
    const datasRef = dataBase.collection("data");
    const querySnapshot = await datasRef.orderBy("name").get();
    querySnapshot.forEach((doc) =>
      Datas.push({
        id: doc.id,
        name: doc.data().name,
        country: doc.data().country,
        birth: doc.data().birth,
        created_at: doc.data().created_at,
        IsChecked: false,
      })
    );
    console.log(Datas);
    return Datas;
  } catch (error) {
    console.log(error);
    return rejectWithValue(error.message);
  }
});

export const addData = createAsyncThunk(
  "/",
  async ({ name, country, birth }, { rejectWithValue }) => {
    try {
      var created_at = new Date()
        .toLocaleString("en-us", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })
        .replace(/(\d+)\/(\d+)\/(\d+)/, "$3-$1-$2");

      dataBase.collection("data").add({
        name,
        country,
        birth,
        created_at,
      });
    } catch (err) {
      console.log(err);
      return rejectWithValue(err.message);
    }
  }
);

export const updateData = createAsyncThunk(
  "/",
  async ({ name, country, birth, id, created_at }, { rejectWithValue }) => {
    try {
      dataBase.collection("data").doc(id).update({
        name,
        country,
        birth,
        created_at,
      });
    } catch (err) {
      console.log(err);
      return rejectWithValue(err.message);
    }
  }
);

export const removeData = createAsyncThunk(
  "/",
  async (id, { rejectWithValue }) => {
    try {
      dataBase.collection("data").doc(id).delete();
    } catch (err) {
      console.log(err);
      return rejectWithValue(err.message);
    }
  }
);
