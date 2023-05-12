import { reverseArray } from "@/utils"
import { ChartConfig, ChartLegend, ChartOptions } from "./types"

const roundTo = (value: number) => {
    if (value <= 0) {
        return 0
    }

    const to = Math.pow(10, Math.round(value).toString().split('').length - 1)

    return Math.ceil(value / to) * to
}

export class ChartService {
    private _canvas
    private width!: number
    private height!: number

    private startYPosition = 0
    private endYPosition = 0
    private startXPosition = 0

    private amountOfYLabels = 5

    private config!: ChartConfig

    constructor(canvas: HTMLCanvasElement) {
        this._canvas = canvas
    }

    get _ctx() {
        return this._canvas.getContext('2d') as CanvasRenderingContext2D
    }

    get xPadding() {
        return Math.round(this.width / 100)
    }

    get yPadding() {
        return Math.round(this.height / 100)
    }

    get isTabletOrMobile() {
        return document.body.getBoundingClientRect().width <= 768
    }

    draw({ dataset, config }: ChartOptions) {
        this.reset()

        this.config = config

        if (config.legend && (config.legend.xAxisLegend || config.legend.yAxisLegend)) {
            this.drawLegend(config.legend as ChartLegend)
        }

        this.drawLabels(dataset)
        this.drawGrid()
        this.drawLines(dataset)
    }

    private reset() {
        this._ctx.canvas.width = this._canvas.parentElement?.clientWidth as number
        this._ctx.canvas.height = this._canvas.parentElement?.clientHeight as number

        this.width = this._canvas.width
        this.height = this._canvas.height

        this._ctx.clearRect(0, 0, this.width, this.height)
    }

    private drawLegend({ xAxisLegend, yAxisLegend }: ChartLegend) {
        this._ctx.font = "bold 1.3rem sans-serif";

        if (yAxisLegend) {
            const measurement = this._ctx.measureText(yAxisLegend)

            this.config.legend?.yAxisLegendColor && (this._ctx.fillStyle = this.config.legend?.yAxisLegendColor)

            this._ctx.fillText(yAxisLegend, 0, measurement.actualBoundingBoxAscent)
            this.startYPosition = measurement.actualBoundingBoxAscent + this.yPadding * 4
        }

        if (xAxisLegend) {
            const measurement = this._ctx.measureText(xAxisLegend)

            this.config.legend?.xAxisLegendColor && (this._ctx.fillStyle = this.config.legend?.xAxisLegendColor)

            this._ctx.fillText(xAxisLegend, (this.width / 2) - (measurement.width / 2), this.height - measurement.actualBoundingBoxDescent)
            this.endYPosition = this._canvas.height - (measurement.actualBoundingBoxAscent + this.yPadding)
        }
    }

    private drawLabels(dataset: ChartOptions['dataset']) {
        this._ctx.font = "bold .7rem sans-serif";

        this.drawYAxisLabels(dataset)
        this.drawXAxisLabels(dataset)
    }

    private drawYAxisLabels(dataset: ChartOptions['dataset']) {
        const maxYValue = roundTo(Math.max(...dataset.map(item => item.value)))
        const step = (this.height - this.startYPosition - this.yPadding * 6) / (this.amountOfYLabels - 1)

        this.config.yAxisLabelColor && (this._ctx.fillStyle = this.config.yAxisLabelColor)

        // Drawing Y axis labels
        for (let index = this.amountOfYLabels - 1, yPosition = this.startYPosition; index >= 0; index--, yPosition += step) {
            let label: string | number = index * (maxYValue / (this.amountOfYLabels - 1))
            this.config.yAxisLabelTransform && (label = this.config.yAxisLabelTransform(label))

            const measurement = this._ctx.measureText(label as string)

            if (measurement.actualBoundingBoxRight > this.startXPosition) {
                this.startXPosition = Math.ceil(measurement.actualBoundingBoxRight)
            }

            this._ctx.fillText(label as string, 0, yPosition + measurement.actualBoundingBoxAscent / 2)
        }
    }

    private drawXAxisLabels(dataset: ChartOptions['dataset']) {
        const step = (this.width - this.startXPosition) / dataset.length
        const data = reverseArray(dataset)

        this.config.xAxisLabelColor && (this._ctx.fillStyle = this.config.xAxisLabelColor)

        // Drawing X axis labels
        for (let index = 0, yPosition = this.startYPosition; index < data.length; index++, yPosition += step) {
            const label = data[index].label
            const labelMeasurement = this._ctx.measureText(data[index].label)

            this._ctx.fillText(label, index * step + this.startXPosition + this.xPadding * 2, (this.endYPosition || this.height) - labelMeasurement.actualBoundingBoxAscent)
        }
    }

    private drawGrid() {
        const step = (this.height - this.startYPosition - this.yPadding * 6) / (this.amountOfYLabels - 1)

        // Drawing Y axis labels
        for (let index = this.amountOfYLabels - 1, yPosition = this.startYPosition; index >= 0; index--, yPosition += step) {
            this._ctx.lineWidth = .2
            this._ctx.strokeStyle = 'gray'

            this._ctx.beginPath()
            this._ctx.moveTo(this.startXPosition + this.xPadding, yPosition)
            this._ctx.lineTo(this.width, yPosition)
            this._ctx.stroke()
        }

    }

    private drawLines(dataset: ChartOptions['dataset']) {
        const step = (this.width - this.startXPosition) / dataset.length
        const maxValue = roundTo(Math.max(...dataset.map(item => item.value)))
        const data = reverseArray(dataset)

        this._ctx.beginPath()
        this._ctx.lineWidth = 3
        this.config.lineColor && (this._ctx.strokeStyle = this.config.lineColor)

        for (let index = 0; index < dataset.length; index++) {
            const { value, label } = data[index]
            const labelWidth = this._ctx.measureText(label).width

            const xPosition = index * step + this.startXPosition + this.xPadding * 2 + labelWidth / 2
            const yPosition =  (1 - value / maxValue) * (this.height + this.startYPosition + this.yPadding * 6)
            index ? this._ctx.lineTo(xPosition, yPosition || this.startYPosition) : this._ctx.moveTo(xPosition, yPosition || this.startYPosition)
        }

        this._ctx.stroke()
    }
}