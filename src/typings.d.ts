import { ProjectState } from 'state/types'

export interface Redux {
    project: ProjectState
    form: any
}

interface IHotModule {
    hot?: { accept: (path?: string, callback?: () => void) => void }
}
