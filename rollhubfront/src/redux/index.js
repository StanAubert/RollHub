import {configureStore, createSlice} from "@reduxjs/toolkit";


const usersSlice = createSlice({
    name: "Users",
    initialState: {
        users: {}
    },
    reducers: {
        setUsers: (state, action) => {
            state.users = action.payload
        }
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
        users: usersSlice.reducer
    }
})