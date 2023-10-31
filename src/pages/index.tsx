import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
// import styles from "@/styles/Home.module.css";
import Layout from "@/components/Layout";
import { Provider, useDispatch, useSelector } from "react-redux";
import { RootState, store } from "@/redux/store";
import LoadMoreButton from "@/components/LoadMore";
import { useEffect, useState } from "react";
import StockTab from "@/components/StockTab";
import TabSwitch from "@/components/TabSwitch";
import { DataService } from "@/services/dataService";
import { setTopGainers, setTopLosers } from "@/redux/homePageSlice";
import { GainerLoserMapper } from "@/utils/stockGainerLoserMapper";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

const Tabs = ["Top Gainers", "Top Losers"];
export default function Home() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>("Top Gainers");
  const gainers = useSelector((state: RootState) => state.home.topGainers);
  const loser = useSelector((state: RootState) => state.home.topLosers);

  const handleTabSwitch = (tab: string) => {
    setLoading(true);
    setActiveTab(tab);
  };

  const handleStockCardClick = (symbol: string) => {
    console.log("symbol", symbol);
    router.push(`/product/${symbol}`);
  };

  const handleLoadMoreClick = () => {
    console.log("load more");
  };

  
  useEffect(() => {
    DataService.getTopGainersAndLoosers()
      .then((res) => {
        console.log("res", res);
        const gainers = GainerLoserMapper(res.top_gainers);
        const losers = GainerLoserMapper(res.top_losers);
        dispatch(setTopLosers(losers));
        dispatch(setTopGainers(gainers));
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
        "Loading"
      ) : (
        <StockTab
          cardClick={handleStockCardClick}
          activeTab={activeTab}
          data={activeTab === "Top Gainers" ? gainers : loser}
        />
      )}

      <LoadMoreButton onClick={handleLoadMoreClick} />
    </Layout>
  );
}
