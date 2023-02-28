// deal with reducer and initial state
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// If you want to use json web token
const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
  user: user ? user : null,
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: '',
}
// createSlice function accepts an initial state, an object of reducer functions, and a "slice name", and automatically generates action creators and action types that correspond to the reducers and state.
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  // This gonna be non-async function or non-AsyncThunk function
  reducers: {
    //reset function resets the state to default values or dispatch it to the store when we want to reset the state
    reset: (state) => {
      state.user = null
      state.isError = false
      state.isLoading = false
      state.isSuccess = false
      state.message = ''
    },
  },
  extraReducers: () => {},
})
// exporting reset inside the authSlice that way we can bring reset into components where we want to be fired off
export const { reset } = authSlice.actions
export default authSlice.reducer
