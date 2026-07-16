import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: { token: null, username: null, isConnected: false },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.value = { ...action.payload, isConnected: true };
    },
    logout: (state) => {
      state.value = initialState.value;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;