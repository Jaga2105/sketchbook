const { MENU_ITEMS } = require("@/constants");
const { createSlice } = require("@reduxjs/toolkit");

const initialState={
    activeMenuItem: MENU_ITEMS.PENCIL,
    actionMenuItem: null
}

const menuSlice = createSlice({
    name:"menu",
    initialState,
    reducers:{
        menuItemCLick: (state, action)=>{
            state.activeMenuItem=action.payload;
        },
        actionItemClick: (state, action) => {
            state.actionMenuItem = action.payload;
        }
    }
})

export const {menuItemCLick, actionItemClick} = menuSlice.actions;
export default menuSlice.reducer;