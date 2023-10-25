import menuReducer from "./slice/menuSlice";
import toolboxReducer from './slice/toolboxSlice'
const { configureStore } = require("@reduxjs/toolkit");

export const store = configureStore({
    reducer:{
        menu:menuReducer,
        toolbox:toolboxReducer
    }
})