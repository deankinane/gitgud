export class Dimension {
  width: number;
  height: number;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }
}

export function measureFont(
  fontFamily: string,
  fontSize: number,
  lineHeight: number,
  charMeasureElement: HTMLElement
): Dimension {
  let style = charMeasureElement.style;
  style.position = "absolute";
  style.display = "block";
  style.fontFamily = fontFamily;
  style.fontSize = fontSize + "px";
  style.height = "auto";
  charMeasureElement.innerText = "X";
  let rect = charMeasureElement.getBoundingClientRect();
  style.display = "none";
  let charWidth = Math.ceil(rect.width);
  let charHeight = Math.ceil(rect.height);
  return new Dimension(charWidth, charHeight);
}
