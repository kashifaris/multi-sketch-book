const { MENU_ITEMS, COLORS } = require("@/constants");
const { createSlice } = require("@reduxjs/toolkit");

const initialState={
    [MENU_ITEMS.PENCIL]:{   //[]using this to extract the value inside the object cant use the '.'
        color: COLORS.BLACK,
        size:3
    },
    [MENU_ITEMS.ERASER]:{
        color:COLORS.WHITE,
        size:3
    },
    [MENU_ITEMS.UNDO]:{
    },
    [MENU_ITEMS.REDO]:{
    },
    [MENU_ITEMS.DOWNLOAD]:{
    }
}

export const toolboxSlice= createSlice({
    name:"toolbox",
    initialState,
    reducers:{
        changeColor:(state,action)=>{
            state[action.payload.item].color=action.payload.color;
        },
        changeBrushSize:(state,action)=>{
            state[action.payload.item].size=action.payload.size;
        }
    }
})

export const {changeColor,changeBrushSize}= toolboxSlice.actions;

export default toolboxSlice.reducer