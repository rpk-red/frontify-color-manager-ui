import React, { useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { Link, useRouteMatch } from "react-router-dom";
import useFetch, { FetchMethodEnum } from "Hooks/useFetch";

import { Button } from "Components";
import { DELETE_COLOR } from "Constants";

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
   * Callback fired after delete button is clicked
   */
  afterDelete?: () => void;
}

const ColorCard = ({
  id,
  name,
  hexCode,
  afterDelete,
}: ColorCardProps): React.ReactElement => {
  const classes = useStyles({ backgroundColor: hexCode });
  const { url } = useRouteMatch();
  const [isDeletable, setIsDeletable] = useState<boolean>(false);

  const { executeFetch } = useFetch<Color>(null, {
    skip: true,
  });

  const formatUrl = () => {
    return DELETE_COLOR.replace(":colorId", id.toString());
  };

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    e.preventDefault();
    const deleteUrl = formatUrl();

    executeFetch(deleteUrl, {
      method: FetchMethodEnum.DELETE,
      skip: false,
    }).then(() => {
      if (typeof afterDelete === "function") {
        afterDelete();
      }
    });
  };

  return (
    <Link
      to={`${url}/color/${id}`}
      className={classes.cardLink}
      onMouseEnter={() => setIsDeletable(true)}
      onMouseLeave={() => setIsDeletable(false)}
    >
      <div className={classes.cardContainer} title={name} />
      <span>HEX: {hexCode}</span>&nbsp;&nbsp;
      {isDeletable && (
        <Button backgroundColor="#f47f64" onClick={handleDelete} type="button">
          Delete
        </Button>
      )}
    </Link>
  );
};

ColorCard.defaultProps = {
  afterDelete: undefined,
};

export default ColorCard;
