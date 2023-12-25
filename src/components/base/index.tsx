import React from "react";

export interface DimAreaParam {
  dim: Dim;
}

export type spreadDirection = "left" | "right" | "top" | "bottom";

export interface Spread {
  direction?: spreadDirection;
  delay?: number;
  duration?: number;
}

export interface Dim {
  active: boolean;
  clearAction?: () => void;
  immediateClear?: boolean;
  spread?: Spread;
  zIndex?: number;
}

export const DimArea: React.FunctionComponent<DimAreaParam> = (
  DimAreaParam
): JSX.Element => {
  const { dim } = DimAreaParam;

  // css reactive functions
  const checkDisplay = () => {
    // 방향이 지정되어 있으면 제원으로만 통제
    if (dim.spread?.direction) {
      return "block";
    }
    if (dim.active) {
      return "block";
    } else {
      return "none";
    }
  };
  const checkWidth = () => {
    if (dim.active) {
      switch (dim.spread?.direction) {
        case "left":
        case "right":
        case "top":
        case "bottom":
          return "100vw";
        default:
          return "100vw";
      }
    } else {
      switch (dim.spread?.direction) {
        case "left":
        case "right":
          return "0vw";
        case "top":
        case "bottom":
          return "100vw";
        default:
          return "100vw";
      }
    }
  };

  const checkHeight = () => {
    if (dim.active) {
      switch (dim.spread?.direction) {
        case "left":
        case "right":
        case "top":
        case "bottom":
          return "100vh";
        default:
          return "100vh";
      }
    } else {
      switch (dim.spread?.direction) {
        case "left":
        case "right":
          return "100vh";
        case "top":
        case "bottom":
          return "0vh";
        default:
          return "100vh";
      }
    }
  };

  const checkVerticalDirection = () => {
    switch (dim.spread?.direction) {
      case "left":
      case "top":
      case "bottom":
        return "left";
      case "right":
        return "right";
      default:
        return "left";
    }
  };
  const checkHorizontalDirection = () => {
    switch (dim.spread?.direction) {
      case "left":
      case "top":
      case "right":
        return "top";
      case "bottom":
        return "bottom";
      default:
        return "top";
    }
  };

  React.useEffect(() => {
    if (!(window && document)) {
      throw "Not work on this environment";
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function handleTouchMove(event: any) {
      if (dim.active) {
        event.preventDefault();
      }
    }

    if (dim.active) {
      document.body.style.overflow = "hidden";
      //scroll fix to backgroupd
      const htmlBody = document.querySelector("html");
      if (!htmlBody) {
        throw "Can't find html";
      }
      htmlBody.scrollTop = window.scrollY;
    } else {
      document.body.style.overflow = "scroll";
    }
    // in mobile touch event prevent
    window.addEventListener("touchmove", handleTouchMove, {
      passive: false,
    });
    return () => {
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [dim.active]);

  return (
    <div
      id="dimArea"
      onClick={() => {
        dim.clearAction && dim.clearAction();
      }}
      style={{
        position: "fixed",
        backgroundColor: "rgba(44, 44, 44, 0.5)",
        zIndex: dim.zIndex ?? 150,
        display: checkDisplay(),
        width: checkWidth(),
        height: checkHeight(),
        [`${checkVerticalDirection()}`]: "0vw",
        [`${checkHorizontalDirection()}`]: "0vh",
        backdropFilter: "none",
        transitionProperty: "width, height",
        transitionDelay: `${
          !dim.active && dim.immediateClear ? 0 : dim.spread?.delay ?? 0
        }s`,
        transitionDuration: `${
          !dim.active && dim.immediateClear ? 0 : dim.spread?.duration ?? 3
        }s`,
        transitionTimingFunction: "ease",
      }}
    ></div>
  );
};
