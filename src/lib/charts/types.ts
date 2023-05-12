export type ChartDataObj = {
  value: number;
  label: string;
};

export type ChartData = ChartDataObj[];

export type ChartLegend = {
  xAxisLegend?: string;
  xAxisLegendColor?: string;
  yAxisLegend?: string;
  yAxisLegendColor?: string;
}

export type ChartConfig = {
  legend?: ChartLegend,
  lineColor?: string,
  xAxisLabelColor?: string;
  xAxisLabelTransform?: (value: number) => string,
  yAxisLabelColor?: string;
  yAxisLabelTransform?: (value: number | string) => string,
}

export type ChartOptions = {
  dataset: ChartData;
  config: ChartConfig
}

export interface DatasetSettings {
  maxDataOnDesktop?: number,
  maxDataOnMobile?: number,
}

type AxisStyleSettings = {
  color: string;
  legendFont: string,
  labelFont: string
}

export interface StyleSettings {
  xAxis?: AxisStyleSettings,
  yAxis?: AxisStyleSettings
}