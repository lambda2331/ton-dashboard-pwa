import { useCallback, useEffect, useMemo, useState } from "react";
import { useMediaQuery } from "react-responsive";

import { MAX_AMOUNT_OF_DATA_ON_TABLET_MOBILE, MAX_AMOUNT_OF_DATA_ON_DESKTOP } from "@/constant";

export const usePagination = (totalData: number) => {
    const [position, setPosition] = useState(0)
    const isTabletOrMobile = useMediaQuery({ query: "(max-width: 768px)" });

    const perPage = useMemo(
        () =>
            isTabletOrMobile
                ? MAX_AMOUNT_OF_DATA_ON_TABLET_MOBILE
                : MAX_AMOUNT_OF_DATA_ON_DESKTOP,
        [isTabletOrMobile]
    );

    const paginate = useCallback((data: Array<any>) => {
        return data.slice(position, perPage + position)
    }, [perPage, position])

    const nextPage = useCallback(() => {
        const next = position + 1

        next + perPage < totalData && setPosition(next)
    }, [totalData, position, perPage])

    const previousPage = useCallback(() => {
        const previous = position - 1

        previous >= 0 && setPosition(previous)
    }, [position])

    useEffect(() => {
        setPosition(0)
    }, [totalData])

    return {
        nextPage,
        previousPage,
        paginate
    }
}