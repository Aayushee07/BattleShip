// strikeSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface StrikeState {
  strikes: { row: number; col: number }[];
  strikeResults: { row: number; col: number; result: string }[];
  damageResults: { row: number; col: number,session:string,player:string }[];
}

const initialState: StrikeState = {
  strikes: [],
  strikeResults: [],
  damageResults: [],
};

const strikeSlice = createSlice({
  name: 'strike',
  initialState,
  reducers: {
    setStrike(state, action: PayloadAction<{ row: number; col: number }>) {
      state.strikes.push(action.payload);
    },
    setStrikeResult(state, action: PayloadAction<{ row: number; col: number; result: string }>) {
      state.strikeResults.push(action.payload);
    },
    setDamageResult(state, action: PayloadAction<{ row: number; col: number ,session:string,player:string}>) {
      state.damageResults.push(action.payload);
    },
  },
});

export const { setStrike, setStrikeResult, setDamageResult } = strikeSlice.actions;

export default strikeSlice.reducer;
export type { StrikeState };
