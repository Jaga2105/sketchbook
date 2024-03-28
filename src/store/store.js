import menuSlice from "./reducers/menuSlice";
import toolboxSlice from "./reducers/toolboxSlice";

const { configureStore } = require("@reduxjs/toolkit");

export const store = configureStore({
    reducer:{
        menu: menuSlice,
        toolbox:toolboxSlice,
    }
})
