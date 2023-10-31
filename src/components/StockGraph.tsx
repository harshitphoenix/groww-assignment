import { DataService } from "@/services/dataService";
import { Graph } from "@/types/Graph";
import { CChartLine } from "@coreui/react-chartjs";
import { useEffect, useMemo, useState } from "react";
import styles from "@/styles/StockGraph.module.css";
import StockGraphRangeSelector from "./StockGraphRangeSelector";
const range = ["1D", "1W", "1M", "1Y"];

type StockGraphProps = {
  symbol: string;
  adjustment: string;
  graphData?: Graph[];
  activeRange:string
  changeActiveRange?: (val: string) => void;
};
const StockGraph = ({ adjustment, symbol, graphData, activeRange, changeActiveRange }: StockGraphProps) => {
  
  const xAxes = useMemo(() => {
    let temp = graphData?.map((val) => val.date).slice(0, 30);
    if (activeRange === "1M") {
      temp = temp?.slice(0, 30);
    } else if (activeRange === "1Y") {
      temp = temp?.slice(0, 365);
    }
    return temp;
  }, [activeRange]);

  const yAxes = useMemo(() => {
    let temp = graphData?.map((val) => val.high);
    if (activeRange === "1M") {
      temp = temp?.slice(0, 30);
    } else if (activeRange === "1Y") {
      temp = temp?.slice(0, 365);
    }
    return temp;
  }, [activeRange]);


  return (
    <div className={styles.container}>
      <CChartLine
        className={styles.chart}
        typeof="line"
        data={{
          labels: xAxes,
          datasets: [
            {
              label: "Stock Prices (High)",
              backgroundColor: "rgba(220, 220, 220, 0.2)",
              borderColor: "rgba(220, 220, 220, 1)",
              pointBackgroundColor: "rgba(220, 220, 220, 1)",
              pointBorderColor: "#fff",
              data: [...(yAxes ?? [])],
            },
            // {
            //   label: "My Second dataset",
            //   backgroundColor: "rgba(151, 187, 205, 0.2)",
            //   borderColor: "rgba(151, 187, 205, 1)",
            //   pointBackgroundColor: "rgba(151, 187, 205, 1)",
            //   pointBorderColor: "#fff",
            //   data: [50, 12, 28, 29, 7, 25, 12, 70, 60],
            // },
          ],
        }}
        // options={{
        //   plugins: {
        //     legend: {
        //       labels: {
        //         color: getStyl("--cui-body-color"),
        //       },
        //     },
        //   },
        //   scales: {
        //     x: {
        //       grid: {
        //         color: getStyle("--cui-border-color-translucent"),
        //       },
        //       ticks: {
        //         color: getStyle("--cui-body-color"),
        //       },
        //     },
        //     y: {
        //       grid: {
        //         color: getStyle("--cui-border-color-translucent"),
        //       },
        //       ticks: {
        //         color: getStyle("--cui-body-color"),
        //       },
        //     },
        //   },
        // }}
      />
      <StockGraphRangeSelector
        activeRange={activeRange}
        range={range}
        onChange={changeActiveRange}
      />
    </div>
  );
};

export default StockGraph;
