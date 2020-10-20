import { MatchupsState } from './features/matchups/matchupSlice'
import { MessagesState } from './features/messages/messagesSlice';

export interface AppState {
    matchups: MatchupsState
    messages: MessagesState
} 