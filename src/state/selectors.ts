import { createSelector } from 'reselect'
import { _get } from 'utils/get'

import { Redux } from 'typings'
import { ProjectState } from './types'

type RootSelector = (val) => ProjectState['formData']

const selectFormSubstate: RootSelector = (state: Redux) => _get(state, 'project', 'formData')

export const selectSubmitedData = createSelector(
    selectFormSubstate,
    (u) => _get(u, 'data'),
)
