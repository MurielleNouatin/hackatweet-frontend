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

// 🔥 Correction ici : on exporte depuis userInfosSlice
export const { addUserInfos } = userInfosSlice.actions;
export default userInfosSlice.reducer;
