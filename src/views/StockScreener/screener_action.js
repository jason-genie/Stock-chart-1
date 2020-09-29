import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export function getStockData(){
  
    const data = fetch("http://127.0.0.1:8000/get-stock-screen/").then(chart => chart.json())
    return data;
        
  }