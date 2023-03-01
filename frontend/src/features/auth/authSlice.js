// deal with reducer and initial state

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from '../../services/authService'
// If you want to use json web token
const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
  user: user ? user : null,
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: '',
}

// Register user (deal with async function/ backround process)
// first argument with string name of the action
// second argument is a function that accepts two arguments: user payload and thunkAPI
export const register = createAsyncThunk(
  'auth/registerUser',
  async (user, thunkAPI) => {
    try {
      //payload coming from register function in authService
      return await authService.register(user)
    } catch (error) {
      const message =
        (error.response && error.response.data.message) ||
        error.message ||
        error.toString()
      // thunkAPI.rejectWithValue is a function that returns a rejected action with the given payload
      return thunkAPI.rejectWithValue(message)
    }
  }
)

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
  // Accounting for the pending state, fulfilled state, and rejected state goes in extraReducers since its a AsyncThunk function
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true
      })
      .addCase(register.fulfilled, (state, action) => {
        state.Loading = false
        state.isSuccess = true

        state.user = action.payload
      })

      .addCase(register.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.user = null
      })
  },
})
// exporting reset inside the authSlice that way we can bring reset into components where we want to be fired off
export const { reset } = authSlice.actions
export default authSlice.reducer
