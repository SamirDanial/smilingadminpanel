import { createSlice } from '@reduxjs/toolkit'
import { IAuth } from '../interfaces/auth.slice.interface'

const initialState: IAuth = {
  auth: false,
  loggedOut: false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state: IAuth) => {
      return {
        ...state,
        auth: true,
      }
    },
    logout: (state: IAuth) => {
      return {
        ...state,
        auth: false,
        loggedOut: true,
      }
    },
    initialValue: (state: IAuth) => {
      return {
        ...state,
        loggedOut: false,
      }
    },
  },
})

export const authActions = authSlice.actions

export default authSlice.reducer
