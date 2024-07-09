import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface BoardState {
    playerGrid: Array<Array<string | null>>;
    opponentGrid: Array<Array<string | null>>;
}

const initialState: BoardState = {
    playerGrid: Array.from({ length: 5 }, () => Array.from({ length: 5 }, () => null)),
    opponentGrid: Array.from({ length: 5 }, () => Array.from({ length: 5 }, () => null)),
};

const boardSlice = createSlice({
    name: "board",
    initialState,
    reducers: {
        setPlayerGrid: (state, action: PayloadAction<Array<Array<string | null>>>) => {
            state.playerGrid = action.payload;
        },
        setOpponentGrid: (state, action: PayloadAction<Array<Array<string | null>>>) => {
            state.opponentGrid = action.payload;
        },
    },
});

export default boardSlice.reducer;
export const { setPlayerGrid, setOpponentGrid } = boardSlice.actions;
export type { BoardState };
