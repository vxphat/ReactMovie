import { configureStore } from '@reduxjs/toolkit'
import auth from './slices/authSlice'
import user from './slices/userSlice'
import movie from './slices/movieSlice'

const store = configureStore({
    reducer: {
        auth,
        user,
        movie
    }
})

export default store