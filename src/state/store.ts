import { configureStore } from '@reduxjs/toolkit';
import boardReducer from './board/boardSlice'
import shipsReducer from './ship/shipSlice'
import strikeReducer from './strike/strikeSlice'






export const store = configureStore({
    reducer: {
        board : boardReducer,
        ships: shipsReducer,
        strike:strikeReducer,

    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>