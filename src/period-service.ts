import { Period, Periods } from "./types";
import { splitArrayChunks } from "./utils";

const PERIOD_SIZE = {
    [Period.week]: 7,
    [Period.month]: 30,
    [Period.year]: 365
}

export interface DataObj {
    value: number
}

export class PeriodService {
    static splitDataByPeriod<T>(data: T[], period: Exclude<Periods, 'day'>): T[][] {
        return splitArrayChunks(data, PERIOD_SIZE[period])
    }

    static calculateDataBasedOnPeriod<T extends DataObj>(data: T[], period: Periods, transformCallback?: (item: T[]) => Partial<T>): T[] {
        // We assume that the data comes in by the day. Min disaply value is day.
        if (period === Period.day) {
            return data
        }

        return PeriodService.splitDataByPeriod<T>(data, period).map((obj) => {
            const value = obj.reduce((sum, item) => sum += item.value, 0)

            return {
                ...(transformCallback && transformCallback(obj)),
                value: value / obj.length
            } as T
        })
    }

    static get periodDateFormats () {
        return {
            [Period.day]: "dd LLL yy",
            [Period.week]: "dd LLL yy",
            [Period.month]: "LLL u",
            [Period.year]: "u",
        }
    }
}