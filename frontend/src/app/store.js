import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
// The store now has redux-thunk added in and the Redux DevTools Extension is turned on
//ReduxThunk middleware for Redux. It allows writing functions with logic inside that can interact with a Redux store's dispatch and getState methods.
export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
})
