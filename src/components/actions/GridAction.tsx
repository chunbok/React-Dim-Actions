import React from "react";
import { Spread } from "../../types";

interface ActionSpread extends Spread {
  active: boolean;
  children: React.ReactNode;
}

export const GridActArea: React.FunctionComponent<ActionSpread> = ({
  children,
  ...action
}): JSX.Element => {
  return (
    <div
      style={{
        display: action.active ? "block" : "none",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      {children}
    </div>
  );
};
