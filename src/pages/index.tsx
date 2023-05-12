import { useMemo, useState } from "react";
import Image from "next/image";
import { Rubik } from "next/font/google";
import format from "date-fns/format";

import styles from "@/styles/Home.module.css";
import { Chart } from "@/lib/charts/component/Chart";
import { Button } from "@/components/Button";
import { CryptoObj, Period } from "@/types";
import { PeriodService } from "@/period-service";
import { ChartData } from "@/lib/charts/types";
import { Select } from "@/components/Select";
import { usePeriod } from "@/hooks/usePeriod";
import {
  AMOUNT_OF_SECOND_IN_DAY,
  TON_PRICE_INFO,
  TON_TOTAL_TRANSACTION,
  TON_TRADING_VOLUME,
  TON_TRANSACTIONS_PER_SECOND,
  tonDataSelectOptions,
} from "@/constant";
import { requestTonHistory, requestTransactions } from "@/provider";
import { usePagination } from "@/hooks/usePagination";
import { Periods } from "@/components/Periods";
import { Pagination } from "@/components/Pagination";
import { chartConfigMapping } from "@/chart-config";
import { reverseArray } from "@/utils";

const rubik = Rubik({ subsets: ["latin"] });

type Props = {
  prices: CryptoObj[];
  totalVolumes: CryptoObj[];
  transactions: CryptoObj[];
  transactionPerSecond: CryptoObj[];
};

export default function Home({
  prices,
  totalVolumes,
  transactions,
  transactionPerSecond,
}: Props) {
  const [displayedData, setDisplayedData] = useState(prices);
  const [dataType, setDataType] = useState(TON_PRICE_INFO);

  const { period, setPeriod, getPeriodBasedData } = usePeriod();

  const dataBasedOnPeriod = useMemo(
    () =>
      getPeriodBasedData(displayedData, (array: any) => ({
        date: array[0].date,
      })),
    [displayedData, period]
  );

  const { paginate, nextPage, previousPage } = usePagination(
    dataBasedOnPeriod.length
  );

  const chartData = useMemo<ChartData>(() => {
    const paginatedData = paginate(dataBasedOnPeriod);

    return paginatedData.map((item) => ({
      value: item.value,
      label: format(
        new Date(item.date),
        PeriodService.periodDateFormats[period]
      ),
    }));
  }, [dataBasedOnPeriod, period, paginate]);

  const handleSetTypeOfData = (event: any) => {
    setDataType(event.target.value);

    switch (event.target.value) {
      case TON_PRICE_INFO: {
        setDisplayedData(prices);
        break;
      }
      case TON_TRADING_VOLUME: {
        setDisplayedData(totalVolumes);
        break;
      }
      case TON_TOTAL_TRANSACTION: {
        setDisplayedData(transactions);
        break;
      }
      case TON_TRANSACTIONS_PER_SECOND: {
        setDisplayedData(transactionPerSecond);
        break;
      }
    }
  };

  const periodsSelectOptions = useMemo(
    () => [
      {
        label: "Day",
        value: Period.day,
        isActive: Period.day === period,
      },
      {
        label: "Week",
        value: Period.week,
        isActive: Period.week === period,
      },
      {
        label: "Month",
        value: Period.month,
        isActive: Period.month === period,
      },
      {
        label: "Year",
        value: Period.year,
        isActive: Period.year === period,
      },
    ],
    [period]
  );

  const chartConfig = useMemo(() => chartConfigMapping[dataType], [dataType]);

  return (
    <>
      <main className={`${styles.main} ${rubik.className}`}>
        <div className={styles.header}>
          <Image src="/icon-512x512.png" alt="logo" width={100} height={100} />
          <h1>TON Dashboard</h1>
        </div>
        <div className={styles.actionsContainer}>
          <Select
            options={tonDataSelectOptions}
            onChange={handleSetTypeOfData}
          />
          <Pagination onNext={previousPage} onPrevious={nextPage} />
          <Periods options={periodsSelectOptions} onChange={setPeriod} />
        </div>
        <Chart
          dataset={chartData}
          config={chartConfig}
          className={styles.chart}
        />
      </main>
    </>
  );
}

export async function getServerSideProps() {
  const transactions = await requestTransactions<CryptoObj[]>();
  const historyData = await requestTonHistory<{
    prices: CryptoObj[];
    totalVolumes: CryptoObj[];
  }>();

  const transactionPerSecond = transactions.map((item) => ({
    ...item,
    value: Math.round(item.value / AMOUNT_OF_SECOND_IN_DAY),
  }));

  return {
    props: {
      prices: reverseArray(historyData.prices),
      totalVolumes: reverseArray(historyData.totalVolumes),
      transactions,
      transactionPerSecond,
    },
  };
}
