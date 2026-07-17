import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: "",
};

export const tweetDraftSlice = createSlice({
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

export const { setDraft, clearDraft } = tweetDraftSlice.actions;
export default tweetDraftSlice.reducer;
