import formActionSaga from 'redux-form-saga'
import { SagaIterator } from 'redux-saga'
import { call, fork, put, takeLatest } from 'redux-saga/effects'
import { openNotification } from 'utils/notifications'

import * as actions from './actions'

function* formHandlerSaga() {
    yield takeLatest(actions.submitProjectForm.REQUEST, function* handle(action: ReturnType<typeof actions.submitProjectForm.REQUEST>) {
        try {
            // Some API Call or whatever
            yield new Promise((resolve) => setTimeout(resolve, 2500))

            yield put(actions.submitProjectForm.success())
            yield put(actions.submitProjectFormSuccess(action.payload))
            yield call(openNotification, 'success', 'Success!', 'Your form was successfully sent to server!')
        } catch (err) {
            yield put(actions.submitProjectForm.failure())
            yield put(actions.submitProjectFormFailute(err))
            yield call(openNotification, 'error', 'Error!', 'We were unable to proceed your form!')
        }
    })
}

const projectSagas = function* sagaFlow(): SagaIterator {
    yield fork(formHandlerSaga)
}

export default [formActionSaga, projectSagas]
