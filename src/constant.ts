import { Period } from "./types"

export const MAX_AMOUNT_OF_DATA_ON_DESKTOP = 10
export const MAX_AMOUNT_OF_DATA_ON_TABLET_MOBILE = 5
export const AMOUNT_OF_SECOND_IN_DAY = 86400

// Keys
export const TON_PRICE_INFO = 'ton-price-into'
export const TON_TRADING_VOLUME = 'ton-trading-colume'
export const TON_TOTAL_TRANSACTION = 'ton-total-transactions'
export const TON_TRANSACTIONS_PER_SECOND = 'ton-transactions-per-second'

export const tonDataSelectOptions = [{
    value: TON_PRICE_INFO,
    label: 'Price'
}, {
    value: TON_TRADING_VOLUME,
    label: 'Volumes'
}, {
    value: TON_TOTAL_TRANSACTION,
    label: 'Transactions'
}, {
    value: TON_TRANSACTIONS_PER_SECOND,
    label: 'Transactions per Second'
}]