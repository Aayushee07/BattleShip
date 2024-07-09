import { createSlice,PayloadAction } from "@reduxjs/toolkit";

interface StrikeState {
    strikePositions:{ row: number; col: number }[]; 
}


const initialState:StrikeState = {
    strikePositions:[]
}

const strikeSlice = createSlice({
    name:"strike",
    initialState,
    reducers:{
        setStrike: (state, action: PayloadAction<{ row: number; col: number }>) => {
            state.strikePositions.push(action.payload)
        }
}
})

export const {setStrike} = strikeSlice.actions
export default strikeSlice.reducer
export type {StrikeState}