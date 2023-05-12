export type CryptoObj = {
    date: string | number;
    value: number;
}

export const Period = {
    day: 'day',
    week: 'week',
    month: 'month',
    year: 'year'
} as const

export type Periods = keyof typeof Period
