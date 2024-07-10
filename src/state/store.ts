import { configureStore } from '@reduxjs/toolkit';
import boardReducer from './board/boardSlice'
import shipsReducer from './ship/shipSlice'
import strikeReducer from './strike/strikeSlice'
import sessionReducer from './session/sessionSlice';






export const store = configureStore({
    reducer: {
        board : boardReducer,
        ships: shipsReducer,
        strike:strikeReducer,
        session: sessionReducer,

    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>