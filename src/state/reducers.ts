import createReducer from '../utils/createReducer'
import { Types } from './actions'
import * as actions from './actions'
import { StatisticsState } from './types'

const initialState: StatisticsState = {
    stats: {
        loading: false,
    },
    devices: {
        loading: false,
        error: null,
        data: null,
    },
    cumulated: {
        loading: false,
        error: null,
        data: null,
    },
}

const project = createReducer(initialState, {
    [Types.TEMP]: (state: StatisticsState, action: ReturnType<typeof actions.temp>): StatisticsState => {
        return {
            ...state,
            stats: {
                ...state.stats,
            },
        }
    },
    [Types.TEMP_SUCCESS]: (state: StatisticsState, action: ReturnType<typeof actions.tempSuccess>): StatisticsState => {
        return {
            ...state,
            stats: {
                ...state.stats,
            },
        }
    },
    [Types.TEMP_FAILURE]: (state: StatisticsState, action: ReturnType<typeof actions.tempFailure>): StatisticsState => {
        return {
            ...state,
            stats: {
                ...state.stats,
            },
        }
    },
})

export default {
    project,
}
