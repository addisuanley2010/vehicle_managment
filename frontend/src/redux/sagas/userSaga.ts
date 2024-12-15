import { call, put, takeEvery } from 'redux-saga/effects';
import { api } from '../../utils/api';
import axios from 'axios';

import { addUserToStore, loading } from '../features/userSlice';
import MyToast from '../../utils/Toast';
import { ToastType } from '../../types/user.types';


// ...................ADD USER...............................
export function* handleAddUser(action: any) {
        yield put(loading(true))
        try {
                const response: CallableFunction = yield call(axios.post, `${api}/sign-up`, action);
                const { data } = yield (response as any).data
                yield put(addUserToStore(data));
                MyToast("User Created Successfully!", ToastType.SUCCESS);

        } catch (error) {
                MyToast((error as any).response.data.message, ToastType.ERROR);

                yield put(loading(false))


        }

}
// ...................USER LOGIN.............................

export function* handleLogin(action: any) {
        yield put(loading(true))

        try {
                const response: CallableFunction = yield call(axios.post, `${api}/sign-in`, action.formData);
                const { message, token, success } = yield (response as any).data
                MyToast(message, ToastType.SUCCESS);
                if (success) { localStorage.setItem('token', token) }
                yield put(addUserToStore((response as any).data));

        } catch (error) {
                MyToast((error as any).response.data.message, ToastType.WARNING);
                yield put(loading(false))

        }

}
export function* checkUser() {
        yield put(loading(true))
        try {
                const token = localStorage.getItem('token');
                const headers = token ? { Authorization: `Bearer ${token}` } : {};

                const response: CallableFunction = yield call(axios.get, `${api}/check-auth`, {
                        headers: headers
                });
                yield put(addUserToStore((response as any).data));

        } catch (error) {
                yield put(loading(false))
        }
}

export function* logout() {
        yield put(loading(false))
}

// ....................................... END OF SAGA ...................................
export function* watcUserSaga() {
        yield takeEvery('CREATE_USER', handleAddUser);
        yield takeEvery('LOGIN', handleLogin);
        yield takeEvery('CHECK_USER', checkUser);
        yield takeEvery('LOGOUT_USER', logout);





}