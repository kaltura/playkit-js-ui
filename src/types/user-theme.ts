export type ColorType = {
  primary: string;
  secondary: string;
  success: string;
  danger: string;
  warning: string;
  live: string;
  // surface colors
  playerBackground: string;
  paperSurface: string;
  elevatedSurface: string;
  protectionSurface: string;
  // tone ramp colors
  tone1: string;
  tone2: string;
  tone3: string;
  tone4: string;
  tone5: string;
  tone6: string;
  tone7: string;
  tone8: string;
};

export type UserTheme = {
  colors: ColorType;
};
