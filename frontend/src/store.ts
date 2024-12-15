import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from './redux/features/userSlice'
import { vehicleReducer } from './redux/features/vehicleSlice'

import createSagaMiddleware from 'redux-saga';
import { rootSaga } from "./redux/sagas/rootSaga";


const sagaMiddleware = createSagaMiddleware()




export const store = configureStore({
        reducer: {
                user: userReducer,
                vehicle: vehicleReducer,
       
        },
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware)
})


sagaMiddleware.run(rootSaga)

export type RootState = ReturnType<typeof store.getState>;
