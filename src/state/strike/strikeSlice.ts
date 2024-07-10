// strikeSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface StrikeState {
  strikes: { row: number; col: number }[];
  strikeResults: { row: number; col: number; isHit: boolean }[];
}

const initialState: StrikeState = {
  strikes: [],
  strikeResults: [],
};

const strikeSlice = createSlice({
  name: 'strike',
  initialState,
  reducers: {
    setStrike(state, action: PayloadAction<{ row: number; col: number }>) {
      state.strikes.push(action.payload);
    },
    setStrikeResult(state, action: PayloadAction<{ row: number; col: number; isHit: boolean }>) {
      state.strikeResults.push(action.payload);
    },
  },
});

export const { setStrike, setStrikeResult } = strikeSlice.actions;

export default strikeSlice.reducer;
export type {StrikeState}
