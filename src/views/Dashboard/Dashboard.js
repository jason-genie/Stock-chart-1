import React, { useState, useEffect } from "react";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Store from "@material-ui/icons/Store";
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Accessibility from "@material-ui/icons/Accessibility";
import BugReport from "@material-ui/icons/BugReport";
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Tasks from "components/Tasks/Tasks.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import Danger from "components/Typography/Danger.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Search from "@material-ui/icons/Search";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { ToastContainer, toast } from 'react-toastify';

import ReactHighcharts from 'react-highcharts';

import Chart from './chart';
import { getData } from "./utils"
import { fetchGainers, fetchCompany, fetchChart, fetchSymbol, fetchPrice } from "./ganinerAction";

import { TypeChooser } from "react-stockcharts/lib/helper";


import { bugs, website, server } from "variables/general.js";

import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart
} from "variables/charts.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import loadingSpinner from "assets/img/loading-spinner.gif";



const useStyles = makeStyles(styles);

const stockScreener = require('@stonksjs/stock-screener');
const filters = stockScreener.filters;


export default function Dashboard() {
  
  const classes = useStyles();
  const [dataPoints1, setDP1] = useState();
  const [isLoading, setLoading] = useState(true);
  const [symbolName, setSymbolName] = useState('A');
  const [symbols, setSymbols] = useState([]);
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

  useEffect(() => {

    setLoading(true);

    fetchSymbol().then(data => {
      // console.log("data:: ", data);
      setSymbols(data.map(s=> s.symbol));
      setLoading(false);
    });

    fetchPrice(symbolName, periodType, period, frequencyType, frequency).then(price => {
      setDP1(price.candles);
      setLoading(false);
    });

  }, []);


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

  function setPeriodData(symbol, e){
    setLoading(true);
    setSelectVal(e.target.value);
    const perType = initaial[e.target.value].perType;
    const per = initaial[e.target.value].period;
    const freType = initaial[e.target.value].freType;
    const fre = initaial[e.target.value].frequency;

    fetchPrice(symbol, perType, per, freType, fre).then(price => {
      if(price.candles.length == 0){
        toast("No data about this period!")
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
                    // inputProps: {
                    //   "aria-label": "Search"
                    // },
                  // value: symbolName,
                  // onChange: (e) => setSymbolName(e.target.value)
                }}
              />
              <Button onClick={()=>symbolSearch()} color="white" aria-label="edit" justIcon round>
                <Search />
              </Button>
              <List id="symbolMenu" className="search-symbol-list">
              {
                symbols.map(symbol => (
                  <ListItem onClick={()=> symbolItem(symbol)}><a href="#">{symbol}</a></ListItem>
                ))
              }
              </List>
              </div>
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
