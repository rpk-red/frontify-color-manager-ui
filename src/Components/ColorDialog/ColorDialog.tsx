import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";

import { Dialog } from "Components";
import { ADD_COLOR, EMPTY_STRING, UPDATE_COLOR } from "Constants";
import useFetch, { FetchMethodEnum } from "Hooks/useFetch";
import Button from "Components/Button";

const useStyles = makeStyles(
  {
    dialog: {
      borderRadius: "5%",
    },
    formDetails: {
      display: "grid",
      gridTemplateColumns: "[labels] auto [controls] 1fr",
      gridAutoFlow: "row",
      gap: "1rem",
      padding: 10,
    },
    colorHue: {
      border: "1px solid",
      backgroundColor: ({ backgroundColor: color }: ColorDialogStyleProps) =>
        color || "var(--paper)",
    },
    formActions: {
      marginTop: 20,
      display: "flex",
      justifyContent: "space-between",
    },
  },
  { name: "CmColorDialog" }
);

interface ColorDialogStyleProps {
  backgroundColor: NullableString;
}

export interface ColorDialogParams {
  colorId: string;
}

export interface ColorDialogProps {
  /**
   * Initial color object used in edit mode
   * @type Color
   */
  initColor?: Color;
  /**
   * Callback fired when dialog starts closing
   */
  onExiting?: () => void;
}

const hexRegex = "^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$";

const ColorDialog = ({
  initColor,
  onExiting,
}: ColorDialogProps): React.ReactElement => {
  const [name, setName] = useState<NullableString>(initColor?.name ?? null);
  const [hex, setHex] = useState<NullableString>(initColor?.hexCode ?? null);
  const { goBack } = useHistory();

  const classes = useStyles({ backgroundColor: hex });

  const { executeFetch } = useFetch<Color>(null, {
    skip: true,
  });

  const formatUrl = () => {
    return initColor
      ? UPDATE_COLOR.replace(":colorId", initColor.id.toString())
      : ADD_COLOR;
  };

  const handleHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { value }: { value: NullableString } = e.target;
    value = value === EMPTY_STRING ? null : value;
    setHex(value);
  };
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { value }: { value: NullableString } = e.target;
    value = value === EMPTY_STRING ? null : value;
    setName(value);
  };

  const handleCloseDialog = () => {
    if (typeof onExiting === "function") {
      onExiting();
    }
    goBack();
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const submitUrl = formatUrl();

    executeFetch(submitUrl, {
      method: initColor ? FetchMethodEnum.PUT : FetchMethodEnum.POST,
      body: { ...initColor, name, hexCode: hex },
      skip: false,
    }).then(() => handleCloseDialog());
  };

  return (
    <Dialog onBackdropClick={handleCloseDialog} open className={classes.dialog}>
      <form onSubmit={handleSubmit}>
        <div className={classes.formDetails}>
          <label htmlFor="cname">Color name* :</label>
          <input
            required
            type="text"
            id="cname"
            name="cname"
            value={name ?? EMPTY_STRING}
            onChange={handleNameChange}
          />
          <label htmlFor="chex">Color Hex* :</label>
          <input
            required
            type="text"
            id="chex"
            name="chex"
            value={hex ?? EMPTY_STRING}
            maxLength={7}
            pattern={hexRegex}
            onChange={handleHexChange}
            title="hex pattern only, please"
          />
          <label htmlFor="colorHue">Color Hue :</label>
          <div id="colorHue" className={classes.colorHue} />
        </div>
        <div className={classes.formActions}>
          <Button
            type="button"
            backgroundColor="#0080ff"
            onClick={handleCloseDialog}
          >
            Cancel
          </Button>
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Dialog>
  );
};

ColorDialog.defaultProps = {
  initColor: undefined,
  onExiting: undefined,
};

export default ColorDialog;
