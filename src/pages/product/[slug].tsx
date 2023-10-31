import AboutCompany from "@/components/AboutCompany";
import CompanyNotFound from "@/components/CompanyNotFound";
import CompanyPageHeader from "@/components/CompanyPageHeader";
import Layout from "@/components/Layout";
import StockGraph from "@/components/StockGraph";
import { setCompany, setGraphData } from "@/redux/companyPageSlice";
import { RootState } from "@/redux/store";
import { DataService } from "@/services/dataService";
import styles from "@/styles/ProductPage.module.css";
import { AboutCompanyType } from "@/types/CompanyInfo";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const ProductPage = () => {
  const toast = useToast();
  const router = useRouter();
  const dispatch = useDispatch();
  const [activeRange, setActiveRange] = useState("1D");
  const company: AboutCompanyType | null = useSelector(
    (state: RootState) => state.company.company
  );
  const companyMeta = useSelector(
    (state: RootState) => state.company.companyHeaderData
  );

  const graphData = useSelector((state: RootState) => state.company.graphData);

  const handleRangeChange = (val: string) => {
    console.log(val);
    setActiveRange(val);
  };

  useEffect(() => {
    if (router.query.slug) {
      DataService.getCompanyInfo(router.query.slug as string).then(
        (res: AboutCompanyType) => {
          if(JSON.stringify(res).includes("Requests")){
            toast({
              status:'error',
              title:"API Limit Reached",
              isClosable:true
            })
          }
          dispatch(setCompany(res));
        }
      );

      DataService.getCompanyStockData(router.query.slug as string, "1M")
        .then((data) => {
          dispatch(setGraphData(data));
          if(JSON.stringify(data).includes("Requests")){
            toast({
              status:'error',
              title:"API Limit Reached",
              isClosable:true
            })
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [router.query.slug]);

  return (
    <Layout>
      {company ? (
        <div>
          {" "}
          <div className={styles.container}>
            <CompanyPageHeader
              compAddress={company.Address}
              name={company.Name}
              companyMeta={companyMeta}
            />
            <StockGraph
              activeRange={activeRange}
              graphData={graphData}
              symbol={company.Symbol}
              changeActiveRange={handleRangeChange}
              adjustment={`TIME_SERIES_WEEKLY`}
            />
            <AboutCompany company={company} />
          </div>
        </div>
      ) : (
        <CompanyNotFound />
      )}
    </Layout>
  );
};

export default ProductPage;
