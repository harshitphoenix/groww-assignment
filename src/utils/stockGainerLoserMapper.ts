import { GainerLoserAPI } from "@/services/dataService";
import { GainerOrLoser } from "@/types/Stock";

export const GainerLoserMapper = (data:GainerLoserAPI[]) => {
  const stockData: GainerOrLoser[] = data.map((val: any) => {
    const item: GainerOrLoser = {
      changeAmount: val["change_amount"],
      changePercent: val["change_percentage"],
      price: val["price"],
      ticker: val["ticker"],
      volume: val["volume"],
      companyName: "NA",
    };
    return item;
  });

  return stockData;
};
