import { FetchError } from './request'

export type SelectorType<T extends SelectorFunction | SelectorBasic> = T extends SelectorFunction
    ? ReturnType<ReturnType<T>>
    : ReturnType<T>

type SelectorFunction = (...args) => Function
type SelectorBasic = (...args) => any

export interface ApiError extends FetchError, Error {
    //
}
