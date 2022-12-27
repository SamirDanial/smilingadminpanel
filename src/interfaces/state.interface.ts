import { IInitalStateApplicationWide } from './applicationWide.slice.interface'
import { IInitialStateApplicationWideDetail } from './applicationWideDetail.slice.interface'
import { IAuth } from './auth.slice.interface'

export interface IState {
  appWideDetail: IInitialStateApplicationWideDetail
  appWide: IInitalStateApplicationWide
  auth: IAuth
}
