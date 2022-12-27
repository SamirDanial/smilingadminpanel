import { createSlice } from '@reduxjs/toolkit'
import { IApplicationWideAction } from '../interfaces/applicationWide.action.interface'
import { IInitalStateApplicationWide } from '../interfaces/applicationWide.slice.interface'

const initialState: IInitalStateApplicationWide = {
  message: '',
  secondaryMessage: '',
  bgColor: '',
  borderColor: '',
  textColor: '',
  show: false,
  fromTop: '',
  status: '',
}

const appWideSlice = createSlice({
  name: 'appWide',
  initialState,
  reducers: {
    showMessage: (
      state: IInitalStateApplicationWide,
      action: IApplicationWideAction,
    ) => {
      return {
        ...state,
        message: action.payload.message,
        secondaryMessage: action.payload.secondaryMessage,
        bgColor: action.payload.bgColor,
        borderColor: action.payload.borderColor,
        textColor: action.payload.textColor,
        fromTop: action.payload.fromTop,
        show: true,
        status: action.payload.status,
      }
    },
    hideMessage: (state: IInitalStateApplicationWide) => {
      return {
        ...state,
        message: '',
        secondaryMessage: '',
        bgColor: '',
        borderColor: '',
        textColor: '',
        indicator: null,
        fromTop: '',
        icon: null,
        show: false,
        status: '',
      }
    },
  },
})

export const appWideActions = appWideSlice.actions

export default appWideSlice.reducer
