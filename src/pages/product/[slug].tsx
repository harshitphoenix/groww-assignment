import AboutCompany from "@/components/AboutCompany";
import CompanyNotFound from "@/components/CompanyNotFound";
import CompanyPageHeader from "@/components/CompanyPageHeader";
import ErrorMessage from "@/components/ErrorMessage";
import Layout from "@/components/Layout";
import StockGraph from "@/components/StockGraph";
import { setCompany, setGraphData } from "@/redux/companyPageSlice";
import { RootState } from "@/redux/store";
import { DataService } from "@/services/dataService";
import styles from "@/styles/ProductPage.module.css";
import { AboutCompanyType } from "@/types/CompanyInfo";
import { Spinner, useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const ProductPage = () => {
  const toast = useToast();
  const router = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [apiLimitReached, setApiLimitReached] = useState(false);
  const [activeRange, setActiveRange] = useState("1D");
  const company: AboutCompanyType | null = useSelector(
    (state: RootState) => state.company.company
  );
  const companyMeta = useSelector(
    (state: RootState) => state.company.companyHeaderData
  );

  const graphData = useSelector((state: RootState) => state.company.graphData);

  const handleRangeChange = (val: string) => {
    setActiveRange(val);
  };

  useEffect(() => {
    if (router.query.slug) {
      DataService.getCompanyInfo(router.query.slug as string).then(
        (res: AboutCompanyType) => {
          if (res.hasOwnProperty("Information")) {
            setApiLimitReached(true);
          } else {
            dispatch(setCompany(res));
          }
        }
      );

      DataService.getCompanyStockData(router.query.slug as string, "1D")
        .then((data) => {
          if (!data || data.hasOwnProperty("Information")) {
            setApiLimitReached(true);
          } else {
            dispatch(setGraphData(data));
          }
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [router.query.slug]);

  return (
    <Layout>
      {loading ? (
        <div className={styles.spinner}>
          <Spinner
            alignSelf={"center"}
            alignItems={"center"}
            width={140}
            height={140}
            color="#12D18E"
          />
        </div>
      ) : company ? (
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
      ) : !apiLimitReached ? (
        <ErrorMessage msg="Sorry, but we've reached our API limit for the day. We appreciate your enthusiasm! Please check back tomorrow to access our services again" />
      ) : (
        <CompanyNotFound />
      )}
    </Layout>
  );
};

export default ProductPage;
