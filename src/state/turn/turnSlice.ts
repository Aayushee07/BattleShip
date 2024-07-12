import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TurnState {
    isTurn:boolean 
    playerId:string | null
}

const initialState: TurnState = {
  isTurn : false,
  playerId : null
};

const turnSlice = createSlice({
  name: 'turn',
  initialState,
  reducers: {
    setTurn(state, action: PayloadAction<{ isTurn: boolean; playerId: string }>) {
        state.playerId = action.payload.playerId;
        state.isTurn = action.payload.isTurn;
    }
  },
});

export const { setTurn } = turnSlice.actions;
export default turnSlice.reducer;
export type { TurnState };
