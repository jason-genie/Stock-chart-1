import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function fetchGainers(){
  const data = fetch("https://api.iextrading.com/1.0/stock/market/list/gainers")
    .then(gainers => gainers.json())
    return data;
}

export function fetchCompany(symbol){
  const company = fetch(`https://api.iextrading.com/1.0/stock${symbol}/company`)
  .then(company => company.json())

  return company;

}

export function fetchChart(symbol){
  const chart = fetch(`https://api.iextrading.com/1.0/stock/${symbol}/chart`)
    .then(chart => chart.json())

    return chart;
}

export function fetchSymbol(){
    const symbol = fetch(`https://api.iextrading.com/1.0/ref-data/symbols`)
      .then(chart => chart.json())
  
      return symbol;
  }

export function fetchPrice(symbol, periodType, period, frequencyType, frequency){
    const price = fetch(`https://api.tdameritrade.com/v1/marketdata/${symbol}/pricehistory?apikey=3QHTM7LKNUIAI4IMI3ITKSL37YRFKFUL&periodType=${periodType}&period=${period}&frequencyType=${frequencyType}&frequency=${frequency}`)
    .then(chart => chart.json())

    return price;
}

export function addPriceAll(){
  axios
      .post("http://127.0.0.1:8000/price-history/add/", {

      })
      .then(res => {
        toast("Successful!");

      })
      .catch(err => {
          toast("Update error!");
      });
}

export function addSymbolAction(symbol){
  axios
      .post("http://127.0.0.1:8000/add-symbol/", {
          symbol: symbol,

      })
      .then(res => {
        toast("Successful!");

      })
      .catch(err => {
          toast("Save error!");
      });
}

export function getSymbolList(){
  
  const data = fetch("http://127.0.0.1:8000/get-symbollist/")
  return data;
      
}

export function getWatchList(){
  
  const data = fetch("http://127.0.0.1:8000/get-watchlist/")
  return data;
      
}

export function deleteSymbol(symbol){
  axios
    .post("http://127.0.0.1:8000/del-symbol/", {
        symbol: symbol,
    })
    .then(res => {
      toast("Successful!");

    })
    .catch(err => {
        toast("delete error!");
    });
}