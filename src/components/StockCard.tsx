import { FaGoogle } from "react-icons/fa";
import styles from "../styles/StockCard.module.css";
import PriceStateIndicator from "./PriceStateIndicator";
import tickerToName from "@/data/tickertoName.json";
import { CompanyStock } from "@/types/CompanyInfo";
type StockCardProps = {
  stock: CompanyStock;
  name: string;
  onCardCliked: () => void;
};
const StockCard = ({ stock, name, onCardCliked }: StockCardProps) => {
  const isPriceIncreased = stock.changePercent.includes("-");
  return (
    <div className={styles.container} onClick={onCardCliked}>
      <div className={styles.cardTop}>
        <div className={styles.compLogo}>
          <FaGoogle />
        </div>
        <p>{name}</p>
      </div>
      <div className={styles.bottom}>
        <PriceStateIndicator
          change={stock.changePercent}
          increase={!isPriceIncreased}
          price={stock.price}
        />
      </div>
      {/* <p>{tickerToName[name]}</p> */}
    </div>
  );
};

export default StockCard;
