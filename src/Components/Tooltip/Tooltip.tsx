import React from "react";
import { createStyles, makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(
  () =>
    createStyles({
      tooltip: {
        position: "relative",
        display: "inline-block",
        borderBottom: "1px dotted black",
        "&:hover": {
          visibility: "visible",
        },
      },
      tooltipText: {
        visibility: "hidden",
        width: 120,
        backgroundColor: "black",
        color: "#fff",
        textAlign: "center",
        borderRadius: 6,
        padding: "5px 0",
        position: "absolute",
        zIndex: 1,
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
  children: JSX.Element;
  /**
   * Tooltip title. Zero-length titles string are never displayed.
   */
  title: string;
}

const Tooltip = ({ title, children }: TooltipProps): React.ReactElement => {
  const classes = useStyles();
  return (
    <div className={classes.tooltip}>
      {children}
      <span className={classes.tooltipText}>{title}</span>
    </div>
  );
};

export default Tooltip;
