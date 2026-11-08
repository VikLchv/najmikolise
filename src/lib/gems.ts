// Six cut gemstones drawn as real facets, seen from above. Fixed at build time, so every run looks the same.
type Pt = [number, number];
interface Palette { deep: string; mid: string; light: string; spark: string; glow: string }
export interface Facet { d: string; fill: string; flash: boolean }
export interface Gem { name: string; glow: string; outline: string; facets: Facet[]; glint: Pt }

const channel = (hex: string, i: number) => parseInt(hex.slice(1 + i * 2, 3 + i * 2), 16);
const mix = (a: string, b: string, t: number) =>
  `#${[0, 1, 2].map((i) => Math.round(channel(a, i) + (channel(b, i) - channel(a, i)) * t).toString(16).padStart(2, '0')).join('')}`;
const hash = (n: number) => { const x = Math.sin(n * 12.9898) * 43758.5453; return x - Math.floor(x); };
const lerp = (a: Pt, b: Pt, t: number): Pt => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
const path = (pts: Pt[]) => `M${pts.map(([x, y]) => `${x.toFixed(3)} ${y.toFixed(3)}`).join('L')}Z`;

// Light comes from the upper left. Hash gives the hard contrast a real stone has: some facets flash, some go dark.
function shade(p: Palette, pts: Pt[], center: Pt, seed: number, bias = 0) {
  const c: Pt = [pts.reduce((s, q) => s + q[0], 0) / pts.length - center[0], pts.reduce((s, q) => s + q[1], 0) / pts.length - center[1]];
  const len = Math.hypot(c[0], c[1]) || 1;
  const lit = (c[0] / len) * -0.55 + (c[1] / len) * -0.83;
  const t = Math.min(1, Math.max(0, 0.46 + 0.28 * lit + 0.62 * (hash(seed) - 0.5) + bias));
  if (t > 0.92) return p.spark;
  return t < 0.5 ? mix(p.deep, p.mid, t * 2) : mix(p.mid, p.light, (t - 0.5) * 2);
}

function brilliant(o: Pt[], center: Pt, table: number, p: Palette, seed: number): Facet[] {
  const n = o.length;
  const at = (i: number) => o[(i + n) % n];
  const m = (i: number) => lerp(center, lerp(at(i), at(i + 1), 0.5), 0.74);
  const t = (i: number) => lerp(center, at(i), table);
  const out: Facet[] = [];
  const add = (pts: Pt[], bias = 0) => {
    const s = seed + out.length * 1.7;
    out.push({ d: path(pts), fill: shade(p, pts, center, s, bias), flash: hash(s + 9) > 0.78 });
  };
  for (let i = 0; i < n; i += 1) {
    add([at(i), at(i + 1), m(i)], -0.06);
    add([m(i - 1), at(i), m(i)]);
    add([m(i - 1), t(i), m(i)], 0.05);
    add([t(i), m(i), t(i + 1)], 0.08);
  }
  // Looking through the table you see the pavilion below it: a star of darker and lighter wedges.
  for (let i = 0; i < n; i += 1) add([center, t(i), t(i + 1)], i % 2 ? -0.14 : 0.2);
  return out;
}

function stepCut(o: Pt[], center: Pt, p: Palette, seed: number): Facet[] {
  const rings = [1, 0.82, 0.64, 0.46];
  const n = o.length;
  const out: Facet[] = [];
  rings.slice(1).forEach((scale, r) => {
    for (let i = 0; i < n; i += 1) {
      const a = o[i];
      const b = o[(i + 1) % n];
      const pts = [lerp(center, a, rings[r]), lerp(center, b, rings[r]), lerp(center, b, scale), lerp(center, a, scale)];
      const s = seed + out.length * 2.3;
      out.push({ d: path(pts), fill: shade(p, pts, center, s, r * 0.05), flash: hash(s + 5) > 0.8 });
    }
  });
  const top = o.map((q) => lerp(center, q, rings[3]));
  out.push({ d: path(top), fill: mix(p.mid, p.light, 0.42), flash: false });
  // Long reflections across the flat table, what makes this cut read as glass.
  out.push({ d: path([lerp(top[0], top[1], 0.1), lerp(top[0], top[1], 0.55), lerp(top[4], top[5], 0.25), lerp(top[4], top[5], 0.75)]), fill: p.light, flash: true });
  return out;
}

