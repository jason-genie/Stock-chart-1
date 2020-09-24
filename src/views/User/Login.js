import React, { useState, useEffect } from "react";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons

// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Tasks from "components/Tasks/Tasks.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import Danger from "components/Typography/Danger.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Button from "components/CustomButtons/Button.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import { Link, withRouter } from "react-router-dom";
import { authLogin } from "./user_api";

import styles from "assets/jss/material-dashboard-react/views/User.js";

const useStyles = makeStyles(styles);


export default function Login() {
    const classes = useStyles();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const onSubmit = () => {

      authLogin(username, password)    
      
    };
  return (
    <div>

            <Card className={classes.loginWnd} style={{  }}>
                <CardHeader color="primary">
                    Sign in to start your session
                </CardHeader>
                <CustomInput
                    labelText="Username"
                    id="username"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                        value: username,
                        onChange: (e) => setUsername(e.target.value)
                    }}
                  />
                <CustomInput
                    labelText="Password"
                    id="password"
                    type="password"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                        value: password,
                        onChange: (e) => setPassword(e.target.value)
                    }}
                  />
                <CardFooter stats>
                    <Link to="/signup"><Button color="primary">Sign up</Button></Link>
                    <Button color="success" onClick={() => onSubmit()}>Sign in</Button>

                </CardFooter>
            </Card>
   
    </div>
  );
}
