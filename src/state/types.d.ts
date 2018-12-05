import { initialState } from './reducers'

export type ProjectState = {
    formData: {
        loading: boolean
        data: {
            firstName: string
            job: string
            location: string
            time: string
        }
        error: null | Error
    }
}
