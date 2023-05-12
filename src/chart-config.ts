import { TON_PRICE_INFO, TON_TOTAL_TRANSACTION, TON_TRADING_VOLUME, TON_TRANSACTIONS_PER_SECOND } from "./constant";
import { ChartConfig, ChartLegend } from "./lib/charts/types";

const defaultLegendConfig: ChartLegend = {
    xAxisLegendColor: 'gray',
    yAxisLegendColor: '#327ac1'
}

const defaultChartConfig: ChartConfig = {
    xAxisLabelColor: 'gray',
    yAxisLabelColor: '#327ac1',
    lineColor: '#327aa3'
}

export const chartConfigMapping: Record<string, ChartConfig> = {
    [TON_PRICE_INFO]: {
        ...defaultChartConfig,
        legend: {
            ...defaultLegendConfig,
            yAxisLegend: 'Price Information',
        },
        yAxisLabelTransform: (value) => `$${value}`
    },
    [TON_TRADING_VOLUME]: {
        ...defaultChartConfig,
        legend: {
            ...defaultLegendConfig,
            yAxisLegend: 'Trading Volumes'
        },
        yAxisLabelTransform: (value) => `$${value}`
    },
    [TON_TOTAL_TRANSACTION]: {
        ...defaultChartConfig,
        legend: {
            ...defaultLegendConfig,
            yAxisLegend: 'Transactions'
        },
    },
    [TON_TRANSACTIONS_PER_SECOND]: {
        ...defaultChartConfig,
        legend: {
            ...defaultLegendConfig,
            yAxisLegend: 'Transactions per Second'
        },
    }
}