const round = (n: number, rx = 1, ry = 1): Pt[] =>
  Array.from({ length: n }, (_, i) => { const a = (i / n) * Math.PI * 2 - Math.PI / 2; return [Math.cos(a) * rx, Math.sin(a) * ry] as Pt; });
const cushion = (n: number, power: number, rx = 0.94, ry = 0.94): Pt[] =>
  Array.from({ length: n }, (_, i) => {
    const a = (i / n) * Math.PI * 2 - Math.PI / 4;
    const c = Math.cos(a);
    const s = Math.sin(a);
    return [Math.sign(c) * Math.abs(c) ** (2 / power) * rx, Math.sign(s) * Math.abs(s) ** (2 / power) * ry] as Pt;
  });
const hexagon = (r = 1): Pt[] => {
  const corners = round(6, r * 0.96, r);
  return corners.flatMap((c, i) => [c, lerp(c, corners[(i + 1) % 6], 0.5)]);
};
const pear = (n: number): Pt[] =>
  Array.from({ length: n }, (_, i) => { const t = (i / n) * Math.PI * 2; return [0.98 * Math.sin(t) * Math.sin(t / 2), -Math.cos(t)] as Pt; });
const stepOctagon = (w: number, h: number, cut: number): Pt[] => [
  [-w + cut, -h], [w - cut, -h], [w, -h + cut], [w, h - cut], [w - cut, h], [-w + cut, h], [-w, h - cut], [-w, -h + cut],
];

const P: Record<string, Palette> = {
  ruby: { deep: '#3d0210', mid: '#b40f2e', light: '#ff5a6e', spark: '#ffe3e6', glow: 'rgba(255, 60, 90, .9)' },
  sapphire: { deep: '#04124f', mid: '#1540c8', light: '#5f9cff', spark: '#e4f0ff', glow: 'rgba(70, 130, 255, .9)' },
  emerald: { deep: '#01301c', mid: '#07905a', light: '#4fe6a4', spark: '#e4fff2', glow: 'rgba(40, 225, 150, .85)' },
  amethyst: { deep: '#1e0647', mid: '#6d24c9', light: '#b98bff', spark: '#f3e9ff', glow: 'rgba(170, 110, 255, .9)' },
  citrine: { deep: '#5a3202', mid: '#e39a0c', light: '#ffd75a', spark: '#fff8d9', glow: 'rgba(255, 196, 60, .9)' },
  diamond: { deep: '#46596b', mid: '#b4cbdc', light: '#eef8ff', spark: '#ffffff', glow: 'rgba(205, 238, 255, .95)' },
};
const C: Pt = [0, 0];
const make = (name: string, p: Palette, o: Pt[], facets: Facet[], glint: Pt): Gem => ({ name, glow: p.glow, outline: path(o), facets, glint });
const oval = round(14, 0.8, 1);
const hex = hexagon();
const step = stepOctagon(0.74, 1, 0.24);
const drop = pear(16);
const cush = cushion(12, 3.6);
const dia = round(16);

export const gems: Gem[] = [
  make('ruby', P.ruby, oval, brilliant(oval, C, 0.5, P.ruby, 3), [-0.34, -0.56]),
  make('sapphire', P.sapphire, hex, brilliant(hex, C, 0.52, P.sapphire, 11), [0.42, -0.5]),
  make('emerald', P.emerald, step, stepCut(step, C, P.emerald, 19), [-0.36, -0.62]),
  make('amethyst', P.amethyst, drop, brilliant(drop, [0, 0.2], 0.5, P.amethyst, 29), [-0.2, 0.02]),
  make('citrine', P.citrine, cush, brilliant(cush, C, 0.54, P.citrine, 37), [0.46, -0.46]),
  make('diamond', P.diamond, dia, brilliant(dia, C, 0.52, P.diamond, 43), [-0.42, -0.5]),
];
