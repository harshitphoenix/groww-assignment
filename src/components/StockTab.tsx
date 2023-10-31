import { GainerOrLoser } from "@/types/Stock";
import StockCard from "./StockCard";
import styles from "@/styles/StockTab.module.css";
import { CompanyStock } from "@/types/CompanyInfo";

type StockTabProps = {
  activeTab: string;
  data: CompanyStock[];
  cardClick: (val: CompanyStock) => void;
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
              onCardCliked={() => cardClick(val)}
              name={val.ticker}
              stock={val}
            />
          ))}
      </div>
    </div>
  );
};

export default StockTab;
