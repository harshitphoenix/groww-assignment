import AboutCompany from "@/components/AboutCompany";
import CompanyPageHeader from "@/components/CompanyPageHeader";
import Layout from "@/components/Layout";
import StockGraph from "@/components/StockGraph";
import { DataService } from "@/services/dataService";
import styles from "@/styles/ProductPage.module.css";
import { useParams } from "next/navigation";
import { useMemo } from "react";
const ProductPage = () => {
  // const params = useParams();
  // console.log(params.compSymbol);

  const compData = useMemo(async () => {
    const data = await DataService.getCompanyInfo("slkj" as string);
    // const res =await data.json();
    return data;
  }, []);

  return (
    <Layout>
      <div className={styles.container}>
        <CompanyPageHeader
          price="$2334"
          increase={false}
          change={"40%"}
          companyDescription="MTA, Common Stocks"
          companyName="Facebook"
          companySymbol="NA"
          exchange="NSQ"
        />
        <StockGraph />
        <AboutCompany />
      </div>
    </Layout>
  );
};

export default ProductPage;
