import config from './../features/defaultConfig';
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
    reducer: {
        config
    }
});

export default store;

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;