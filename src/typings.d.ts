import { RouterState } from 'react-router-redux'
import { AnyAction } from 'redux'
import { StatisticsState } from 'state/modules/statistics/@types'

import { ApiError } from './lib/ApiService'
import { AuthState } from './state/modules/auth/@types'
import { DashboardState } from './state/modules/dashboard/@types'
import { DeviceState } from './state/modules/devices/@types'
import { HouseholdState } from './state/modules/household/@types.d'
import { ScenesState } from './state/modules/scenes/@types'

export interface Redux {
    project: any
    form: any
}

interface IHotModule {
    hot?: { accept: (path?: string, callback?: () => void) => void }
}
