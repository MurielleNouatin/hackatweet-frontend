import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: {
        firstname: null,
        username: null,
        token: null,
    },
};

export const userInfosSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addUserInfos: (state, action) => {
            state.value.firstname = action.payload.firstname;
            state.value.username = action.payload.username;
            state.value.token = action.payload.token;
        },
    },
});

export const { addUserInfosToStore } = userSlice.actions;
export default userSlice.reducer;