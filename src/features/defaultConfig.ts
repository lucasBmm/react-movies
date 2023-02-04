import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ConfigurationResponse } from 'moviedb-promise';
import { AppState } from '../app/store';

interface configState {
    config: ConfigurationResponse | null
}

const INITIAL_STATE: configState = {
    config: null
}

export const configSlicer = createSlice({
    name: "config",
    initialState: INITIAL_STATE,
    reducers: {
        addConfig: (state, action: PayloadAction<configState>) => {
            state.config = action.payload.config;
        }
    }
});

export const { addConfig } = configSlicer.actions;

export const configSelector = (state: AppState) => (state.config.config);
// export const selectUser = (state: RootState) => ({ user: state.userReducer });

export default configSlicer.reducer;