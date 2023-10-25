import menuReducer from "./slice/menuSlice";

const { configureStore } = require("@reduxjs/toolkit");

export const store = configureStore({
    reducer:{
        menu:menuReducer
    }
})