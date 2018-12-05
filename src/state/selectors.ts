import { createSelector } from 'reselect'
import { _get } from 'utils/get'

import { ReduxState } from './types'

type RootSelector = (val: any) => ReduxState['formData']

const selectFormSubstate: RootSelector = (state) => _get(state, 'project', 'formData')

export const selectSubmitedData = createSelector(
    selectFormSubstate,
    (u) => _get(u, 'data'),
)
