import { GainerOrLoser } from "@/types/Stock";
import StockCard from "./StockCard";
import styles from "@/styles/StockTab.module.css";

type StockTabProps = {
  activeTab: string;
  data: GainerOrLoser[];
  cardClick: (val: string) => void;
};

const StockTab = ({ activeTab, data, cardClick }: StockTabProps) => {
  console.log(data);
    return (
    <div className={styles.container}>
      <div className={styles.itemGrid}>
        {data.length > 0 &&
          data.map((val, index) => (
            <StockCard
              key={`${index}-${val.ticker}`}
              onCardCliked={() => cardClick(val.ticker)}
              name={val.ticker}
              price={val.price}
              change={val.changeAmount}
            />
          ))}
      </div>
    </div>
  );
};

export default StockTab;
