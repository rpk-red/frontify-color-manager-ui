import React from "react";
import { createStyles, makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(
  () =>
    createStyles({
      tooltip: {
        position: "relative",
        display: "inline-block",
        borderBottom: "1px dotted black",
      },
      tooltipText: {
        top: "100%",
        left: "50%",
        marginLeft: "-60px",
        visibility: "hidden",
        backgroundColor: "black",
        color: "#fff",
        textAlign: "center",
        borderRadius: 6,
        padding: "5px 10px",
        position: "absolute",
        zIndex: 1,
        opacity: 0,
        transition: "opacity 0.5s",
        "&:hover": {
          visibility: "visible",
          opacity: 1,
        },
      },
    }),
  {
    name: "CmTooltip",
  }
);

export interface TooltipProps {
  /**
   * Tooltip reference element.
   */
  children: JSX.Element | JSX.Element[];
  /**
   * Tooltip title. Zero-length titles string are never displayed.
   */
  title: string;
}

const Tooltip = ({ title, children }: TooltipProps): React.ReactElement => {
  const classes = useStyles();
  return (
    <div className={classes.tooltip} title={title}>
      {children}
      <span className={classes.tooltipText}>{title}</span>
    </div>
  );
};

export default Tooltip;
