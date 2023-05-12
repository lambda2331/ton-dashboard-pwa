import styles from './Select.module.css'

type Props = {
  onChange: (e: any) => void;
  options: { value: string | number; label: string }[];
};

export const Select: React.FC<Props> = ({ options, onChange }) => {
  return (
    <select onChange={onChange} className={styles.select}>
      {options.map(({ value, label }, index) => (
        <option value={value} key={index}>{label}</option>
      ))}
    </select>
  );
};
