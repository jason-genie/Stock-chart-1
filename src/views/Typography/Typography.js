import React, { useState, useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Quote from "components/Typography/Quote.js";
import Muted from "components/Typography/Muted.js";
import Primary from "components/Typography/Primary.js";
import Info from "components/Typography/Info.js";
import Success from "components/Typography/Success.js";
import Warning from "components/Typography/Warning.js";
import Danger from "components/Typography/Danger.js";
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
import { func } from "prop-types";
import { addNewSymbol, updateSymbol } from "./action";
 
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
  const [symbolID, setSymbolID] = useState('');
  const [quantity, setQuantity] = useState('');
  const [entry, setEntry] = useState('');
  const [newPortfolio, setNewPortfolio] = useState('');
  const [portfolios, setPortfolios] = useState([]);

  const classes = useStyles();
  useEffect(() => {
    getData().then(data => {
      // debugger;
      setDP1(data);
		})
  }, []);

  function rawHandle(){
    console.log("table raw click~~");
  }

  function newClick(){
    if(symbol == '' || quantity == '' || entry == ''){
      toast("Fill in the all inputs!");
    }
    else{
      addNewSymbol(symbol, quantity, entry);
    }
  }

  function updateClick(){
    if(symbol == '' || quantity == '' || entry == ''){
      toast("Fill in the all inputs!");
    }
    else{
      updateSymbol(symbolID, symbol, quantity, entry);
    }
  }

  function addPortfolio(){
    if(newPortfolio == ''){
      toast("Fill in the input!");
    }
    else{
      console.log(newPortfolio);
    }
  }

  function delSymbol(){
    console.log("delete");
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
                          labelText="Portfoliio"
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

                      <select className="selecting-period" style={{marginTop : '9px'}}>
                        {
                          portfolios.map((portfolio) => {
                            return(
                            <><option value="0">minute</option>
                            <option value="1">hourly</option>
                            <option value="2">daily</option>
                            <option value="3">weekly</option>
                            <option value="4">monthly</option></>
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
                        <TableRow onClick={()=>rawHandle()}>
                          <TableCell>Symbol</TableCell>
                          <TableCell>Quantity</TableCell>
                          <TableCell>Entry</TableCell>
                          <TableCell>Price</TableCell>
                          <TableCell>P/L</TableCell>
                          <TableCell>P/L(%)</TableCell>
                          <TableCell><span onClick={()=>delSymbol()} class="material-icons" style={{cursor : "pointer"}}>delete</span></TableCell>
                        </TableRow>
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
                          onChange: (e) => setSymbol(e.target.value)
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

                <GridItem xs={12} sm={12} md={6}>
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
