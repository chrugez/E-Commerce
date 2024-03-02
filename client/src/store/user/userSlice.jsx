import { createSlice } from "@reduxjs/toolkit";
import * as actions from './asyncActions'

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        isLoggedIn: null,
        current: null,
        token: null
    },
    reducers: {
        login: (state, action)=>{
            state.isLoggedIn = action.payload.isLoggedIn 
            // state.current = action.payload.userData
            state.token = action.payload.token
        },
        logout: (state, action)=>{
            state.isLoggedIn = false
            state.token = null
        }
    },
    extraReducers: (builder) => {
        builder.addCase(actions.getCurrent.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(actions.getCurrent.fulfilled, (state, action) => {
            state.isLoading = false
            state.current = action.payload
        })
        builder.addCase(actions.getCurrent.rejected, (state, action) => {
            state.isLoading = false
            state.current = null
        })
    }
})
export const { login, logout } = userSlice.actions

export default userSlice.reducer