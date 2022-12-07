import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authAPI from '../services/authAPI'
import localService from '../services/localService'

const initialState = {
    user: localService.user.get(),
    loading: false,
    error: false
}

export const login = createAsyncThunk(
    "auth/login",
    async (values) => {
        try {
            const data = await authAPI.login(values)

            // eslint-disable-next-line no-throw-literal
            if (data.maLoaiNguoiDung !== 'QuanTri') throw 'Account not have admin rights'
            localService.user.set(data)

            return data
        } catch (error) {
            throw error
        }
    }
)


const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state, action) => {
            localService.user.remove()
            localService.theme.remove()

            return { ...state, user: null }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(login.pending, (state, action) => {
            return { ...state, loading: true, error: false }
        })

        builder.addCase(login.fulfilled, (state, action) => {
            return { ...state, loading: false, error: false, user: action.payload }
        })

        builder.addCase(login.rejected, (state, action) => {
            return { ...state, loading: false, error: action.error.message, user: null }
        })
    }
})


export default authSlice.reducer

export const { logout } = authSlice.actions