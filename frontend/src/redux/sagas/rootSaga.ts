import { all } from "redux-saga/effects";
import { watcUserSaga } from "./userSaga";
import { watcVehicleSaga } from "./vehicleSaga";

export function* rootSaga() {
    yield all([
        watcUserSaga(),
        watcVehicleSaga(),
       
    ])
}