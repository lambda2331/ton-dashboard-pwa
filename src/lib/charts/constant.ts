export const DATASET_SETTINGS =  {
    maxDataOnDesktop: 10,
    maxDataOnMobile: 5,
}

const COMMON_AXIS_STYLE = {
    legendFont: 'bold 1.3rem sans-serif',
    labelFont: 'bold 8px sans-serif'
}

export const STYLE_SETTINGS = {
    xAxis: {
        color: '#327AC1',
        ...COMMON_AXIS_STYLE
    },
    yAxis: {
        color: 'gray',
        ...COMMON_AXIS_STYLE
    }
}