import Axios from 'axios'
import { apiUrls } from '../../../api.config'
import { AppState } from '../../types'
import { addMessage } from '../messages/messagesSlice'
import { increaseCollectedMatchups } from './matchupSlice'

export const collectMatchup = () => async (dispatch: any, getState: () => AppState) => {
    const collectedMatchupsCount = getState().matchups.matchupsCollected
    dispatch(addMessage(`Collecting matchup #${collectedMatchupsCount + 1} ...`))
    try {
        const response = await Axios.request({url: apiUrls.collectMatchup, method: 'GET'})
        dispatch(increaseCollectedMatchups())
        dispatch(addMessage(`Matchup #${collectedMatchupsCount + 1} collected!`))
    }
    catch(e)
    {
        dispatch(addMessage("Failed!"))
    }
}