import React, { useEffect, useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Search from "@material-ui/icons/Search";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Pagination from 'reactjs-hooks-pagination';
import moment from 'moment';
import "../../assets/css/bootstrap.min.css"
import { getStockData, getTotalRecords, searchSymbolSreener, getLastPrice } from "./screener_action";

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  }
};

const useStyles = makeStyles(styles);

const pageLimit = 20;

export default function TableList() {

 
  const classes = useStyles();
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true) 
  const [error, setError] = useState('')  
  const [totalRecords, setTotalRecords] = useState(0);
  const [currentPage,setCurrentPage] = useState(1);
  const [symbolName, setSymbolName] = useState('');
  const [method, setMethod] = useState(0);
  const [wchg, setWchg] = useState([]);
  const [mchg, setMchg] = useState([]);
  const [ychg, setYchg] = useState([]);

  useEffect(() => {

    getRecords(method);
    getData(method)
  }, [currentPage, method]);

  function onSearch(){
    getRecords(method);
    getData(method);
  }

  function getData(method_val){
    getStockData(currentPage, pageLimit, symbolName.toUpperCase(), method_val).then(data => {
      // debugger;
      setLoading(false);
      setStocks(data);
      var wtime = Date.now()-7*24*3600000;
      var mtime = Date.now()-30*24*3600000;
      var ytime = Date.now()-365*24*3600000;
      let wdata = [];
      let mdata = [];
      let ydata = [];

      // data.map((stock) => {
      //   getLastPrice(stock.symbol, wtime).then((data) =>{
      //     Promise.resolve(data).then((value) => {
      //         if(value.candles) {
      //           wdata.push(value.candles[0]);
      //         }
             
      //         if(wdata.length == pageLimit){
      //           setWchg(wdata);
      //         }
      //     });
      //   });

      //   getLastPrice(stock.symbol, mtime).then((data) =>{
      //     Promise.resolve(data).then((value) => {
              
      //         if(value.candles){
      //           mdata.push(value.candles[0]);
      //         }
      //         if(mdata.length == pageLimit){
      //           setMchg(mdata);
      //         }
      //     });
      //   });

      //   // getLastPrice(stock.symbol, ytime).then((data) =>{
      //   //   Promise.resolve(data).then((value) => {
      //   //       if(value.candles){
      //   //         ydata.push(value.candles[0]);
      //   //       }
             
      //   //       if(ydata.length == pageLimit){
      //   //         setYchg(ydata);
      //   //       }
      //   //   });
      //   // });
      // })
       
      setError('')
		}).catch(error => {  
      setLoading(false)  
      setStocks([])  
      setError('Something went wrong')
    })
  }

  function getRecords(method_val){
    getTotalRecords(symbolName.toUpperCase(), method_val).then(d => d.json()).then((data) => {
      Promise.resolve(data).then(function(value){
        setTotalRecords(value);
      });
    });
  }

  function selectMethod(value){
    setMethod(value);
    getRecords(value);
    getData(value);
  }

  // console.log("++++++", wchg, mchg, ychg);

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Stock screener</h4>
            {/* <p className={classes.cardCategoryWhite}>
              Here is a subtitle for this table
            </p> */}
          </CardHeader>
          <CardBody>
              <div className={classes.searchWrapper}>
                <CustomInput
                  id="symbolSearch"
                  formControlProps={{
                    className: classes.margin + " " + classes.search
                  }}
                  inputProps={{
                    placeholder: "Input symbol...",
                      inputProps: {
                        "aria-label": "Search"
                      },
                    value: symbolName,
                    onChange: (e) => setSymbolName(e.target.value)
                  }}
                />
                 <Button onClick={()=>onSearch()} color="white" aria-label="edit" justIcon round>
                   <Search />
                </Button>
                <div>
                  <select value={method} onChange={(e)=>selectMethod(e.target.value)} className="selecting-period" style={{marginTop : "-34px", width : "250px"}}>
                    <option value="0">Hourly price increase</option>
                    <option value="1">Hourly volume increase</option>
                    <option value="2">Daily price increase</option>
                    <option value="3">Daily volume increase</option>
                    <option value="4">Weekly price increase</option>
                    <option value="5">Weekly volume increase</option>
                  </select>
                </div>
              </div>
              
            <Table
              tableHeaderColor="primary"
              tableHead={[
                "Symbol",
                "Date",
                "Open",
                "High",
                "Low",
                "Close",
                "Volume",
                "Percent",
                ]}
                
              tableData={

                  stocks.map((stock, index) => {
                    var t = new Date(stock.datetime);
                    var formatdate = moment(t).format("YYYY-MM-DD hh:mm:ss");
                    var percent = (stock.close-stock.open)*100/stock.open;
                    percent = percent.toFixed(2) + "%";

                    // var wchg_per = ''
                    // if(wchg[index]){
                    //   wchg_per = wchg[index].open;
                    // }
                    
                    // var mchg_per = '';
                    // if(mchg[index]){
                    //   mchg_per = mchg[index].open;
                    // }

                    return [stock.symbol, formatdate, stock.open, stock.high, stock.low, stock.close, stock.volume, percent]
                  } )

                // stocks.map(stock => [stock.symbol, stock.datetime, stock.open, stock.high, stock.cashFlowCoverageRatio, stock.low])
                // symbols.map(symbol => [symbol, "Niger", "Oud-Turnhout", "$36,738", "Niger", "Niger", "Niger", "Niger", "Niger", "Niger", "Niger"])
              }
            />
            <div className="d-flex flex-row py-4 justify-content-end">
              <Pagination
                totalRecords={totalRecords}
                pageLimit={pageLimit}
                pageRangeDisplayed={1}
                onChangePage={setCurrentPage}
              />
            </div>
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
