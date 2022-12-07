import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import theaterAPI from '../services/theaterAPI'

const initialState = {
    theaters: [],
    selectedTheater: [],
    loading: false,
    error: false
}

export const getTheater = createAsyncThunk(
    "theater/getTheater",
    async () => {
        try {
            const data = await theaterAPI.getTheater
            return data
        } catch (error) {
            throw error
        }
    }
)

export const getTheaterDetail = createAsyncThunk(
    "theater/getTheaterDetail",
    async (maHeThongRap) => {
        try {
            const data = await theaterAPI.getTheaterCenters(maHeThongRap)
            return data
        } catch (error) {
            throw error
        }
    }
)

const theaterSlice = createSlice({
    name: "theater",
    initialState,
    extraReducers: (builder) => {
        // lấy thông tin các hệ thống rạp
        builder.addCase(getTheater.pending, (state, action) => {
            return { ...state, loading: true, error: false }
        })

        builder.addCase(getTheater.fulfilled, (state, action) => {
            return { ...state, loading: false, error: false, theaters: action.payload }
        })

        builder.addCase(getTheater.rejected, (state, action) => {
            return { ...state, loading: false, error: action.error.message, theaters: [] }
        })

        // lấy thông tin cụm rạp theo hệ thống
        builder.addCase(getTheaterDetail.fulfilled, (state, action) => {
            return { ...state, loading: false, error: false, selectedTheater: action.payload }
        })
    }
})

export default theaterSlice.reducer