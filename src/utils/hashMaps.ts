import _ from 'lodash'
import qs from 'qs'

import { _get } from './get'

function isString(val): val is string {
    return _.isString(val)
}

export type DeepPartial<T> = { [P in keyof T]?: T[P] extends Array<infer R> ? Array<DeepPartial<R>> : DeepPartial<T[P]> }
export interface HashMap<ObjectType> {
    [key: string]: ObjectType
}

enum HashByOptions {
    ID = 'id',
}
export interface QueryObject extends ReducerReferenceListMeta {
    [key: string]: string | string[] | number | number[] | boolean
}

export interface ReducerReferenceListMeta {
    loading?: boolean
    error?: boolean
    limit?: number
    totalCount?: number
}

export interface ReducerReferenceList extends ReducerReferenceListMeta {
    query: string
    data: string[]
}

const defaultMetaProperties: ReducerReferenceListMeta = {
    loading: false,
    error: false,
}

export function createHashMap<Type>({
    hashBy = HashByOptions.ID,
    objectArray,
    oldObject = {},
    omit,
}: {
    hashBy?: HashByOptions
    objectArray: (DeepPartial<Type>[] & { [hashBy]: string }[]) | (DeepPartial<Type> & { [hashBy]: string })
    oldObject: HashMap<Type>
    omit?: string[]
}): HashMap<Type> {
    const hashMap = _.keyBy(_.castArray(objectArray), hashBy)
    return _.merge({}, omit ? _.omit(oldObject, omit.join('.')) : oldObject, hashMap)
}

export function createReferenceList<Type>({
    metaProperties,
    objectArray,
    oldList = {},
    query,
    referenceBy = 'id',
}: {
    metaProperties?: ReducerReferenceListMeta
    objectArray?: Partial<Type>[] | Partial<Type>
    oldList: HashMap<ReducerReferenceList>
    query: string | QueryObject
    referenceBy?: string
}): HashMap<ReducerReferenceList> {
    const referenceKeys: string[] = _.map(_.castArray(objectArray), referenceBy)

    const referenceKey: string = isString(query) ? query : objectToReferenceQuery(query)

    const newList = {
        [referenceKey]: {
            ...defaultMetaProperties,
            ...metaProperties,
            query: referenceKey,
            data: _.compact(_.union(<string[]>_get(oldList, referenceKey, 'data'), referenceKeys)),
        },
    }

    return _.merge({}, oldList, newList)
}

export function sortObject(unsortedObject: Object): Object {
    // unsortedObject must be cloned!
    const arrayFromObject = _.toPairs(_.clone(unsortedObject))
    arrayFromObject.forEach((keyPair: [string, string[]]) => {
        if (_.isArray(keyPair[1])) {
            keyPair[1].sort()
        }
    })
    const sortedArray = <[string, string[] | string][]>_.sortBy(arrayFromObject, 0)
    // objectFromSortedArray
    return _.fromPairs(sortedArray)
}

export function removePaginationFromQueryObject(queryObject: QueryObject) {
    const cleanQueryObject = _.clone(queryObject)
    delete cleanQueryObject.limit
    delete cleanQueryObject.offset

    return cleanQueryObject
}

export function createQuery(queryObject: QueryObject) {
    return qs.stringify(sortObject(queryObject), { indices: false })
}

export function objectToReferenceQuery(queryObject: QueryObject): string {
    return createQuery(removePaginationFromQueryObject(queryObject))
}

export function removeFromReferenceLists({
    referenceLists,
    valueToRemove,
}: {
    referenceLists: HashMap<ReducerReferenceList>
    valueToRemove: string
}): HashMap<ReducerReferenceList> {
    const newReferenceArray = _.map(referenceLists, (referenceObject: ReducerReferenceList) => {
        if (referenceObject.data.includes(valueToRemove)) {
            return {
                ...referenceObject,
                totalCount: referenceObject.totalCount - 1,
                data: referenceObject.data.filter((value: string) => {
                    return value !== valueToRemove
                }),
            }
        }
        return referenceObject
    })

    return _.keyBy(newReferenceArray, 'query')
}

export function modifyDashboardReferenceList({
    add,
    homeId,
    referenceLists,
    valueToModify,
}: {
    add: boolean
    homeId: string
    referenceLists: HashMap<ReducerReferenceList>
    valueToModify: string
}): HashMap<ReducerReferenceList> {
    const query = objectToReferenceQuery({ homeId, dashboard: true })

    if (_get(referenceLists, query)) {
        const referenceListsNew = {
            ...referenceLists,
            [query]: {
                ...referenceLists[query],
                data: _.isUndefined(add)
                    ? referenceLists[query].data
                    : add
                    ? _.union(referenceLists[query].data, [valueToModify])
                    : referenceLists[query].data.filter((value: string) => value !== valueToModify),
            },
        }

        const totalCount = referenceLists[query].data.length + (referenceListsNew[query].data.length - referenceLists[query].data.length)

        return {
            ...referenceListsNew,
            [query]: {
                ...referenceListsNew[query],
                totalCount: totalCount,
            },
        }
    }

    return referenceLists
}

export function sortObjectArrayBy<ObjectType>(
    objectArray: HashMap<ObjectType>,
    primarySortBy: keyof ObjectType,
    secondarySortBy?: keyof ObjectType,
): ObjectType[] {
    let secondarySortedArr = null
    if (secondarySortBy) {
        secondarySortedArr = _.orderBy(
            _.map(objectArray),
            [(object: ObjectType): string => object[<string>secondarySortBy].toLowerCase()],
            ['asc'],
        )
    }
    return _.orderBy(
        secondarySortedArr ? secondarySortedArr : _.map(objectArray),
        [(object: ObjectType): string => object[<string>primarySortBy].toLowerCase()],
        ['asc'],
    )
}

export function shiftToStart<T>(array: T[], valueInArr: string): T[] {
    let toShift = null
    array = array.filter((element: T) => {
        if (_.values(element).indexOf(valueInArr) !== -1) {
            toShift = element
            return false
        }
        return true
    })
    toShift && array.splice(0, 0, toShift)
    return array
}

export function checkAny<T extends Object>(randomObj: T, propNames?: Partial<keyof T>[], checkValue?: any): boolean {
    if (_.isUndefined(randomObj)) {
        return !checkValue
    }
    if (_.size(propNames) > 0) {
        randomObj = _.pick(randomObj, propNames)
    }
    return (
        _.isEmpty(randomObj) ||
        _.size(randomObj) < _.size(propNames) ||
        _.values(randomObj).some((elem: any) => (checkValue ? elem === checkValue : _.isNil(elem)))
    )
}
