import { Graph } from "@/types/Graph";
import gldata from "@/data/topgainerloser.json";
import suggData from "@/data/suggestion.json";
import compInfo from "@/data/compInfo.json";
import grphData from "@/data/company.json";
import intrday from "@/data/companyIntraDay.json";
import { AboutCompanyType } from "@/types/CompanyInfo";

const BASE_URL = "https://www.alphavantage.co";
const API_KEY = "MAXEQWOV08FATJC3";

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
  public static async getCompanyStockData(
    Company: string,
    adjustment: string
  ): Promise<Graph[] | undefined> {
    let response, result;

    if (adjustment === "1D") {
      response = await fetch(
        `${BASE_URL}/query?function=TIME_SERIES_INTRADAY&symbol=${Company}&interval=5min&outputsize=full&apikey=${API_KEY}`
      );
      if (response.hasOwnProperty("Error Message")) {
        throw Error("Invalid API Call");
      }
      const data = (await response.json())["Time Series (5min)"];
      // const data = intrday["Time Series (5min)"] as Record<
      //   string,
      //   Record<string, string>
      // >;
      result = Object.keys(data).map((key) => ({
        date: key,
        open: parseFloat(data[key]["1. open"]),
        high: parseFloat(data[key]["2. high"]),
        low: parseFloat(data[key]["3. low"]),
        close: parseFloat(data[key]["4. close"]),
        volume: parseFloat(data[key]["6. volume"]),
      }));
    } else if (
      adjustment === "1W" ||
      adjustment === "1Y" ||
      adjustment === "1M"
    ) {
      response = await fetch(
        `${BASE_URL}/query?function=TIME_SERIES_DAILY&symbol=${Company}&outputsize=full&apikey=${API_KEY}`
      );
      if (response.hasOwnProperty("Error Message")) {
        throw Error("Invalid API Call");
      }
      const data = (await response.json())["Time Series (Daily)"];
      // const data = grphData["Time Series (Daily)"] as Record<
      //   string,
      //   Record<string, string>
      // >;
      result = Object.keys(data).map((key) => ({
        date: key,
        open: parseFloat(data[key]["1. open"]),
        high: parseFloat(data[key]["2. high"]),
        low: parseFloat(data[key]["3. low"]),
        close: parseFloat(data[key]["4. close"]),
        volume: parseFloat(data[key]["6. volume"]),
      }));
    }

    return result;
  }

  public static async getTopGainersAndLoosers(): Promise<any> {
    const response = await fetch(
      `${BASE_URL}/query?function=TOP_GAINERS_LOSERS&apikey=demo&apikey=${API_KEY}`
    );
    const topGainerLoserData = gldata;
    const data = await response.json();
    return data;
  }

  public static async getSearchSuggestions(
    keyword: string
  ): Promise<SearchSuggestion[]> {
    const response = await fetch(
      `${BASE_URL}/query?function=SYMBOL_SEARCH&keywords=${keyword}&apikey=${API_KEY}`
    );

    const data = await response.json();
    if (data.hasOwnProperty("Information")) {
      return data;
    }
    return data.bestMatches.map((val: any) => {
      return {
        symbol: val["1. symbol"],
        name: val["2. name"],
      } as SearchSuggestion;
    });
  }

  public static async getCompanyInfo(
    symbol: string
  ): Promise<AboutCompanyType> {
    const response = await fetch(
      `${BASE_URL}/query?function=OVERVIEW&symbol=${symbol}&apikey=${API_KEY}`
    );

    const data = await response.json();

    return data;
  }
}
