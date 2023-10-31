import styles from "@/styles/StockRangeSelector.module.css";

type StockGraphRangeSelectorProps = {
  onChange?: (val: string) => void;
  range: string[];
  activeRange?: string;
};

const StockGraphRangeSelector = ({
  onChange,
  range,
}: StockGraphRangeSelectorProps) => {
  return (
    <div className={styles.container}>
      {range.length > 0 &&
        range.map((val, index) => (
          <button
            className={styles.filterBtn}
            key={`${index}-${val}`}
            onClick={() => onChange && onChange(val)}
          >
            {val}
          </button>
        ))}
    </div>
  );
};

export default StockGraphRangeSelector;
