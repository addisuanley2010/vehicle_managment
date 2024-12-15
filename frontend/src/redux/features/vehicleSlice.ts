import { PayloadAction, createSlice } from "@reduxjs/toolkit";




const initialState: any = {
        vehicleData: [{
                _id: '',
                vehicle_name: '',
                Status: ''

        }],
        loading: false,
        status: false,

};

const inputSlice = createSlice({
        name: 'vehicle',
        initialState,
        reducers: {
                loading: (state, action: PayloadAction<boolean>) => {
                        state.status = false
                        state.loading = action.payload
                },
                addVehicleToStore: (state, action: PayloadAction<any>) => {
                        state.loading = false
                        state.status = true
                        state.vehicleData.push(action.payload)
                },
                getAllVehicle: (state, action: PayloadAction<any>) => {
                        state.loading = false
                        state.status = true
                        state.vehicleData = action.payload
                },
                deleteVehicleFromStore: (state, action: PayloadAction<any>) => {
                        state.loading = false
                        state.status = true
                        state.vehicleData = state.vehicleData.filter((data: any) => data._id !== action.payload.id)
                },
                updateVehicleToStore: (state, action: PayloadAction<any>) => {
                        state.loading = false;
                        state.status = true;
                        state.vehicleData = state.vehicleData.map((vehicle: any) =>
                                vehicle._id === action.payload._id ? action.payload : vehicle
                        );
                },





        }
})
export const { addVehicleToStore, loading, deleteVehicleFromStore,getAllVehicle , updateVehicleToStore } = inputSlice.actions
export const vehicleReducer = inputSlice.reducer;