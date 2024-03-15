import menuSlice from "./reducers/menuSlice";

const { configureStore } = require("@reduxjs/toolkit");

export const store = configureStore({
    reducer:{
        menu: menuSlice
    }
})
