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
import { symbol } from "prop-types";

import { tsvParse, csvParse } from  "d3-dsv";
import { timeParse } from "d3-time-format";
import { getStockData } from "./screener_action";

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

const stockScreener = require('@stonksjs/stock-screener');
const filters = stockScreener.filters;




// stockScreener(filters[0]).then((response) => {debugger;});
// const symbols = filters.map(async (filter) => await stockScreener(filter));
// console.log(symbols);

export default function TableList() {

 
  const classes = useStyles();
  const [symbols, setSymbols] = useState([]);
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    Promise.all(filters.map(filter => stockScreener(filter)))
    .then(symbols => {
      // setSymbols(symbols);
      const data = symbols.reduce((cSymbols, symbol) => {
        return cSymbols.concat(symbol)
        // return cSymbols
      });
      setSymbols(data);
    });

    getStockData().then(data => {
      // debugger;
      setStocks(data);
		})

  }, []);

  console.log(stocks);

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
                   formControlProps={{
                     className: classes.margin + " " + classes.search
                   }}
                   inputProps={{
                     placeholder: "Search",
                     inputProps: {
                       "aria-label": "Search"
                     }
                   }}
                 />
                 <Button color="white" aria-label="edit" justIcon round>
                   <Search />
                </Button>
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
                "1W CHG",
                "1M CHG",
                "1Y CHG",]}
                
              tableData={[]
                // stocks.map(stock => [stock.symbol, stock.datetime, stock.open, stock.high, stock.cashFlowCoverageRatio, stock.low])
                // symbols.map(symbol => [symbol, "Niger", "Oud-Turnhout", "$36,738", "Niger", "Niger", "Niger", "Niger", "Niger", "Niger", "Niger"])
              }
            />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
