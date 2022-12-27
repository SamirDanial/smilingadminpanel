import { createSlice } from '@reduxjs/toolkit'
import { IApplicationWideDetail } from '../interfaces/applicationWideDetail.action.interface'
import { IInitialStateApplicationWideDetail } from '../interfaces/applicationWideDetail.slice.interface'

const initialState: IInitialStateApplicationWideDetail = {
  show: false,
  tableData: null,
}

const appWideDetail = createSlice({
  name: 'appWideDetail',
  initialState,
  reducers: {
    showDetail: (
      state: IInitialStateApplicationWideDetail,
      action: IApplicationWideDetail,
    ) => {
      return {
        ...state,
        show: true,
        tableData: action.payload.tableData,
      }
    },
    hideDetail: (
      state: IInitialStateApplicationWideDetail,
      action: IApplicationWideDetail,
    ) => {
      return {
        ...state,
        show: false,
        tableData: null,
      }
    },
  },
})

export const appWideDetailActions = appWideDetail.actions

export default appWideDetail.reducer
