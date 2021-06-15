import React from "react";

import clsx from "clsx";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";

import { PATH_PAGE_COLOR_DASHBOARD } from "Constants";

const useStyles = makeStyles(
  {
    body: {
      background: "#D3DEEA",
    },

    top: {
      marginTop: 30,
    },

    container: {
      margin: "0 auto",
      position: "relative",
      width: 250,
      height: 250,
      marginTop: -40,
    },

    ghost: {
      width: "50%",
      height: "53%",
      left: "25%",
      top: "10%",
      position: "absolute",
      borderRadius: "50% 50% 0 0",
      background: "#EDEDED",
      border: "1px solid #BFC0C0",
      borderBottom: "none",
      animation: "$float 2s ease-out infinite",
    },

    ghostCopy: {
      width: "50%",
      height: "53%",
      left: "25%",
      top: "10%",
      position: "absolute",
      borderRadius: "50% 50% 0 0",
      background: "#EDEDED",
      border: "1px solid #BFC0C0",
      borderBottom: "none",
      animation: "$float 2s ease-out infinite",
      zIndex: 0,
    },

    face: {
      position: "absolute",
      width: "100%",
      height: "60%",
      top: "20%",
    },
    eyesBase: {
      position: "absolute",
      background: "#585959",
      width: 13,
      height: 13,
      borderRadius: "50%",
      top: "40%",
    },

    eye: {
      left: "25%",
    },

    eyeRight: {
      right: "25%",
    },

    mouth: {
      position: "absolute",
      top: "50%",
      left: "45%",
      width: 10,
      height: 10,
      border: "3px solid",
      borderRadius: "50%",
      borderColor: "transparent #585959 #585959 transparent",
      transform: "rotate(45deg)",
    },

    base: {
      position: "absolute",
      background: "#EDEDED",
      top: "85%",
      width: "25%",
      height: "23%",
      border: "1px solid #BFC0C0",
      zIndex: 0,
    },

    one: {
      borderRadius: "0 0 100% 30%",
      left: -1,
    },

    two: {
      left: "23%",
      borderRadius: "0 0 50% 50%",
    },

    three: {
      left: "50%",
      borderRadius: "0 0 50% 50%",
    },

    four: {
      left: "74.5%",
      borderRadius: "0 0 30% 100%",
    },

    shadow: {
      position: "absolute",
      width: "30%",
      height: "7%",
      background: "#BFC0C0",
      left: "35%",
      top: "80%",
      borderRadius: "50%",
      animation: "$scale 2s infinite",
    },

    "@keyframes scale": {
      "0%": {
        transform: "scale(1)",
      },
      "50%": {
        transform: "scale(1.1)",
      },
      "100%": {
        transform: "scale(1)",
      },
    },

    "@keyframes float": {
      "50%": {
        transform: "translateY(15px)",
      },
    },

    bottom: {
      marginTop: 10,
    },

    h1: {
      fontFamily: "'Abril Fatface', serif",
      color: "#EDEDED",
      textAlign: "center",
      fontSize: "9em",
      margin: 0,
      textShadow: "-1px 0 $gray, 0 1px $gray, 1px 0 $gray, 0 -1px $gray",
    },

    h3: {
      fontFamily: "'Lato', sans-serif",
      fontSize: "2em",
      textTransform: "uppercase",
      textAlign: "center",
      color: "#BFC0C0",
      marginTop: -20,
      fontWeight: 900,
    },

    p: {
      textAlign: "center",
      fontFamily: "'Lato', sans-serif",
      color: "#585959",
      fontSize: ".6em",
      marginTop: -20,
      textTransform: "uppercase",
    },
    buttonContainer: {
      display: "grid",
      placeItems: "center",
    },
  },
  {
    name: "CmError",
  }
);

const Error = (): React.ReactElement => {
  const classes = useStyles();
  const { replace } = useHistory();

  const navigateToHome = () => replace(PATH_PAGE_COLOR_DASHBOARD);

  return (
    <>
      <div className={classes.top}>
        <h1 className={classes.h1}>404</h1>
        <h3 className={classes.h3}>page not found</h3>
      </div>
      <div className={classes.container}>
        <div className={classes.ghostCopy}>
          <div className={clsx(classes.base, classes.one)} />
          <div className={clsx(classes.base, classes.two)} />
          <div className={clsx(classes.base, classes.three)} />
          <div className={clsx(classes.base, classes.four)} />
        </div>
        <div className={classes.ghost}>
          <div className={classes.face}>
            <div className={clsx(classes.eyesBase, classes.eye)} />
            <div className={clsx(classes.eyesBase, classes.eyeRight)} />
            <div className={classes.mouth} />
          </div>
        </div>
        <div className={classes.shadow} />
      </div>
      <div className={classes.bottom}>
        <p className={classes.p}>
          Sorry but the page you are looking for does not exist, have been
          removed, name changed or is temporarily unavailable
        </p>
      </div>
      <div className={classes.buttonContainer}>
        <button type="button" onClick={navigateToHome}>
          Home
        </button>
      </div>
    </>
  );
};

export default Error;
