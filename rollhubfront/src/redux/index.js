import {configureStore, createSlice} from "@reduxjs/toolkit";


const userSlice = createSlice({
    name: "User",
    initialState: {
        email: "",
        pseudo: ""
    }

})

const themeSlice = createSlice({
    name: "theme",
    initialState: {
        currUser: "",
        theme: "light"
    },
    reducers: {
        setCurrUser: (state, action) => {
            state.currUser = action.payload
        },
        setTheme: (state, action) => {
            state.theme = action.payload
        }
    }

})

export const store = configureStore({
    reducer: {
        theme: themeSlice.reducer,
        user: userSlice.reducer
    }
})