const { MENU_ITEMS } = require("@/constants");
const { createSlice } = require("@reduxjs/toolkit");

const initialState={
    activeMenuItem: MENU_ITEMS.PENCIL
}

const menuSlice = createSlice({
    name:"menu",
    initialState,
    reducers:{
        menuItemCLick: (state, action)=>{
            state.activeMenuItem=action.payload
        }
    }
})

export const {menuItemCLick} = menuSlice.actions;
export default menuSlice.reducer;