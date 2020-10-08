import React, { useState, useEffect } from "react";
// react plugin for creating charts
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";

// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Search from "@material-ui/icons/Search";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { ToastContainer, toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { Dropdown } from 'semantic-ui-react'

import Chart from './chart';
import { getData } from "./utils"
import { fetchGainers, fetchCompany, fetchChart, fetchSymbol, fetchPrice, addPriceAll, addSymbolAction, getSymbolList, getWatchList, deleteSymbol } from "./ganinerAction";

import { TypeChooser } from "react-stockcharts/lib/helper";


import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import loadingSpinner from "assets/img/loading-spinner.gif";



const useStyles = makeStyles(styles);

const stockScreener = require('@stonksjs/stock-screener');
const filters = stockScreener.filters;


export default function Dashboard() {
  
  const classes = useStyles();
  const [dataPoints1, setDP1] = useState();
  const [isLoading, setLoading] = useState(false);
  const [symbolName, setSymbolName] = useState('A');
  const [newSymbol, setNewSymbol] = useState('');
  const [symbols, setSymbols] = useState([]);
  const [symbolList, setSymbolList] = useState([]);
  const [selecVal, setSelectVal] = useState(0);
  const [period, setPeriod] = useState('5');
  const [periodType, setPeriodType] = useState('day');
  const [frequency, setFrequency] = useState('1');
  const [frequencyType, setFrequencyType] = useState('minute');
  const [initaial] = useState([{perType: "day", period: "5", freType : "minute", frequency: "1"},
                                {perType: "day", period: "10", freType : "minute", frequency: "30"},
                                {perType: "year", period: "2", freType : "daily", frequency: "1"},
                                {perType: "year", period: "15", freType : "weekly", frequency: "1"},
                                {perType: "year", period: "20", freType : "monthly", frequency: "1"}]);

  // const [newSymbol, setNewSymbol] = useState('');
  // const [volume, setVolume] = useState('');
  // const [high, setHigh] = useState('');
  // const [low, setLow] = useState('');
  // const [open, setOpen] = useState('');

  useEffect(() => {

    setLoading(true);

    // fetchSymbol().then(data => {
    //   // console.log("data:: ", data);
    //   setSymbols(data.map(s=> s.symbol));
    //   setLoading(false);
    // });

    getWatchList().then(chart => chart.json()).then(res => {
      const temp = res.map(s => s.symbol);
      setSymbols(temp);
      setLoading(false)
    });

    fetchPrice(symbolName, periodType, period, frequencyType, frequency).then(price => {
      setDP1(price.candles);
      setLoading(false);
    });

    getSymbolList().then(chart => chart.json()).then(res => {
      const temp = res.map(s => s.symbol);
      setSymbolList(temp);
    });

  }, []);

  function addSymbol(){
    // const newSymbol = document.getElementById("symbolname").value;
    // const volume = document.getElementById("volume").value;
    // const high = document.getElementById("high").value;
    // const low = document.getElementById("low").value;
    // const open = document.getElementById("open").value;

    if(newSymbol == ''){
      toast("Fill in input!")
    }
    else{
      addSymbolAction(newSymbol.toUpperCase());
      window.location.reload(false);     
    }
  }

  
  function symbolSearch(){
    // setSymbolName(symbol);
    var filter, symbol, ul, li, a, i;
    symbol = document.getElementById("symbolSearch").value;
    setSymbolName(symbol);
    filter = symbol.toUpperCase();
    ul = document.getElementById("symbolMenu");
    li = ul.getElementsByTagName("li");
    for (i = 0; i < li.length; i++) {
      a = li[i].getElementsByTagName("a")[0];
      if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
        li[i].style.display = "";
      } else {
        li[i].style.display = "none";
      }
    }
  }

  function symbolItem(symbol){
    setLoading(true);
    document.getElementById("symbolSearch").value = symbol;
    setSymbolName(symbol);
    fetchPrice(symbol, periodType, period, frequencyType, frequency).then(price => {

      if(price.candles.length == 0){
        toast("No data about this symbol!")
      }
      else{
        setDP1(price.candles);
        console.log("success");
      }
      setLoading(false);
    });
  }

  function delSymbol(symbol){
    
    confirmAlert({
      title: 'Confirm to submit',
      message: 'Are you sure to do this.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            deleteSymbol(symbol);
            window.location.reload(false);
          }
        },
        {
          label: 'No',
        }
      ]
    });
    
  }

  function setPeriodData(symbol, e){
    setLoading(true);
    setSelectVal(e.target.value);
    const perType = initaial[e.target.value].perType;
    const per = initaial[e.target.value].period;
    const freType = initaial[e.target.value].freType;
    const fre = initaial[e.target.value].frequency;

    fetchPrice(symbol, perType, per, freType, fre).then(price => {
      if(price.candles.length <= 1){
        toast("No data about this period!")
        console.log("error");
      }
      else{
        // console.log("aaa", price.candles);
        setDP1(price.candles);
        console.log("success");
      }
      setLoading(false);
    });
    setPeriodType(perType);
    setPeriod(per);
    setFrequency(fre);
    setFrequencyType(freType);
  }

  function addpriceall()
 {
    addPriceAll();
 }
  // console.log("chart datapoints: ", dataPoints1);

  return (

  
    <div>
      {
      isLoading == true ? (<div className="isLoading"><img src={loadingSpinner} alt="..." /></div>) : (<div></div>)
      }
    <Card>
      <CardHeader color="primary">
        <h4 className={classes.cardTitleWhite}>Stock chart</h4>
        <p className={classes.cardCategoryWhite}>
          {/* Created using Roboto Font Family */}
        </p>
      </CardHeader>
      <CardBody>
        <GridContainer>
          <GridItem xs={12} sm={12} md={3}>
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
                  onChange: (e) => symbolSearch()
                }}
              />
              <Button onClick={()=>symbolSearch()} color="white" aria-label="edit" justIcon round>
                <Search />
              </Button>
              <List id="symbolMenu" className="search-symbol-list">
              {
                symbols.map(symbol => (
                  <ListItem><a href="#">{symbol}</a>
                      <span class="material-icons" onClick={()=> symbolItem(symbol)} style={{marginLeft : "65%", color : "purple", position : "absolute", cursor: "pointer"}}>
                      remove_red_eye
                      </span>
                      <span class="material-icons" onClick={()=>delSymbol(symbol)} style={{marginLeft : "75%", color : "purple", position : "absolute", cursor: "pointer"}}>
                      delete
                      </span>
                  </ListItem>
                ))
              }
              </List>
              </div>
              <GridContainer>

                <GridItem xs={12} sm={12} md={10}>
                  <CustomInput
                    labelText="Symbol Name"
                    id="symbolname"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      value: newSymbol,
                      onChange: (e) => setNewSymbol(e.target.value.toUpperCase())
                  }}
                  />
                </GridItem>
                {/* <GridItem xs={12} sm={12} md={2}>
                  <CustomInput
                    labelText="volume"
                    id="volume"
                    type="number"
                    formControlProps={{
                      fullWidth: true
                    }}
                  //   inputProps={{
                  //     value: volume,
                  //     onChange: (e) => setVolume(e.target.value)
                  // }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={2}>
                  <CustomInput
                    labelText="high"
                    id="high"
                    formControlProps={{
                      fullWidth: true
                    }}
                    type="number"
                  //   inputProps={{
                  //     value: high,
                  //     onChange: (e) => setHigh(e.target.value)
                  // }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={2}>
                  <CustomInput
                    labelText="low"
                    id="low"
                    formControlProps={{
                      fullWidth: true
                    }}
                    type="number"
                  //   inputProps={{
                  //     value: low,
                  //     onChange: (e) => setLow(e.target.value)
                  // }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={2}>
                  <CustomInput
                    labelText="open"
                    id="open"
                    formControlProps={{
                      fullWidth: true
                    }}
                    type="number"
                  //   inputProps={{
                  //     value: open,
                  //     onChange: (e) => setOpen(e.target.value)
                  // }}
                  />
                </GridItem> */}
                
              </GridContainer>
              <Button color="primary" style={{ float: "right"}} onClick={()=>addSymbol()}>Add Symbol</Button>
          </GridItem>
          <GridItem xs={12} sm={12} md={9}>
            <div>
              <select value={selecVal}  onChange={(e)=>setPeriodData(symbolName, e)} className="selecting-period">
                <option value="0">minute</option>
                <option value="1">hourly</option>
                <option value="2">daily</option>
                <option value="3">weekly</option>
                <option value="4">monthly</option>
              </select>
            </div>
            <div style={{marginTop : "100px"}}>
              {dataPoints1 && <TypeChooser>
                {type => <Chart type={type} data={dataPoints1} />}
              </TypeChooser>}
            </div>
          </GridItem>
        </GridContainer>
        

      </CardBody>
    </Card>

    </div>
  );
}
