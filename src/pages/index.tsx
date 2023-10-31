import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Layout from "@/components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import LoadMoreButton from "@/components/LoadMore";
import { useEffect, useState } from "react";
import StockTab from "@/components/StockTab";
import TabSwitch from "@/components/TabSwitch";
import { DataService } from "@/services/dataService";
import { setTopGainers, setTopLosers } from "@/redux/homePageSlice";
import { GainerLoserMapper } from "@/utils/stockGainerLoserMapper";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { ReactQueryKeys } from "@/constants/reactQueryKeys";
import { Spinner } from "@chakra-ui/react";
import {  setCompanyHeaderData } from "@/redux/companyPageSlice";
import { CompanyStock } from "@/types/CompanyInfo";

const Tabs = ["Top Gainers", "Top Losers"];

export default function Home() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<string>("Top Gainers");
  const topgainers = useSelector((state: RootState) => state.home.topGainers);
  const toploser = useSelector((state: RootState) => state.home.topLosers);

  const handleTabSwitch = (tab: string) => {
    setLoading(true);
    setActiveTab(tab);
  };

  const handleStockCardClick = (symbol: CompanyStock) => {
    console.log("symbol", symbol);
    router.push(`/product/${symbol.ticker}`);
    dispatch(setCompanyHeaderData(symbol));
  };

  const handleLoadMoreClick = () => {
    if (activeTab === "Top Gainers") {
      DataService.getTopGainersAndLoosers()
        .then((res) => {
          const gainers = GainerLoserMapper(res.top_gainers);
          dispatch(setTopGainers([...gainers, ...topgainers]));
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      DataService.getTopGainersAndLoosers()
        .then((res) => {
          console.log("res", res);
          const losers = GainerLoserMapper(res.top_losers);
          dispatch(setTopLosers([...losers, ...toploser]));
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };


  useEffect(() => {
    DataService.getTopGainersAndLoosers()
      .then((res) => {
        const gainers = GainerLoserMapper(res.top_gainers);
        const losers = GainerLoserMapper(res.top_losers);
        if (topgainers.length === 0) {
          dispatch(setTopGainers(gainers));
        }
        if (toploser.length === 0) {
          dispatch(setTopLosers(losers));
        }
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [activeTab]);

  return (
    <Layout>
      <TabSwitch tabs={Tabs} activeTab={activeTab} onSwitch={handleTabSwitch} />
      {loading ? (
        <div className={styles.spinner}>
          <Spinner
            alignSelf={"center"}
            alignItems={"center"}
            size={"lg"}
            width={40}
            height={40}
          />
        </div>
      ) : (
        <>
          <StockTab
            cardClick={handleStockCardClick}
            activeTab={activeTab}
            data={activeTab === "Top Gainers" ? topgainers : toploser}
          />
          <LoadMoreButton onClick={handleLoadMoreClick} />
        </>
      )}
    </Layout>
  );
}
