import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { InitialStateInterface } from "../../types/user.types";




const initialState: InitialStateInterface = {
        user: {
                _id: '',
                full_name: '',
                user_name: '',
                email: '',
                password: '',
                gender: '',
                phone: '',
                address: '',
                qualification: '',
                role: '',
                verified: false,
        },
        loading: true,
        isAuthenticated: false,
        success: false,
        message: '',
        token: ''

};

const inputSlice = createSlice({
        name: 'user',
        initialState,
        reducers: {
                loading: (state, action: PayloadAction<boolean>) => {
                        state.loading = action.payload
                        state.isAuthenticated = false
                        state.user = initialState.user
                        state.success = false
                        state.message = ''
                        state.token = ''

                        return state
                },

                addUserToStore: (state, action: PayloadAction<InitialStateInterface>) => {



                        state.user = action.payload.user
                        state.loading = false
                        state.success = action.payload.success
                        state.isAuthenticated = action.payload.isAuthenticated
                        state.message = action.payload.message
                        state.token = action.payload.token
                        return state
                },




        }
})
export const { addUserToStore, loading } = inputSlice.actions
export const userReducer = inputSlice.reducer;