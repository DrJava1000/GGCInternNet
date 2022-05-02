import { createSlice } from '@reduxjs/toolkit'

// Define an authentication slice for creating a reducer
// that can be used to store user id/role
export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    id: "No ID",
    role: "No Role",
    isLoggedIn: false
  },
  reducers: {
    setCurrentUserID: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.id = action.payload;
    },
    setCurrentUserRole: (state, action) => {
      state.role = action.payload;
    },
    setLoginStatus: (state, action) => {
      state.isLoggedIn = action.payload;
    }
  },
})

// Action creators are generated for user's id and role
export const { setCurrentUserID, setCurrentUserRole, setLoginStatus } = authSlice.actions
export default authSlice.reducer