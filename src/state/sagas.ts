import formActionSaga from 'redux-form-saga'
import { SagaIterator } from 'redux-saga'
import { call, fork, takeLatest } from 'redux-saga/effects'
import { openNotification } from 'utils/notifications'

import * as actions from './actions'

function* formHandlerSaga() {
    yield takeLatest(actions.submitProjectForm.REQUEST, function* handle(action: ReturnType<typeof actions.submitProjectForm.REQUEST>) {
        try {
            console.log(action)
            // const { currentPassword, newPassword, id } = action.payload
            // yield call(ApiService.changeUserPassword, id, { currentPassword, newPassword }, token)
            // yield put(actions.updateUserPassword.success())
            yield call(openNotification, 'success', 'apiRequest.success.save', 'apiRequest.success.updateUser')
        } catch (err) {
            // yield put(actions.updateUserPassword.failure(err))
            yield call(openNotification, 'error', 'apiRequest.error.title', 'apiRequest.error.updateUserPassword')
        }
    })
}

const projectSagas = function* sagaFlow(): SagaIterator {
    yield fork(formHandlerSaga)
}

export default [formActionSaga, projectSagas]
