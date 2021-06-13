const colorHexRegExp = new RegExp(/^#[0-9A-F]{6}$/i);

export const isHexColor = (hex: string): boolean => colorHexRegExp.test(hex);
