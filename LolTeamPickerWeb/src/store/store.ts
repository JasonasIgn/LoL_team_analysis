import { configureStore } from '@reduxjs/toolkit'
import matchupsReducer from './features/matchups/matchupSlice'
import messagesReducer from './features/messages/messagesSlice'
import championsReducer from './features/champions/championsSlice'

export default configureStore({
  reducer: {
    matchups: matchupsReducer,
    messages: messagesReducer,
    champions: championsReducer,
  }
})