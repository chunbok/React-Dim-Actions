import React, { useRef } from "react";
import { AreaInfo } from "../../types";

interface DimAreaInfo extends AreaInfo {
  children: React.ReactNode;
}

export const DimArea: React.FunctionComponent<DimAreaInfo> = ({
  children,
  ...info
}): JSX.Element => {
  const overflowStyle = useRef("none");
  // css reactive functions
  const checkDisplay = () => {
    // 방향이 지정되어 있으면 제원으로만 통제
    if (info.spread?.direction) {
      return "block";
    }
    if (info.active) {
      return "block";
    } else {
      return "none";
    }
  };
  const checkWidth = () => {
    if (info.active) {
      switch (info.spread?.direction) {
        case "left":
        case "right":
        case "top":
        case "bottom":
          return "100vw";
        default:
          return "100vw";
      }
    } else {
      switch (info.spread?.direction) {
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
    if (info.active) {
      switch (info.spread?.direction) {
        case "left":
        case "right":
        case "top":
        case "bottom":
          return "100vh";
        default:
          return "100vh";
      }
    } else {
      switch (info.spread?.direction) {
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
    switch (info.spread?.direction) {
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
    switch (info.spread?.direction) {
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
      if (info.active) {
        event.preventDefault();
      }
    }

    if (info.active) {
      overflowStyle.current = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      //scroll fix to backgroupd
      const htmlBody = document.querySelector("html");
      if (!htmlBody) {
        throw "Can't find html";
      }
      htmlBody.scrollTop = window.scrollY;
    } else {
      document.body.style.overflow = overflowStyle.current;
    }
    // in mobile touch event prevent
    window.addEventListener("touchmove", handleTouchMove, {
      passive: false,
    });
    return () => {
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [info.active]);

  return (
    <div
      id="dimArea"
      onClick={() => {
        info.clearAction && info.clearAction();
      }}
      style={{
        position: "fixed",
        backgroundColor: "rgba(44, 44, 44, 0.5)",
        zIndex: info.zIndex ?? 150,
        display: checkDisplay(),
        width: checkWidth(),
        height: checkHeight(),
        [`${checkVerticalDirection()}`]: "0vw",
        [`${checkHorizontalDirection()}`]: "0vh",
        backdropFilter: "none",
        transitionProperty: "width, height",
        transitionDelay: `${
          !info.active && info.immediateClear ? 0 : info.spread?.delay ?? 0
        }s`,
        transitionDuration: `${
          !info.active && info.immediateClear ? 0 : info.spread?.duration ?? 3
        }s`,
        transitionTimingFunction: "ease",
      }}
    >
      {children}
    </div>
  );
};
