import { call, put, takeEvery } from 'redux-saga/effects';
import { api } from '../../utils/api';
import axios from 'axios';

import MyToast from '../../utils/Toast';
import { ToastType } from '../../types/user.types';
import { addVehicleToStore, getAllVehicle, deleteVehicleFromStore, loading, updateVehicleToStore } from '../features/vehicleSlice';


// ...................ADD Vehicle...............................
export function* handleAddVehicle(action: any) {


        yield put(loading(true))
        try {


                const vehicle_name = action.payload.vehicle_name
                const Status = action.payload.Status
                const formData = { vehicle_name, Status }

                const response: CallableFunction = yield call(axios.post, `${api}/add-vehicles`, formData);
                const { data, message } = yield (response as any).data
                yield put(addVehicleToStore(data));
                MyToast(message, ToastType.SUCCESS);

        } catch (error) {
                MyToast((error as any).response.data.message, ToastType.ERROR);
                yield put(loading(false))


        }

}
// ...................Get  Vehicles.............................

export function* getVehicles() {
        yield put(loading(true))
        try {
                const response: CallableFunction = yield call(axios.get, `${api}/get-vehicles`);
                const { data } = yield (response as any).data
                console.log(data,'this is nothing ,nut data')
                // MyToast(message, ToastType.SUCCESS);

                yield put(getAllVehicle(data));

        } catch (error) {
                MyToast((error as any).response.data.message, ToastType.ERROR);
                yield put(loading(false))

        }

}
// ...................Update  Vehicles.............................

export function* upDateVehicle(action:any) {



         yield put(loading(true))
        try {

                const vehicle_name = action.payload.vehicle_name
                const Status = action.payload.Status
                const id=action.payload._id
                const formData = { vehicle_name, Status }

                const response: CallableFunction = yield call(axios.put, `${api}/update-vehicles/${id}`, formData);
                const { data, message } = yield (response as any).data
                yield put(updateVehicleToStore(data));
                MyToast(message, ToastType.SUCCESS);

        } catch (error) {
                MyToast((error as any).response.data.message, ToastType.ERROR);
                yield put(loading(false))


        }

}
// ...................Delete  Vehicles.............................

export function* deleteVehicle(id: any) {
        yield put(loading(true))

        try {
                const response: CallableFunction = yield call(axios.delete, `${api}/delete-vehicles/${id.id}`);
                const { message } = yield (response as any).data

                MyToast(message, ToastType.SUCCESS);
                yield put(deleteVehicleFromStore(id));

        } catch (error) {
                MyToast((error as any).response.data.message, ToastType.ERROR);
                yield put(loading(false))

        }

}

// ....................................... END OF SAGA ...................................
export function* watcVehicleSaga() {
        yield takeEvery('ADD_VEHICLES', handleAddVehicle);
        yield takeEvery('GET_VEHICLES', getVehicles);
        yield takeEvery('UPDATE_VEHICLES', upDateVehicle);
        yield takeEvery('DELETE_VEHICLES', deleteVehicle);
        




}