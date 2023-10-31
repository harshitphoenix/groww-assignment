import { AboutCompanyType } from "@/types/CompanyInfo";
import AboutMeta from "./AboutMeta";
import AboutTags from "./AboutTags";
import styles from "@/styles/AboutCompany.module.css";

type AboutCompanyProps = {
  company: AboutCompanyType;
  logo?: string;
};
const AboutCompany = ({ company, logo }: AboutCompanyProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>About {company?.Name}</div>
      <div className={styles.content}>
        <div className={styles.compDesc}>
          <p>{company?.Description}</p>
        </div>
        <div className={styles.compTags}>
          <AboutTags lable="Industry" tags={company?.Industry} />
          <AboutTags lable="Founded" tags={company?.Sector} />
        </div>
        <div className={styles.priceLimitContainer}>
          <div className={styles.priceLimit}>
            <p>53-Weeks High</p>
            <p className={styles.pricePoint}>{company["52WeekLow"]!}</p>
          </div>
          <div className={styles.priceLimit}>
            <p>53-Weeks Low</p>
            <p className={styles.pricePoint}>{company["52WeekLow"]!}</p>
          </div>
        </div>
        <div className={styles.compMeta}>
          <AboutMeta
            label="MarketCapitalization"
            value={company?.MarketCapitalization}
          />
          <AboutMeta label="EVToRevenue" value={`$ ${company?.EVToRevenue}`} />
          <AboutMeta label="P/E Ratio" value={company?.PERatio} />
        </div>
      </div>
    </div>
  );
};

export default AboutCompany;
