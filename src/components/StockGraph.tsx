import { DataService } from "@/services/dataService";
import { Graph } from "@/types/Graph";
import { CChartLine } from "@coreui/react-chartjs";
import { useEffect, useState } from "react";
import styles from "@/styles/StockGraph.module.css";
import StockGraphRangeSelector from "./StockGraphRangeSelector";
const range = ["1D", "1W", "1M", "3M", "6M", "1Y", "2Y", "5Y", "All"];

const StockGraph = () => {
  const [graphData, setGraphData] = useState<Graph[]>([]);
  useEffect(() => {
    DataService.getCompanyStockData("RELIANCE.BSE")
      .then((data) => {
        setGraphData(data);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
    DataService.getTopGainersAndLoosers()
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className={styles.container}>
      <p>Stocks</p>
      <CChartLine
        className={styles.chart}
        // type="line"
        data={{
          labels: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
          ],
          datasets: [
            {
              label: "My First dataset",
              backgroundColor: "rgba(220, 220, 220, 0.2)",
              borderColor: "rgba(220, 220, 220, 1)",
              pointBackgroundColor: "rgba(220, 220, 220, 1)",
              pointBorderColor: "#fff",
              data: [40, 20, 12, 39, 10, 40, 39, 80, 40],
            },
            {
              label: "My Second dataset",
              backgroundColor: "rgba(151, 187, 205, 0.2)",
              borderColor: "rgba(151, 187, 205, 1)",
              pointBackgroundColor: "rgba(151, 187, 205, 1)",
              pointBorderColor: "#fff",
              data: [50, 12, 28, 29, 7, 25, 12, 70, 60],
            },
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
      <StockGraphRangeSelector range={range} />
    </div>
  );
};

export default StockGraph;
