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
import Table from "components/Table/Table.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";

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

  useEffect(() => {
    getData().then(data => {
      // debugger;
      setDP1(data);
		})
  }, []);

  const classes = useStyles();
  return (
    <Card>
      <CardHeader color="primary">
        <h4 className={classes.cardTitleWhite}>Material Dashboard Heading</h4>
        <p className={classes.cardCategoryWhite}>
          Created using Roboto Font Family
        </p>
      </CardHeader>
      <CardBody>
          <Card>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={5}>
                  <Table
                    tableHeaderColor="primary"
                    tableHead={[
                      "Symbol",
                      "Quantity",
                      "Entry",
                      "Price",
                      "P/L",
                      "P/L %",]}
                      
                    tableData={[
                      ["Niger", "Oud-Turnhout", "$36,738", "Niger", "Niger", "Niger"]
                    ]}
                  />
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={3}>
                      <CustomInput
                        labelText="Symbol"
                        id="symbolname"
                        formControlProps={{
                          fullWidth: true
                        }}
                      //   inputProps={{
                      //     value: newSymbol,
                      //     onChange: (e) => setNewSymbol(e.target.value)
                      // }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={1}></GridItem>
                    <GridItem xs={12} sm={12} md={3}>
                      <CustomInput
                          labelText="Quntity"
                          id="quantity"
                          formControlProps={{
                            fullWidth: true
                          }}
                        //   inputProps={{
                        //     value: newSymbol,
                        //     onChange: (e) => setNewSymbol(e.target.value)
                        // }}
                        />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={1}></GridItem>
                    <GridItem xs={12} sm={12} md={3}>
                      <CustomInput
                          labelText="Entry"
                          id="entry"
                          formControlProps={{
                            fullWidth: true
                          }}
                        //   inputProps={{
                        //     value: newSymbol,
                        //     onChange: (e) => setNewSymbol(e.target.value)
                        // }}
                        />
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={3}>
                      <Button color="primary">Add New</Button>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={1}></GridItem>
                    <GridItem xs={12} sm={12} md={3}>
                      <Button color="primary">Delete</Button>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={1}></GridItem>
                    <GridItem xs={12} sm={12} md={3}>
                      <Button color="primary">Update </Button>
                    </GridItem>
                  </GridContainer>
                </GridItem>

                <GridItem xs={12} sm={12} md={7}>
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
