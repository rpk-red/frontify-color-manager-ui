import React from "react";
import { createStyles, makeStyles } from "@material-ui/styles";

import { Tooltip } from "Components";

const useStyles = makeStyles(
  () =>
    createStyles({
      cardContainer: {
        backgroundColor: ({ backgroundColor }: CardStyleProps) =>
          backgroundColor,
        "&:hover": {
          // visibility: "visible",
        },
      },
    }),
  {
    name: "CmCard",
  }
);

export declare interface CardStyleProps {
  backgroundColor: string;
}

export declare type ColorHEX = `#${string}`;

export interface CardProps {
  /**
   * User readable name representation of color HEX code.
   * @example azureRadiance for #0080ff HEX code
   */
  name: ColorHEX;
  /**
   * 6 - character Color HEX code.
   * @example  #0080ff
   */
  hexCode: string;
}

const Card = ({ name, hexCode }: CardProps): React.ReactElement => {
  const classes = useStyles({ backgroundColor: hexCode });
  return (
    <Tooltip title={name}>
      <div className={classes.cardContainer}>
        <span>{hexCode}</span>
      </div>
    </Tooltip>
  );
};

export default Card;
