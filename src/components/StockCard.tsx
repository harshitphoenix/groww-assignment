import { FaGoogle } from "react-icons/fa";
import styles from "../styles/StockCard.module.css";
import PriceStateIndicator from "./PriceStateIndicator";
import tickerToName from "@/data/tickertoName.json";
type StockCardProps = {
  name: string;
  price: string;
  change: string;
  onCardCliked: () => void;
};
const StockCard = ({ change, name, price, onCardCliked }: StockCardProps) => {
  return (
    <div className={styles.container} onClick={onCardCliked}>
      <div className={styles.cardTop}>
        <div className={styles.compLogo}>
          <FaGoogle />
        </div>

        <div className={styles.bottom}>
          <PriceStateIndicator change={change} increase={true} price={price} />
        </div>
      </div>
      {/* <p>{tickerToName[name]}</p> */}
      <p>{name}</p>
    </div>
  );
};

export default StockCard;
