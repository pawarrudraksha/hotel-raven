import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

// Define a type for the slice state
interface AppState {
    selectedMonth: string;
}

// Define the initial state using that type
const initialState: AppState = {
  selectedMonth: "July",
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    selectMonth:(state,action)=>{
        state.selectedMonth=action.payload
    }
  },
});

export const { selectMonth } = appSlice.actions; 

// Other code such as selectors can use the imported `RootState` type
export const selectSelectedMonth = (state: RootState): string =>state.app.selectedMonth;

export default appSlice.reducer;
