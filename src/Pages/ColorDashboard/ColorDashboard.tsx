import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Route, Link, useRouteMatch } from "react-router-dom";

import { ColorCard, ColorDialog } from "Components";
import { GET_COLOR_ITEMS, PATH_DIALOG_COLOR_CARD } from "Constants";
import useFetch, { FetchMethodEnum } from "Hooks/useFetch";

const useStyles = makeStyles(
  {
    grid: {
      margin: 100,
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
      gap: "1rem",
    },
    emptyGrid: {
      margin: 100,
      display: "grid",
      placeItems: "center",
    },
    emptyParagraph: {
      fontSize: 24,
      color: "#c4cbd6",
    },
    actionBttn: {
      position: "fixed",
      width: 60,
      height: 60,
      bottom: 40,
      right: 40,
      backgroundColor: "#0C9",
      borderRadius: 50,
      textAlign: "center",
      boxShadow: "2px 2px 3px #999",
      transition: "0.3s",
      fontSize: 25,
      border: "none",
      cursor: "pointer",
      display: "block",
      color: "white",
      "&:hover": {
        boxShadow: "4px 4px 6px #999",
        backgroundColor: "#14b88f",
      },
    },
    link: {
      textDecoration: "none",
    },
  },
  {
    name: "CmColorDashboard",
  }
);

const ColorDashboard = (): React.ReactElement => {
  const classes = useStyles();
  const { url } = useRouteMatch();

  const { data, refetch } = useFetch<Color[]>(GET_COLOR_ITEMS, {
    method: FetchMethodEnum.GET,
  });
  const { get: colors } = data ?? {};

  const onExiting = () => {
    refetch();
  };

  return (
    <>
      {colors ? (
        <div className={classes.grid}>
          {colors.map((colorEl) => (
            <ColorCard key={colorEl.id} {...colorEl} afterDelete={refetch} />
          ))}
        </div>
      ) : (
        <div className={classes.emptyGrid}>
          <p className={classes.emptyParagraph}>
            No elements to display, please add some.
          </p>
        </div>
      )}
      <Link to={`${url}/color`} className={classes.link}>
        <button type="button" className={classes.actionBttn}>
          +
        </button>
      </Link>
      <Route
        path={`${url}/${PATH_DIALOG_COLOR_CARD}`}
        component={() => <ColorDialog onExiting={onExiting} />}
      />
    </>
  );
};

export default ColorDashboard;
