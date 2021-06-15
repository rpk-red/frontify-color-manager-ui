import React, { useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { Route, Link, useRouteMatch } from "react-router-dom";

import { ColorCard, ColorDialog } from "Components";
import { PATH_DIALOG_COLOR_CARD } from "Constants";

const useStyles = makeStyles(
  {
    grid: {
      margin: 100,
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
      gap: "1rem",
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

const mockColorList: Array<Color> = [
  { id: 1, name: "azureRadiance", hexCode: "#0080ff" },
  { id: 2, name: "crusta", hexCode: "#f47f64" },
];

const ColorDashboard = (): React.ReactElement => {
  const classes = useStyles();
  const { url } = useRouteMatch();
  const [currentColor, setCurrentColor] = useState<NullableNumer>(null);

  const handleCardClick = (id: number) => setCurrentColor(id);

  const resetCurrentColor = () => setCurrentColor(null);

  return (
    <>
      <div className={classes.grid}>
        {mockColorList.map((colorEl) => (
          <ColorCard key={colorEl.id} {...colorEl} onClick={handleCardClick} />
        ))}
      </div>
      <Link to={`${url}/color`} className={classes.link}>
        <button type="button" className={classes.actionBttn}>
          +
        </button>
      </Link>
      <Route
        path={`${url}/${PATH_DIALOG_COLOR_CARD}`}
        component={() => (
          <ColorDialog
            onExiting={resetCurrentColor}
            color={mockColorList.find((e) => e.id === currentColor)}
          />
        )}
      />
    </>
  );
};

export default ColorDashboard;
