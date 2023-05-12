import { useEffect, useRef } from "react";

import { ChartService } from "../service";
import { ChartOptions } from "../types";
import { useState } from "react";
import { useMemo } from "react";
import { DATASET_SETTINGS } from "../constant";

type Props = Omit<ChartOptions, "isTablet"> & {
  className?: string;
};

export const Chart: React.FC<Props> = ({ dataset, config, className }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const instance = useRef<ChartService | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    instance.current = new ChartService(canvas);
  }, []);

  // Listen to resize chart
  useEffect(() => {
    if (canvasRef.current) {
      const observer = new ResizeObserver(() => {
        instance.current &&
          instance.current.draw({
            dataset,
            config,
          });
      });

      observer.observe(canvasRef.current.parentElement as HTMLElement);

      return () => {
        observer.disconnect();
      };
    }
  }, [instance.current, canvasRef.current, dataset]);

  useEffect(() => {
    instance.current &&
      instance.current.draw({
        dataset,
        config,
      });
  }, [dataset]);

  return (
    <div className={className}>
      <canvas ref={canvasRef} />
    </div>
  );
};
