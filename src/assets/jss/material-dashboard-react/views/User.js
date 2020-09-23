import {
    successColor,
    whiteColor,
    grayColor,
    hexToRgb
  } from "assets/jss/material-dashboard-react.js";

  const UserStyle = {
    loginWnd: {
        marginTop: "25vh",
        width: "20%", 
        marginLeft: "40%",
        padding : "15px"
    },

    cardTitle: {
        color: grayColor[2],
        marginTop: "0px",
        minHeight: "auto",
        fontWeight: "300",
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        marginBottom: "3px",
        textDecoration: "none",
        "& small": {
        color: grayColor[1],
        fontWeight: "400",
        lineHeight: "1"
        }
    },

    inputTag: {
        height: "calc(2.25rem + 2px)",
        padding: ".275rem .75rem",
        fontSize: "1rem",
        fontWeight: "400",
        lineHeight: "1.5",
        color: "#495057",
        backgroundColor: "#fff",
        backgroundClip: "padding-box",
        border: "1px solid #ced4da",
        borderRadius: ".25rem",
        boxShadow: "inset 0 0 0 transparent",
    }
  }
  export default UserStyle;