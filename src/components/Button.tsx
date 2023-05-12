import styles from "./Button.module.css";

type Props = {
  onClick: () => void;
  title: string;
  disabled?: boolean;
  isActive?: boolean;
  className?: string;
};

export const Button: React.FC<Props> = ({
  onClick,
  title,
  isActive,
  disabled = false,
  className,
}) => {
  return (
    <button
      onClick={onClick}
      className={`${styles.btn} ${isActive && styles.active} ${className}`}
      disabled={disabled}
    >
      {title}
    </button>
  );
};
