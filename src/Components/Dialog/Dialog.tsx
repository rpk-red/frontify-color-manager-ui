import React from "react";
import clsx from "clsx";
import ReactDOM from "react-dom";
import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles(
  {
    dialog: {
      border: "none",
      backgroundColor: "var(--paper)",
      boxShadow: "2px 2px 2px rgba(0, 0, 0, 0.2)",
      borderRadius: "2px",
      margin: "48px 0 80px",
      overflow: "hidden",
      position: "relative",
      zIndex: 25,
    },
    windowOverlay: {
      display: "flex",
      alignItems: "flex-start",
      backgroundColor: "rgba(0, 0, 0, 0.64)",
      height: "100%",
      justifyContent: "center",
      left: 0,
      overflowY: "auto",
      position: "fixed",
      top: 0,
      width: "100%",
      zIndex: 20,
    },
  },
  { name: "CmDialog" }
);

export interface DialogProps {
  children: React.ReactNodeArray | React.ReactChild;
  /**
   * If true dialog is visible
   */
  open?: NullableBoolean;
  /**
   * 	Callback fired when the backdrop is clicked.
   */
  onBackdropClick?: (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => void;
  /**
   * 	Dialog styles
   */
  className?: NullableString;
}

const Dialog = ({
  children,
  open = false,
  onBackdropClick,
  className,
}: DialogProps): React.ReactElement => {
  const classes = useStyles();
  const mouseDownTarget = React.useRef(null);
  const handleMouseDown = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    mouseDownTarget.current = event.target as never;
  };
  const handleBackdropClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    // Ignore the events not coming from the "backdrop"
    // We don't want to close the dialog when clicking the dialog content.
    if (event.target !== event.currentTarget) {
      return;
    }

    // Make sure the event starts and ends on the same DOM element.
    if (event.target !== mouseDownTarget.current) {
      return;
    }

    mouseDownTarget.current = null;

    if (onBackdropClick) {
      onBackdropClick(event);
    }
  };

  return open ? (
    ReactDOM.createPortal(
      <div
        className={classes.windowOverlay}
        onMouseUp={handleBackdropClick}
        onMouseDown={handleMouseDown}
        role="presentation"
      >
        <dialog
          role="presentation"
          className={clsx(classes.dialog, {
            [className as string]: className != null,
          })}
          open={open}
        >
          {children}
        </dialog>
      </div>,
      document.body
    )
  ) : (
    <></>
  );
};

Dialog.defaultProps = {
  open: false,
  className: null,
  onBackdropClick: undefined,
};

export default Dialog;
