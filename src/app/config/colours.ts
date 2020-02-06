type colourName = "terminal-bg" | "terminal-fg";
interface colourType {
  name: colourName;
  hex: string;
}

const colours = new Array<colourType>();
colours.push({ name: "terminal-bg", hex: "#000" });

export function getColour(name: colourName): string | undefined {
  return colours.find(x => x.name === name)!.hex;
}

export function applyColours(el: HTMLElement) {
  if (el.dataset.colour) {
    el.style.backgroundColor =
      getColour(el.dataset.colour as colourName) || el.style.backgroundColor;
  }

  el.querySelectorAll("[data-colour]").forEach(d => {
    const dEl = d as HTMLElement;
    dEl.style.backgroundColor =
      getColour(dEl.dataset.colour as colourName) || dEl.style.backgroundColor;
  });
}
