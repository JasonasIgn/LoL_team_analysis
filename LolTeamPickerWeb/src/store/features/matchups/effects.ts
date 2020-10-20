import { AppState } from '../../types'
import { increaseCollectedMatchups } from './matchupSlice'

export const collectMatchup = () => (dispatch: any, getStore: () => AppState) => {
    setTimeout(() => {dispatch(increaseCollectedMatchups())}, 1000)
}