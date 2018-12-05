import { HashMap } from '../../../utils/hashMaps'
import { ApiError } from '../../../lib/ApiService'

export interface StatisticsState {
    stats?: HashMap<StatisticsChartData>
    devices: StatisticsDevices
    cumulated: StatisticsCumulated
}

export interface StatisticsChartData {
    id: string
    loading: boolean
    error: ApiError | null
    data: StatisticsData
}

interface StatisticsData {
    values: StatisticsDataValues[]
    type: string
    distribution: string
}

interface StatisticsDataValues {
    value: number
    label: string
}

interface StatisticsDevices {
    loading: boolean
    error: ApiError | null
    data: StatisticsDevicesData[]
}

interface StatisticsDevicesData {
    deviceId: string
    type: string
    unit: string
}

interface StatisticsCumulated {
    loading: boolean
    error: ApiError | null
    data: CumulatedStats[]
}

interface CumulatedStats {
    data: CumulatedData
    deviceId: string
}

interface CumulatedData {
    currentValue: number
    previousTotalValue: number
    previousValue: number
}
