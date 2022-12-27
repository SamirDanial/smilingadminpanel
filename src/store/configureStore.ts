import { configureStore } from '@reduxjs/toolkit'
import { appWideReducer, authReducer, appWideDetailReducer } from './index'

const store = configureStore({
  reducer: {
    appWide: appWideReducer,
    auth: authReducer,
    appWideDetail: appWideDetailReducer,
  },
})

export default store
