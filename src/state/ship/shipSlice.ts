import { createSlice,PayloadAction } from "@reduxjs/toolkit";

interface Ship {
    id: number;
    length: number;
    width: number;
    show: boolean;
    position: { row: number; col: number }[]; 
}

interface ShipState {
    ships : Ship[];
}

const initialState : ShipState = {

    ships: [
        { id: 1, length: 3, width: 1, show: true , position:[]},
        { id: 2, length: 2, width: 1, show: true,position:[] },
        { id: 3, length: 1, width: 1, show: true ,position:[]}
    ]
    

}

const shipSlice = createSlice({
    name:"ships",
    initialState,
    reducers :{

        setShow:(state,action:PayloadAction<number>)=>{
         const ship = state.ships.find(ship => ship.id === action.payload)
         if(ship){
            ship.show = !(ship.show)
         }
        },
        setPosition: (state, action: PayloadAction<{ id: number;position: { row: number; col: number } }>) => {
            const ship = state.ships.find(ship => ship.id === action.payload.id);
            if (ship) {
                ship.position?.push(action.payload.position);
            }
            
        },
    }})

export const {setShow,setPosition} = shipSlice.actions
export default shipSlice.reducer
export type{ShipState}