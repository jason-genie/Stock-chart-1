import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export function getStockData(currentPage, pageLimit, symbol, method){
  
    const data = fetch('http://127.0.0.1:8000/get-stock-screen/?page='+currentPage+'&limit='+pageLimit+'&search='+symbol+'&method='+method).then(chart => chart.json())
    return data;
        
  }

export function getTotalRecords(symbol, method){
  const count = fetch('http://127.0.0.1:8000/get-total-records/?search='+symbol+'&method='+method)
  return count;
}

export function getLastPrice(symbol, time){
  const data = fetch(`https://api.tdameritrade.com/v1/marketdata/${symbol}/pricehistory?endDate=${time}&startDate=${time}&apikey=3QHTM7LKNUIAI4IMI3ITKSL37YRFKFUL&periodType=day&period=1&frequencyType=minute&frequency=30`).then(res => res.json())
  return data;
}