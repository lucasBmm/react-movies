import { MovieResult } from 'moviedb-promise';
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
   
type homepageState = {
    nowPlaying: MovieResult[],
}

const INITIAL_STATE: homepageState = {
    nowPlaying: [],
}   

export const homepageSlice = createSlice({
    name: 'homepage',
    initialState: INITIAL_STATE,
    reducers: {
        addConfiguration: (state, payload: PayloadAction<homepageState>) => {

        }
    },
})