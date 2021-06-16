import React from "react";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(
  {
    button: {
      cursor: "pointer",
      position: "relative",
      display: "block",
      padding: 0,
      overflow: "hidden",
      borderWidth: 0,
      outline: "none",
      borderRadius: 2,
      boxShadow: "0 1px 4px rgba(0, 0, 0, .6)",
      backgroundColor: ({ backgroundColor }: ButtonStyleProps) =>
        backgroundColor,
      color: ({ color }: ButtonStyleProps) => color,
      transition: "background-color .3s",
      "&:hover": {
        filter: "brightness(0.9)",
      },
    },
    span: {
      display: "block",
      padding: ({ size }: ButtonStyleProps) =>
        size === "small" ? "6px 12px" : "12px 24px",
    },
  },
  { name: "CmButton" }
);

declare type Size = "small" | "medium";

interface ButtonStyleProps {
  /**
   * Css property - Text color
   * @default "white"
   */
  color?: string;
  /**
   * Css property - Background color
   * @default "#2ecc71"
   */
  backgroundColor?: string;
  /**
   * Size of span element
   * @type Size
   * @default "small"
   */
  size?: Size;
}

export interface ButtonProps
  extends ButtonStyleProps,
    React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = ({
  children,
  color,
  backgroundColor,
  size,
  ...htmlBttnProps
}: ButtonProps): React.ReactElement => {
  const classes = useStyles({ color, backgroundColor, size });
  return (
    // eslint-disable-next-line react/button-has-type
    <button className={classes.button} {...htmlBttnProps}>
      <span className={classes.span}>{children}</span>
    </button>
  );
};

Button.defaultProps = {
  size: "small",
  color: "white",
  backgroundColor: "#2ecc71",
};

export default Button;
