import { useCallback, useState } from "react";

import { Period, Periods } from "@/types";
import { DataObj, PeriodService } from "@/period-service";

export const usePeriod = () => {
    const [period, setPeriod] = useState<Periods>(Period.day);

    const getPeriodBasedData = useCallback((data: (DataObj & Record<string, string | number>)[], callabck: any) => {
        return PeriodService.calculateDataBasedOnPeriod(data, period, callabck)
    }, [period])

    return {
        period,
        setPeriod,
        getPeriodBasedData
    }
}