import React, { useState, useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import GridItem from "components/Grid/GridItem.js";

import { TypeChooser } from "react-stockcharts/lib/helper";

import Chart from '../Dashboard/chart';
import { getData } from "../Dashboard/utils"
import GridContainer from "components/Grid/GridContainer";
// import Table from "components/Table/Table.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import { ToastContainer, toast } from 'react-toastify';

import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import { confirmAlert } from 'react-confirm-alert';
import { func } from "prop-types";
import { fetchPrice, addNewSymbolAction, updateSymbolAction, addPortfolioAction, getPortfolioList, getPortfolioSymbolList, getSymbolDataAction, deletePortfolioSymbol, deletePortfolio } from "./action";
import { forEachChild } from "typescript";
 
const styles = {
  typo: {
    paddingLeft: "25%",
    marginBottom: "40px",
    position: "relative"
  },
  note: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    bottom: "10px",
    color: "#c0c1c2",
    display: "block",
    fontWeight: "400",
    fontSize: "13px",
    lineHeight: "13px",
    left: "0",
    marginLeft: "20px",
    position: "absolute",
    width: "260px"
  },
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};


const useStyles = makeStyles(styles);

export default function TypographyPage() {

  const [dataPoints1, setDP1] = useState();
  const [isLoaded, setLoad] = useState(false);
  const [symbol, setSymbol] = useState('');
  const [symbolID, setSymbolID] = useState();
  const [quantity, setQuantity] = useState('');
  const [entry, setEntry] = useState('');
  const [newPortfolio, setNewPortfolio] = useState('');
  const [portfolios, setPortfolios] = useState([]);
  const [selPortfolio, setSelPortfolio] = useState('');
  const [symbolList, setSymbolList] = useState([]);
  const [symbolData, setSymbolData] = useState([]);

  const classes = useStyles();
  useEffect(() => {
 
    getPortfolios();
    
  }, []);

  function getPortfolios(){
    getPortfolioList().then(data => data.json()).then(res => {
      setPortfolios(res);
      setSelPortfolio(res[0].portfolio);
      getSymbolData(res[0].portfolio);
  
    });
  }

  function getSymbolData(portfolio_name){
    getPortfolioSymbolList(portfolio_name).then(data => data.json()).then(res => {
      setSymbolList(res);
      if(res.length > 0){
        fetchPrice(res[0].symbol).then(price => {
          setDP1(price.candles);
        });
      }
     
      let symData = [];
      res.map((d) => {
        getSymbolDataAction(d.symbol).then(d => d.json()).then((data) => {
          Promise.resolve(data).then((value) => {
            symData.push(value);  
            if(res.length == symData.length){
              setSymbolData(symData);
            }        
          });
        });
      })
    });
  }

  function rawHandle(symbol_data){
    console.log("table raw click~~");
    setSymbolID(symbol_data.id);
    setSymbol(symbol_data.symbol);
    setQuantity(symbol_data.quantity);
    setEntry(symbol_data.entry);
    fetchPrice(symbol_data.symbol).then(price => {
      setDP1(price.candles);
    });
  }

  function newClick(){
    if(symbol == '' || quantity == '' || entry == ''){
      toast("Fill in the all inputs!");
    }
    else{
      addNewSymbolAction(selPortfolio, symbol, quantity, entry).then(res => {
        toast("Successful!");
        getSymbolData(selPortfolio);
      })
      .catch(err => {
          toast("Save error!");
      });
    }
  }

  function updateClick(){
    if(symbol == '' || quantity == '' || entry == ''){
      toast("Fill in the all inputs!");
    }
    else{
      updateSymbolAction(symbolID, symbol, quantity, entry).then(res => {
        toast("Successful!");
        getSymbolData(selPortfolio);
    
      })
      .catch(err => {
          toast("Save error!");
      });;
    }
  }

  function addPortfolio(){
    if(newPortfolio == ''){
      toast("Fill in the input!");
    }
    else{
      console.log(newPortfolio);
      addPortfolioAction(newPortfolio).then(res => {
        toast("Successful!");
        getPortfolioList().then(data => data.json()).then(res => {
          setPortfolios(res);
        });
      })
      .catch(err => {
          toast("Save error!");
      });;
    }
  }

  function delSymbol(symbol_id){
    console.log("delete");

    confirmAlert({
      title: 'Confirm to submit',
      message: 'Are you sure to do this.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            deletePortfolioSymbol(symbol_id).then(res => {
              toast("Successful!");
              getSymbolData(selPortfolio);
            })
            .catch(err => {
                toast("delete error!");
            });
          }
        },
        {
          label: 'No',
        }
      ]
    });
  }

  function selectSelPortfolio(sel_portfolio){
    setSelPortfolio(sel_portfolio);
    getSymbolData(sel_portfolio);
  }

  function delPortfolio(){
    confirmAlert({
      title: 'Confirm to submit',
      message: 'Are you sure to do this.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            deletePortfolio(selPortfolio).then(res => {
              toast("Successful!");
              getPortfolios();
            })
            .catch(err => {
                toast("delete error!");
            });
          }
        },
        {
          label: 'No',
        }
      ]
    });
  }
  
  return (
    <Card>
      <CardHeader color="primary">
        <h4 className={classes.cardTitleWhite}>Portfoliio</h4>
      </CardHeader>
      <CardBody>
          <Card>
            <CardBody>
              <GridContainer>
                
                <GridItem xs={12} sm={12} md={6} style={{marginTop : '-50px'}}>
                      <CustomInput
                          labelText="Portfoliio name"
                          id="portfolio"
                          formControlProps={{
                            fullWidth: true
                          }}
                          inputProps={{
                            value: newPortfolio,
                            onChange: (e) => setNewPortfolio(e.target.value)
                        }}
                        />
                        <Button color="primary" onClick={()=>addPortfolio()}>Add</Button>
                        <Button color="warning" onClick={()=>delPortfolio()}>Delete</Button>

                      <select value={selPortfolio} className="selecting-period" onChange={(e)=>selectSelPortfolio(e.target.value)} style={{marginTop : '9px'}}>
                        {
                          portfolios.map((portfolio) => {
                            return(
                            <><option value={portfolio.portfolio}>{portfolio.portfolio} 
                            </option></>
                            );
                          })
                        }
                        
                      </select>

                  <Table className="portfolio-table">
                    <TableHead>
                        <TableRow>
                          <TableCell>Symbol</TableCell>
                          <TableCell>Quantity</TableCell>
                          <TableCell>Entry</TableCell>
                          <TableCell>Price</TableCell>
                          <TableCell>P/L</TableCell>
                          <TableCell>P/L %</TableCell>
                          <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                          symbolList && symbolData.length > 0 && symbolList.map((sym, index) => {
                            // let data = symbolData[index];
                            var price = 0;
                            // if ( data && data[Object.keys(data)[0]]){
                            //   price = data[Object.keys(data)[0]].lastPrice;
                            //   console.log(Object.keys(data)[0]);
                            // }

                            symbolData.forEach((data) => {
                              if(Object.keys(data)[0] == sym.symbol){
                                price = data[Object.keys(data)[0]].lastPrice;
                              }
                            })
                            var pl = (price-sym.entry)*sym.quantity;
                            pl = pl.toFixed(2); 
                            var plper = (price-sym.entry)/sym.entry*100;
                            plper = plper.toFixed(2);
                            // console.log(data, index);
                            return(
                              <TableRow onClick={()=>rawHandle(sym)}>
                              <TableCell>{sym.symbol}</TableCell>
                              <TableCell>{sym.quantity}</TableCell>
                              <TableCell>{sym.entry}</TableCell>
                              <TableCell>{price}</TableCell>
                              <TableCell>{pl}</TableCell>
                              <TableCell>{plper}%</TableCell>
                              <TableCell><span onClick={()=>delSymbol(sym.id)} class="material-icons" style={{cursor : "pointer"}}>delete</span></TableCell>
                            </TableRow>
                            );
                          })
                        }
                        
                    </TableBody>
                  </Table>
                  
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={3}>
                      <CustomInput
                        labelText="Symbol"
                        id="symbolname"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          value: symbol,
                          onChange: (e) => setSymbol(e.target.value.toUpperCase())
                      }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={1}></GridItem>
                    <GridItem xs={12} sm={12} md={3}>
                      <CustomInput
                          labelText="Quntity"
                          id="quantity"
                          type="number"
                          formControlProps={{
                            fullWidth: true
                          }}
                          inputProps={{
                            value: quantity,
                            onChange: (e) => setQuantity(e.target.value)
                        }}
                        />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={1}></GridItem>
                    <GridItem xs={12} sm={12} md={3}>
                      <CustomInput
                          labelText="Entry"
                          id="entry"
                          type="number"
                          formControlProps={{
                            fullWidth: true
                          }}
                          inputProps={{
                            value: entry,
                            onChange: (e) => setEntry(e.target.value)
                        }}
                        />
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={3}>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={1}></GridItem>
                    <GridItem xs={12} sm={12} md={3}>
                      <Button color="primary" onClick={()=>newClick()}>Add New</Button>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={1}></GridItem>
                    <GridItem xs={12} sm={12} md={3}>
                      <Button color="primary" onClick={()=>updateClick()}>Update </Button>
                    </GridItem>
                  </GridContainer>
                </GridItem>

                <GridItem xs={12} sm={12} md={6} style={{marginTop : "70px"}}>
                  {dataPoints1 && <TypeChooser>
                    {type => <Chart type={type} data={dataPoints1} />}
                  </TypeChooser>}
                </GridItem>
              </GridContainer>
            </CardBody>

          </Card>
        
      </CardBody>
    </Card>
  );
}
