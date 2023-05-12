const fetcher = async <T>(url: string, options?: Record<string, unknown>) => {
    const domain = process.env.API_URL
    const result = await fetch(`${domain}${url}`, options)
    const data = await result.json()

    return data as T
}

export const requestTransactions = <T>(): Promise<T> => fetcher<T>('/api/transactions_count')
export const requestTonHistory = <T>(): Promise<T> => fetcher<T>('/api/history_data')