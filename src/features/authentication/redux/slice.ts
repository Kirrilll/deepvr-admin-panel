import { createSlice } from "@reduxjs/toolkit";

interface AuthenticationState{
    isAuthenticated: boolean,
    authToken?: string;
}

const initialState: AuthenticationState = {
    isAuthenticated: false
};

const authenticationSlice = createSlice({
    name: 'authenticationSlice',
    initialState: initialState,
    reducers: {
        login: (state) => {
            state.isAuthenticated = true;
        },
        logout: (state) => {
            state.isAuthenticated = false;
        },
        setToken: (state, action) => {
            state.authToken = action.payload;
        }
    }
});

export const getToken = (state: AuthenticationState) => state.authToken; 

export const {login, logout, setToken} = authenticationSlice.actions;
export default authenticationSlice.reducer;