import React, { useState, useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import { ToastContainer, toast } from 'react-toastify';

import avatar from "assets/img/faces/marc.jpg";

import { getUser, updateUser } from "../User/user_api";

const styles = {
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

export default function UserProfile() {
  const [userId, setUserid] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  useEffect(() => {
    const username = localStorage.getItem("username");
    console.log(username);
    getUser(username).then(res => {
      setUserid(res.data.id);
      setUsername(res.data.username);
      setEmail(res.data.email);
      setFirstname(res.data.first_name);
      setLastname(res.data.last_name);
    })
    .catch(err => {
    });

  }, []);

  const onSubmit = () => {
    if((passwordConfirm != password) || (password.length < 8)){
      toast("Input correct password and over 8 characters");
    }
    else if((username == '')||(email == '') || (firstname == '') || (lastname == '')){
      toast("Fill the inputs!")
    }
    else{
      updateUser(userId, username, email, firstname, lastname, password);
      const username = localStorage.getItem("username");
      getUser(username).then(res => {
        setUserid(res.data.id);
        setUsername(res.data.username);
        setEmail(res.data.email);
        setFirstname(res.data.first_name);
        setLastname(res.data.last_name);
      })
      .catch(err => {
      }); 
    }
    
  };


  const classes = useStyles();
  return (
    
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Edit Profile</h4>
              <p className={classes.cardCategoryWhite}>Complete your profile</p>
            </CardHeader>
            <CardBody>
              <GridContainer>

                <GridItem xs={12} sm={12} md={3}>
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
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Email address"
                    id="email-address"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      value: email,
                      onChange: (e) => setEmail(e.target.value)
                  }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="First Name"
                    id="first-name"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      value: firstname,
                      onChange: (e) => setFirstname(e.target.value)
                  }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Last Name"
                    id="last-name"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      value: lastname,
                      onChange: (e) => setLastname(e.target.value)
                  }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={4}>
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
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Password Confirm"
                    id="passwordConfirm"
                    type="password"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      value: passwordConfirm,
                      onChange: (e) => setPasswordConfirm(e.target.value)
                  }}
                  />
                </GridItem>

              </GridContainer>
              {/* <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <InputLabel style={{ color: "#AAAAAA" }}>About me</InputLabel>
                  <CustomInput
                    labelText="Lamborghini Mercy, Your chick she so thirsty, I'm in that two seat Lambo."
                    id="about-me"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      multiline: true,
                      rows: 5
                    }}
                  />
                </GridItem>
              </GridContainer> */}
            </CardBody>
            <CardFooter>
              <Button color="primary" onClick={()=>onSubmit()}>Update Profile</Button>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card profile>
            <CardAvatar profile>
              <a href="#pablo" onClick={e => e.preventDefault()}>
                <img src={avatar} alt="..." />
              </a>
            </CardAvatar>
            <CardBody profile>
              <h6 className={classes.cardCategory}>CEO / CO-FOUNDER</h6>
              <h4 className={classes.cardTitle}>Alec Thompson</h4>
              <p className={classes.description}>
                Don{"'"}t be scared of the truth because we need to restart the
                human foundation in truth And I love you like Kanye loves Kanye
                I love Rick Owens’ bed design but the back is...
              </p>
              <Button color="primary" round>
                Follow
              </Button>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
