import type { NextApiRequest, NextApiResponse } from 'next'

import { CryptoObj } from '@/types';

type TransactionsCountResponse = {
  date: string;
  users_transactions_count: number;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CryptoObj[]>
) {
  const fetchResult = await fetch('https://tontech.io/api/transactions_count')
  const data = await fetchResult.json() as TransactionsCountResponse[]

  const transformedData = data.map(item => ({ date: item.date, value: item.users_transactions_count })).reverse()
  res.json(transformedData)
}
