import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SessionState {
  sessionId: string;
  playerId: string;
}

const initialState: SessionState = {
  sessionId: '',
  playerId: Date.now().toString(), 
};

const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    setSessionId: (state, action: PayloadAction<string>) => {
      state.sessionId = action.payload;
    },
    setPlayerId: (state, action: PayloadAction<string>) => {
      state.playerId = action.payload;
    },
    generatePlayerId: (state) => {
      state.playerId = Date.now().toString();
    },
  },
});

export const { setSessionId, setPlayerId, generatePlayerId } = sessionSlice.actions;
export default sessionSlice.reducer;
export type{SessionState}
