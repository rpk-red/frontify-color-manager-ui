import React, { useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { Link, useRouteMatch } from "react-router-dom";

const useStyles = makeStyles(
  {
    cardContainer: {
      cursor: "pointer",
      boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
      transition: "0.3s",
      minWidth: 100,
      minHeight: 100,
      borderRadius: 5,
      backgroundColor: ({ backgroundColor }: CardStyleProps) => backgroundColor,
      "&:hover": {
        boxShadow: "0 16px 32px 0 rgba(0,0,0,0.2)",
      },
    },
    cardLink: {
      textDecoration: "none",
    },
  },
  {
    name: "CmCard",
  }
);

export declare interface CardStyleProps {
  backgroundColor: string;
}

export interface ColorCardProps {
  /**
   * Card Identifier
   */
  id: number;
  /**
   * User readable name representation of color HEX code.
   * @example azureRadiance for #0080ff HEX code
   */
  name: string;
  /**
   * 6 - character Color HEX code.
   * @example  #0080ff
   */
  hexCode: ColorHEX;
  /**
   * Callback fired when the card is clicked.
   */
  onClick: (id: number) => void;
}

const ColorCard = ({
  onClick,
  hexCode,
  name,
  id,
}: ColorCardProps): React.ReactElement => {
  const classes = useStyles({ backgroundColor: hexCode });
  const { url } = useRouteMatch();
  const [isDeletable, setIsDeletable] = useState<boolean>(false);

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    e.preventDefault();
  };

  return (
    <Link
      to={`${url}/color/${id}`}
      className={classes.cardLink}
      onClick={() => onClick(id)}
      onMouseEnter={() => setIsDeletable(true)}
      onMouseLeave={() => setIsDeletable(false)}
    >
      <div className={classes.cardContainer} title={name} />
      <span>HEX: {hexCode}</span>&nbsp;&nbsp;
      {isDeletable && (
        <button onClick={handleDelete} type="button">
          Delete
        </button>
      )}
    </Link>
  );
};

export default ColorCard;
