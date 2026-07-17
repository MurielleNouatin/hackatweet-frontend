import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: "",
};

export const tweetSlice = createSlice({
  name: "tweetDraft",
  initialState,
  reducers: {
    setDraft: (state, action) => {
      state.value = action.payload;
    },
    clearDraft: (state) => {
      state.value = "";
    },
  },
});

export const { setDraft, clearDraft } = tweetSlice.actions;
export default tweetDraftSlice.reducer;
