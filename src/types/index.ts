export type spreadDirection = "left" | "right" | "top" | "bottom";

export interface Spread {
  direction?: spreadDirection;
  delay?: number;
  duration?: number;
}

export interface AreaInfo {
  active: boolean;
  clearAction?: () => void;
  immediateClear?: boolean;
  spread?: Spread;
  zIndex?: number;
}
