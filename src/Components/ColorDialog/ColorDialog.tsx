import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";

import { Dialog } from "Components";
import { EMPTY_STRING } from "Constants";

const useStyles = makeStyles(
  {
    dialog: {
      borderRadius: "5%",
      backgroundColor: ({ backgroundColor: color }: ColorDialogStyleProps) =>
        color || "var(--paper)",
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
   * Color object used in edit mode
   * @type Color
   */
  color?: Color;
  /**
   * Callback fired when dialog starts closing
   */
  onExiting?: () => void;
}

const hexRegex = "^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$";

const ColorDialog = ({
  color,
  onExiting,
}: ColorDialogProps): React.ReactElement => {
  const [name, setName] = useState<NullableString>(color?.name ?? null);
  const [hex, setHex] = useState<NullableString>(color?.hexCode ?? null);
  const { goBack } = useHistory();

  const classes = useStyles({ backgroundColor: hex });

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

  return (
    <Dialog onBackdropClick={goBack} open className={classes.dialog}>
      <form>
        <label htmlFor="cname">Color name* :</label> <br />
        <input
          required
          type="text"
          id="cname"
          name="cname"
          value={name ?? EMPTY_STRING}
          onChange={handleNameChange}
        />
        <br />
        <label htmlFor="chex">Color Hex* :</label> <br />
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
        <br />
        <br />
        <button type="button" onClick={handleCloseDialog}>
          Cancel
        </button>
        <button type="submit">Submit </button>
      </form>
    </Dialog>
  );
};

export default ColorDialog;
