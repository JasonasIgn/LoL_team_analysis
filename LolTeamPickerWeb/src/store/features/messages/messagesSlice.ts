import { createSlice } from '@reduxjs/toolkit'

export interface MessagesState {
  messages: string[];
}

const messagesInitialState: MessagesState = {
  messages: [],
}

export const messagesSlice = createSlice({
  name: 'messages',
  initialState: messagesInitialState,
  reducers: {
    addMessage: (state, action) => {
      state.messages.push(action.payload)
    },
  }
})

export const { addMessage } = messagesSlice.actions

export default messagesSlice.reducer