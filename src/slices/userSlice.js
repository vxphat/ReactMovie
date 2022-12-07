import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import userAPI from '../services/userAPI'

const initialState = {
    users: [],
    selectedUser: {},
    loading: false,
    error: false
}

export const getUsers = createAsyncThunk(
    "user/getUsers",
    async (tuKhoa) => {
        try {
            const data = await userAPI.getUsers(tuKhoa)
            return data
        } catch (error) {
            throw error
        }
    }
)

export const getUserInfo = createAsyncThunk(
    "user/getUserInfo",
    async (id) => {
        try {
            const data = await userAPI.getUserInfo(id)
            console.log(data)
            return data
        } catch (error) {
            throw error
        }
    }
)

export const deleteUser = createAsyncThunk(
    "user/delete",
    async (id) => {
        try {
            const message = await userAPI.deleteUser(id)
            return message
        } catch (error) {
            throw error
        }
    }
)

const userSlice = createSlice({
    name: "user",
    initialState,
    extraReducers: (builder) => {
        // get all user action
        builder.addCase(getUsers.pending, (state, action) => {
            return { ...state, loading: true, error: false }
        })

        builder.addCase(getUsers.fulfilled, (state, action) => {
            return { ...state, loading: false, users: action.payload }
        })

        builder.addCase(getUsers.rejected, (state, action) => {
            return { ...state, loading: false, error: action.error.message, users: [] }
        })

        // get user information action
        builder.addCase(getUserInfo.pending, (state, action) => {
            return { ...state, loading: true, error: false }
        })

        builder.addCase(getUserInfo.fulfilled, (state, action) => {
            return { ...state, loading: false, selectedUser: action.payload }
        })

        builder.addCase(getUserInfo.rejected, (state, action) => {
            return { ...state, loading: false, error: action.error.message, selectedUser: {} }
        })

        // delete user action
        builder.addCase(deleteUser.pending, (state, action) => {
            return { ...state, loading: true, error: false }
        })

        builder.addCase(deleteUser.fulfilled, (state, action) => {
            return { ...state, loading: false }
        })

        builder.addCase(deleteUser.rejected, (state, action) => {
            return { ...state, loading: false }
        })
    }
})


export default userSlice.reducer