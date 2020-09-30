import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export function getStockData(currentPage, pageLimit, symbol, method){
  
    const data = fetch('http://127.0.0.1:8000/get-stock-screen/?page='+currentPage+'&limit='+pageLimit+'&search='+symbol+'&method='+method).then(chart => chart.json())
    return data;
        
  }

export function getTotalRecords(symbol){
  const count = fetch('http://127.0.0.1:8000/get-total-records/?search='+symbol)
  return count;
}
