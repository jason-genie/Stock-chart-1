import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function addNewSymbolAction(portfolio, symbol, quantity, entry){
    const data=
    axios
        .post("http://127.0.0.1:8000/add-portfolio-symbol/", {
            portfolio: portfolio,
            symbol: symbol,
            quantity : quantity,
            entry : entry
        })
        
    return data;
  }
  

export function updateSymbolAction(symbolID, symbol, quantity, entry){
    const data=
    axios
        .post("http://127.0.0.1:8000/update-portfolio-symbol/", {
            id : symbolID,
            symbol: symbol,
            quantity : quantity,
            entry : entry
        })
        
    return data;
  }

export function addPortfolioAction(portfolio){
    const data = 
    axios
        .post("http://127.0.0.1:8000/add-portfolio/", {
            portfolio: portfolio
        }).then(res=>res)
    return data;
  }


export function getPortfolioList(){
  
    const data = fetch("http://127.0.0.1:8000/get-portfolio/")
    return data;
        
  }

export function getPortfolioSymbolList(portfolio){
  
    const data = fetch("http://127.0.0.1:8000/get-portfolio-symbol/?portfolio="+portfolio)
    return data;
        
  }

export function getSymbolDataAction(symbol){
    const data = fetch('https://api.tdameritrade.com/v1/marketdata/quotes?apikey=3QHTM7LKNUIAI4IMI3ITKSL37YRFKFUL&symbol='+symbol)
    return data;
}

export function deletePortfolioSymbol(symbolID){
    const data = 
    axios
      .post("http://127.0.0.1:8000/del-portfolio-symbol/", {
          id: symbolID,
      })
      
    return data;
  }


export function deletePortfolio(portfolio){
    const data = 
    axios
      .post("http://127.0.0.1:8000/del-portfolio/", {
        portfolio: portfolio,
      })
      
    return data;
  }

export function fetchPrice(symbol){
    const price = fetch(`https://api.tdameritrade.com/v1/marketdata/${symbol}/pricehistory?apikey=3QHTM7LKNUIAI4IMI3ITKSL37YRFKFUL&periodType=month&period=2&frequencyType=daily&frequency=1`)
    

    return price;
}