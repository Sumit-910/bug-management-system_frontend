import { configureStore } from "@reduxjs/toolkit";
// import userSlice from "./slices/UserSlice";
import orgSlice from "./slices/orgSlice";

const store = configureStore({
    reducer:{
        orgs:orgSlice
    }
})
export default store;