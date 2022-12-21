import { createSlice } from "@reduxjs/toolkit"

interface AuthenticationState{
    isAuthenticated: boolean
}

const initialState: AuthenticationState = {
    isAuthenticated: false
}

const authenticationSlice = createSlice({
    name: 'authenticationSlice',
    initialState: initialState,
    reducers: {
        login: (state) => {
            state.isAuthenticated = true;
        },
        logout: (state) => {
            state.isAuthenticated = false;
        }
    }
})

export const {login, logout} = authenticationSlice.actions;
export default authenticationSlice.reducer;