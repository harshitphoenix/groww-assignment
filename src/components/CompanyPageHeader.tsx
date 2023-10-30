import Image from "next/image";
import styles from "@/styles/CompanyPageHeader.module.css";
import PriceStateIndicator from "./PriceStateIndicator";
type CompanyPageHeaderProps = {
  companyName: string;
  companyDescription: string;
  companySymbol: string;
  exchange: string;
  price: string;
  change: string;
  increase: boolean;
};

const CompanyPageHeader = ({
  change,
  companyDescription,
  companyName,
  companySymbol,
  exchange,
  increase,
  price,
}: CompanyPageHeaderProps) => {
  return (
    <div className={styles.container}>
      <div>
        <div>
          <p>{companyName}</p>
          <p>{companyDescription}</p>
          <p>{exchange}</p>
        </div>
      </div>
      <div>
        <PriceStateIndicator
          price={price}
          increase={increase}
          change={change}
        />
      </div>
    </div>
  );
};

export default CompanyPageHeader;
