import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function addNewSymbol(symbol, quantity, entry){
    axios
        .post("http://127.0.0.1:8000/", {
            symbol: symbol,
            quantity : quantity,
            entry : entry
        })
        .then(res => {
          toast("Successful!");
  
        })
        .catch(err => {
            toast("Save error!");
        });
  }
  

export function updateSymbol(symbolID, symbol, quantity, entry){
    axios
        .post("http://127.0.0.1:8000/", {
            id : symbolID,
            symbol: symbol,
            quantity : quantity,
            entry : entry
        })
        .then(res => {
          toast("Successful!");
  
        })
        .catch(err => {
            toast("Save error!");
        });
  }

export function addPortfolio(symbolID, symbol, quantity, entry){
    axios
        .post("http://127.0.0.1:8000/", {
            id : symbolID,
            symbol: symbol,
            quantity : quantity,
            entry : entry
        })
        .then(res => {
          toast("Successful!");
  
        })
        .catch(err => {
            toast("Save error!");
        });
  }