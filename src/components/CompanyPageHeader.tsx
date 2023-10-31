import Image from "next/image";
import styles from "@/styles/CompanyPageHeader.module.css";
import PriceStateIndicator from "./PriceStateIndicator";
import { FaAppStore, FaFacebook } from "react-icons/fa";
import { CompanyPageHeader } from "@/types/CompanyInfo";
type CompanyPageHeaderProps = {
  companyMeta?: CompanyPageHeader;
  name: string;
  compAddress?: string;
  price?: string;
  changePercent?: string;
};

const CompanyPageHeader = ({
  companyMeta,
  name,
  compAddress,
  changePercent,
  price,
}: CompanyPageHeaderProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.leftContainer}>
        <div className={styles.logo}>
          <FaFacebook size={50} />
        </div>
        <div>
          <p>{name}</p>
          <p>{compAddress}</p>
          <p>{companyMeta?.companyDescription}</p>
          <p>{companyMeta?.exchange}</p>
        </div>
      </div>
      <div>
        <PriceStateIndicator
          price={companyMeta?.price??price}
          increase={!companyMeta?.changePercent.includes("-")}
          change={companyMeta?.changePercent??changePercent}
        />
      </div>
    </div>
  );
};

export default CompanyPageHeader;
