import { GainerOrLoser } from "@/types/Stock";
import StockCard from "./StockCard";
import styles from "@/styles/StockTab.module.css";
type StockTabProps = {
  activeTab: string;
  data: GainerOrLoser[];
};
const StockTab = ({ activeTab, data }: StockTabProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.itemGrid}>
        {data.length > 0 &&
          data.map((val, index) => (
            <StockCard
            onCardCliked={()=>console.log()}
              name={val.ticker}
              price={val.price}
              change={val.changeAmount}

            />
          ))}
        {/* <StockCard
          onCardCliked={() => console.log()}
          change="40%"
          name="Relaince"
          price="$123"
        />
        <StockCard
          onCardCliked={() => console.log()}
          change="40%"
          name="Relaince"
          price="$123"
        />
        <StockCard
          onCardCliked={() => console.log()}
          change="40%"
          name="Relaince"
          price="$123"
        />
        <StockCard
          onCardCliked={() => console.log()}
          change="40%"
          name="Relaince"
          price="$123"
        />
        <StockCard
          onCardCliked={() => console.log()}
          change="40%"
          name="Relaince"
          price="$123"
        />
        <StockCard
          onCardCliked={() => console.log()}
          change="40%"
          name="Relaince"
          price="$123"
        />
        <StockCard
          onCardCliked={() => console.log()}
          change="40%"
          name="Relaince"
          price="$123"
        />
        <StockCard
          onCardCliked={() => console.log()}
          change="40%"
          name="Relaince"
          price="$123"
        />
        <StockCard
          onCardCliked={() => console.log()}
          change="40%"
          name="Relaince"
          price="$123"
        />
        <StockCard
          onCardCliked={() => console.log()}
          change="40%"
          name="Relaince"
          price="$123"
        />
        <StockCard
          onCardCliked={() => console.log()}
          change="40%"
          name="Relaince"
          price="$123"
        />
        <StockCard
          onCardCliked={() => console.log()}
          change="40%"
          name="Relaince"
          price="$123"
        /> */}
      </div>
    </div>
  );
};

export default StockTab;
