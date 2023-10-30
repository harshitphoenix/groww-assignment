import AboutMeta from "./AboutMeta";
import AboutTags from "./AboutTags";
import styles from "@/styles/AboutCompany.module.css";
type AboutCompany = {
  Symbol: string;
  AssetType: string;
  Name: string;
  Description: string;
  Exchange: string;
  Currency: string;
  Country: string;
  Sector: string;
  Industry: string;
  Address: string;
  FullTimeEmployees: string;
  FiscalYearEnd: string;
  LatestQuarter: string;
  MarketCapitalization: string;
  EBITDA: string;
  PERatio: string;
  PEGRatio: string;
  BookValue: string;
  DividendPerShare: string;
  DividendYield: string;
  EPS: string;
  RevenuePerShareTTM: string;
  ProfitMargin: string;
  OperatingMarginTTM: string;
  ReturnOnAssetsTTM: string;
  ReturnOnEquityTTM: string;
  RevenueTTM: string;
  GrossProfitTTM: string;
  DilutedEPSTTM: string;
  QuarterlyEarningsGrowthYOY: string;
  QuarterlyRevenueGrowthYOY: string;
  AnalystTargetPrice: string;
  TrailingPE: string;
  ForwardPE: string;
  PriceToSalesRatioTTM: string;
  PriceToBookRatio: string;
  EVToRevenue: string;
  EVToEBITDA: string;
  Beta: string;
  "52WeekHigh": string;
  "52WeekLow": string;
  "50DayMovingAverage": string;
  "200DayMovingAverage": string;
  SharesOutstanding: string;
  SharesFloat: string;
  SharesShort: string;
};

type AboutCompanyProps = {
  company: AboutCompany;
  logo: string;
};
const AboutCompany = ({ company, logo }: AboutCompanyProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>About {company.Name}</div>
      <div>
        <div className={styles.compDesc}>
          <p>{company.Description}</p>
        </div>
        <div className={styles.compTags}>
          <AboutTags lable="Industry" tags="Consumer Electronics" />
          <AboutTags lable="Founded" tags="April 1, 1976" />
          <AboutTags lable="Industry" tags="Consumer Electronics" />
          <AboutTags lable="Founded" tags="April 1, 1976" />
          <AboutTags lable="Industry" tags="Consumer Electronics" />
          <AboutTags lable="Founded" tags="April 1, 1976" />
          <AboutTags lable="Industry" tags="Consumer Electronics" />
          <AboutTags lable="Founded" tags="April 1, 1976" />
          <AboutTags lable="Industry" tags="Consumer Electronics" />
          <AboutTags lable="Founded" tags="April 1, 1976" />
        </div>
        <div className={styles.priceLimitContainer}>
          <div className={styles.priceLimit}>
            <p>53-Weeks High</p>
            <p className={styles.pricePoint}>{company["52WeekLow"]}</p>
          </div>
          <div className={styles.priceLimit}>
            <p>53-Weeks High</p>
            <p className={styles.pricePoint}>{company["52WeekHigh"]}</p>
          </div>
        </div>
        <div className={styles.compMeta}>
          <AboutMeta
            label="MarketCapitalization"
            value={company.MarketCapitalization}
          />
          <AboutMeta label="EVToRevenue" value={company.EVToRevenue} />
          <AboutMeta label="P/E Ratio" value={company.PERatio} />
        </div>
      </div>
    </div>
  );
};

export default AboutCompany;
