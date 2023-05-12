import { Periods as ListPeriods } from "@/types";
import { Button } from "./Button";
import styles from './Periods.module.css'

type Props = {
  onChange: (period: ListPeriods) => void;
  options: {
    label: string;
    value: string;
    disabled?: boolean;
    isActive?: boolean;
  }[];
};

export const Periods: React.FC<Props> = ({ onChange, options }) => (
  <div className={styles.container}>
    {options.map(({ label, value, disabled, isActive }, index) => (
      <Button
        key={index}
        title={label}
        onClick={() => onChange(value as ListPeriods)}
        isActive={isActive}
        disabled={disabled}
      />
    ))}
  </div>
);
