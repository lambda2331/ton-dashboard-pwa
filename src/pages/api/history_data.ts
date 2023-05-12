import type { NextApiRequest, NextApiResponse } from 'next'

import { CryptoObj } from '@/types';

type HistoryDataResponse = {
  prices: [number, number][];
  total_volumes: [number, number][];
}

type ApiResponse = {
  prices: CryptoObj[],
  totalVolumes: CryptoObj[]
}

const transformdHistoryData = (data: [number, number][]) => data.map(([date, value]) => ({ date, value: +value.toFixed(2) }))

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  const fetchResult = await fetch('https://api.coingecko.com/api/v3/coins/the-open-network/market_chart?vs_currency=usd&days=max')
  const data = await fetchResult.json() as HistoryDataResponse

  // API return for current day 2 values. Need to remove one
  res.json({
    prices: transformdHistoryData(data.prices).slice(0, -1),
    totalVolumes: transformdHistoryData(data.total_volumes).slice(0, -1)
  })
}
