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
        <h1>Product</h1>
        {/* <div> */}
        <CompanyPageHeader
          price="$2334"
          increase={false}
          change={"40%"}
          companyDescription="AAPL, Common Stocks"
          companyName="Apple"
          companySymbol="NA"
          exchange="NSQ"
        />
        {/* </div> */}
        {/* <div> */}
        <StockGraph />
        {/* </div> */}
        {/* <div> */}
        <AboutCompany  />
        {/* </div> */}
      </div>
    </Layout>
  );
};

export default ProductPage;
