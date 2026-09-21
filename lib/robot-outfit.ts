import type { Application } from "@splinetool/runtime";

const styled = new WeakSet<Application>();
const glyphs: Record<string, string[]> = {
  M: ["10001","11011","10101","10101","10001","10001","10001"],
  E: ["11111","10000","10000","11110","10000","10000","11111"],
  T: ["11111","00100","00100","00100","00100","00100","00100"],
  A: ["01110","10001","10001","11111","10001","10001","10001"],
  P: ["11110","10001","10001","11110","10000","10000","10000"],
  H: ["10001","10001","10001","11111","10001","10001","10001"],
  Y: ["10001","10001","01010","00100","00100","00100","00100"],
  G: ["01111","10000","10000","10111","10001","10001","01111"],
  R: ["11110","10001","10001","11110","10100","10010","10001"],
  O: ["01110","10001","10001","10001","10001","10001","01110"],
  W: ["10001","10001","10001","10101","10101","11011","10001"],
  S: ["01111","10000","10000","01110","00001","00001","11110"],
  U: ["10001","10001","10001","10001","10001","10001","01110"],
  D: ["11110","10001","10001","10001","10001","10001","11110"],
  I: ["11111","00100","00100","00100","00100","00100","11111"],
};
function lettering(text: string, unit: number, top: number) {
  const vertices: number[] = [];
  const left = -(text.length * 6 - 1) * unit / 2;
  [...text].forEach((letter, i) => glyphs[letter]?.forEach((row, y) => [...row].forEach((pixel, x) => {
    if (pixel !== "1") return;
    const a = left + (i * 6 + x) * unit, b = top - y * unit;
    vertices.push(a,b,75, a,b-unit,75, a+unit,b-unit,75, a,b,75, a+unit,b-unit,75, a+unit,b,75);
  })));
  return vertices;
}
/** Uses scene-native geometry: the print inherits the robot's torso movement. */
export async function dressMetaphyRobot(app: Application) {
  if (styled.has(app)) return;
  const body = app.findObjectByName("Body");
  const torso = app.findObjectByName("Top part");
  if (!body || !torso) return;
  styled.add(app);
  const shirt = await app.cloneObject(body, { name: "Metaphy Shirt", scale: [1.035, 1.015, 1.035] });
  shirt.color = "#386ba3";
  await app.createObject("CustomMesh", { name: "Metaphy Print", parent: torso, vertices: lettering("METAPHY", 1.7, 153), material: { color: "#edf7ff", roughness: 1, metalness: 0 } });
  await app.createObject("CustomMesh", { name: "Growth Agency Print", parent: torso, vertices: lettering("GROWTH AGENCY", 0.75, 134), material: { color: "#b9dfff", roughness: 1, metalness: 0 } });
}
