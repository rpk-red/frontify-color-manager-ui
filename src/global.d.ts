declare type NullableString = string | null;

declare type NullableNumer = number | null;

declare type NullableBoolean = boolean | null;

declare type ColorHEX = `#${string}`;

declare type Color = {
  id: number;
  name: string;
  hexCode: ColorHEX;
};
