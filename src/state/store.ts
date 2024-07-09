import { configureStore } from '@reduxjs/toolkit';
import boardReducer,{BoardState} from './board/boardSlice'
import shipsReducer,{ShipState} from './ship/shipSlice'
import strikeReducer,{StrikeState} from './strike/strikeSlice'





export const store = configureStore({
    reducer: {
        board : boardReducer,
        ships: shipsReducer,
        strike:strikeReducer
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>