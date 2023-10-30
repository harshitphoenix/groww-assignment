import { Graph } from "@/types/Graph";
import gldata from "@/data/topgainerloser.json";
import suggData from "@/data/suggestion.json";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_DATA_URL;
export type GainerLoserAPI = {
  change_amount: string;
  change_percentage: string;
  price: string;
  ticker: string;
  volume: string;
};

export type SearchSuggestion = {
  symbol: string;
  name: string;
};
export class DataService {
  public static async getCompanyStockData(Company: string): Promise<Graph[]> {
    const response = await fetch(
      `${BASE_URL}/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${Company}&outputsize=full&apikey=demo`
    );
    const data = (await response.json())["Time Series (Daily)"];
    const result = Object.keys(data).map((key) => ({
      date: new Date(key),
      open: parseFloat(data[key]["1. open"]),
      high: parseFloat(data[key]["2. high"]),
      low: parseFloat(data[key]["3. low"]),
      close: parseFloat(data[key]["4. close"]),
      volume: parseFloat(data[key]["6. volume"]),
    }));
    return result;
  }
  public static async getTopGainersAndLoosers(): Promise<any> {
    const response = await fetch(
      `${BASE_URL}/query?function=TOP_GAINERS_LOSERS&apikey=demo&apikey=demo`
    );
    const topGainerLoserData = gldata;
    // const data = await response.json();
    // return data;
    return topGainerLoserData;
  }

  public static async getSearchSuggestions(
    keyword: string
  ): Promise<SearchSuggestion[]> {
    const response = await fetch(
      `${BASE_URL}/query?function=SYMBOL_SEARCH&keywords=${keyword}&apikey=demo`
    );

    return suggData.bestMatches.map((val: any) => {
      return {
        symbol: val["1. symbol"],
        name: val["2. name"],
      } as SearchSuggestion;
    });
  }

  public static async getCompanyInfo(symbol: string): Promise<any> {
    const response = await fetch(
      `${BASE_URL}/query?function=OVERVIEW&symbol=${symbol}&apikey=demo`
    );

    const data = await response.json();

    return data;
  }
}
