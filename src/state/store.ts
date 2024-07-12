import { configureStore } from '@reduxjs/toolkit';
import boardReducer from './board/boardSlice'
import shipsReducer from './ship/shipSlice'
import strikeReducer from './strike/strikeSlice'
import sessionReducer from './session/sessionSlice';
import turnReducer from './turn/turnSlice'






export const store = configureStore({
    reducer: {
        board : boardReducer,
        ships: shipsReducer,
        strike:strikeReducer,
        session: sessionReducer,
        turn : turnReducer

    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>