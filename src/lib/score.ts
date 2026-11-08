// Original background music, composed in code: no audio files, no licences, nothing to download.
// It runs from the lock to the finale. Scenes and episodes each have a mood, and episodes follow the script shot by shot.

export type FilmMood = 'ep1' | 'ep2' | 'ep3' | 'ep4';
export type SceneMood = 'lock' | 'cold' | 'brief' | 'montage' | 'lab' | 'rain' | 'crew' | 'table' | 'finale';
type Mood = FilmMood | SceneMood | 'sunnyBed' | 'seaBed' | 'crewBed';

const LEVEL = 0.9;
// Inside an episode the music sits under the narrator, about 5 dB below its level on the site.
const UNDER_VOICE = 0.55;
const LOOKAHEAD = 1.2;

let ctx: AudioContext | null = null;
let master: GainNode;
let room: GainNode;
let bus: GainNode | null = null;
let wet: GainNode | null = null;
let mood: Mood = 'cold';
let scene: SceneMood = 'cold';
let filmOpen = false;
let step = 0;
let at = 0;
let timer = 0;
let lv = 0;
let later = 0;
let wokenAt = 0;

const hz = (midi: number) => 440 * 2 ** ((midi - 69) / 12);

function ensure() {
  if (ctx) return ctx;
  ctx = new AudioContext();
  const limiter = ctx.createDynamicsCompressor();
  limiter.threshold.value = -14;
  limiter.ratio.value = 6;
  limiter.connect(ctx.destination);
  master = ctx.createGain();
  master.gain.value = LEVEL;
  master.connect(limiter);

  // A generated hall, so the few sparse notes do not sound like a toy.
  const length = ctx.sampleRate * 2.4;
  const impulse = ctx.createBuffer(2, length, ctx.sampleRate);
  for (let ch = 0; ch < 2; ch++) {
    const data = impulse.getChannelData(ch);
    for (let i = 0; i < length; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / length) ** 3;
  }
  const hall = ctx.createConvolver();
  hall.buffer = impulse;
  room = ctx.createGain();
  room.gain.value = 0.35;
  room.connect(hall);
  hall.connect(master);
  return ctx;
}

type Tone = { type?: OscillatorType; gain: number; dur: number; attack?: number; cutoff?: number; hall?: boolean; spread?: number };

function tone(midi: number, t: number, o: Tone) {
  if (!bus || !wet) return;
  const c = ctx!;
  const env = c.createGain();
  const attack = o.attack ?? 0.01;
  env.gain.setValueAtTime(0, t);
  env.gain.linearRampToValueAtTime(o.gain, t + attack);
  env.gain.exponentialRampToValueAtTime(0.0001, t + Math.max(o.dur, attack + 0.02));
  const filter = c.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.value = o.cutoff ?? 2400;
  filter.connect(env);
  env.connect(bus);
  if (o.hall) env.connect(wet);
  (o.spread ? [-o.spread, o.spread] : [0]).forEach((cents) => {
    const osc = c.createOscillator();
    osc.type = o.type ?? 'triangle';
    osc.frequency.value = hz(midi);
    osc.detune.value = cents;
    osc.connect(filter);
    osc.start(t);
    osc.stop(t + o.dur + 0.05);
  });
}

function drum(t: number, freq: number, gain: number, dur = 0.5) {
  if (!bus) return;
  const c = ctx!;
  const osc = c.createOscillator();
  const env = c.createGain();
  osc.frequency.setValueAtTime(freq * 2.4, t);
  osc.frequency.exponentialRampToValueAtTime(freq, t + 0.07);
  env.gain.setValueAtTime(gain, t);
  env.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  osc.connect(env);
  env.connect(bus);
  osc.start(t);
  osc.stop(t + dur + 0.05);
}

let noiseBuffer: AudioBuffer | null = null;
function noise(t: number, dur: number, gain: number, type: BiquadFilterType, freq: number, attack = 0.002) {
  if (!bus) return;
  const c = ctx!;
  if (!noiseBuffer) {
    noiseBuffer = c.createBuffer(1, c.sampleRate * 2, c.sampleRate);
    const data = noiseBuffer.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
  }
  const src = c.createBufferSource();
  src.buffer = noiseBuffer;
  src.loop = true;
  const filter = c.createBiquadFilter();
  filter.type = type;
  filter.frequency.value = freq;
  const env = c.createGain();
  env.gain.setValueAtTime(0.0001, t);
  env.gain.linearRampToValueAtTime(gain, t + attack);
  env.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  src.connect(filter);
  filter.connect(env);
  env.connect(bus);
  src.start(t);
  src.stop(t + dur + 0.05);
}

const chord = (notes: number[], t: number, o: Tone) => notes.forEach((n) => tone(n, t, o));
const pad = (notes: number[], t: number, gain: number, dur: number, cutoff = 500, attack = 1.4) =>
  chord(notes, t, { type: 'sawtooth', gain, dur, attack, cutoff, hall: true, spread: 7 });
const piano = (note: number, t: number, gain = 0.085, dur = 2.6) => tone(note, t, { gain, dur, hall: true, cutoff: 1800 });

// ---------- The lock: blackout. Every letter found tightens it. lv = letters found ----------
const GLASS = [86, 81, 89, 84];
function blackout(s: number, t: number) {
  if (s % 16 === 0) pad([26, 33], t, 0.08, 8.6, 240, 2.2);
  if (s % 32 === 8) noise(t, 6, 0.05, 'lowpass', 520, 3);
  if (s % 24 === 10) tone(GLASS[(s / 24 | 0) % 4], t, { type: 'sine', gain: 0.028, dur: 3.2, hall: true });
  if (lv >= 1 && s % 8 === 0) {
    drum(t, 46, 0.2 + lv * 0.04);
    drum(t + 0.3, 42, 0.15 + lv * 0.03);
  }
  if (lv >= 3 && s % 2 === 0) noise(t, 0.03, 0.035, 'highpass', 5200);
  if (lv >= 4 && s % 16 === 0) pad([50, 53], t, 0.035, 8, 800, 3);
}

// ---------- Scenes of the site: quieter, they sit under reading ----------
// 1 Cold open, night outside: a thriller pulse, sure of itself.
const COLD = [[38, 45, 53], [34, 41, 50], [31, 43, 50], [33, 45, 52]];
function cold(s: number, t: number) {
  const part = COLD[(s / 16 | 0) % 4];
  if (s % 16 === 0) pad(part, t, 0.05, 6.4, 520);
  tone(part[0] + 12, t, { gain: s % 4 === 0 ? 0.08 : 0.04, dur: 0.3, cutoff: 700 });
  if (s % 8 === 0) drum(t, 50, 0.3);
  if (s % 32 === 22) piano(part[2] + 24, t, 0.06, 3);
}
// 2 Brief, production office by day: clean and busy.
const BRIEF = [[53, 60, 65, 69], [50, 57, 62, 65], [46, 53, 58, 62], [48, 55, 60, 64]];
function brief(s: number, t: number) {
  const part = BRIEF[(s / 16 | 0) % 4];
  if (s % 16 === 0) chord(part.slice(0, 2), t, { type: 'sine', gain: 0.04, dur: 4.8, attack: 0.8, hall: true });
  tone(part[s % 4] + 12, t, { gain: 0.045, dur: 0.5, cutoff: 2200, hall: true });
  if (s % 8 === 0) drum(t, 60, 0.14, 0.3);
}
// 4 Lab: cool, tidy and curious.
const LAB = [69, 76, 74, 81, 79, 74, 72, 67];
function lab(s: number, t: number) {
  if (s % 16 === 0) pad([33, 40], t, 0.05, 8.4, 300, 2);
  if (s % 3 === 0) tone(LAB[(s / 3 | 0) % 8], t, { type: 'sine', gain: 0.05, dur: 2, hall: true });
  if (s % 12 === 6) noise(t, 0.05, 0.015, 'highpass', 7000);
}
// 5 Rain, 03:07: rain, a clock and the decision. lv 1 once a choice is made.
function rain(s: number, t: number) {
  if (s % 8 === 0) noise(t, 5, 0.06, 'highpass', 1900, 1.4);
  if (s % 72 === 40) noise(t, 3.8, 0.28, 'lowpass', 180, 0.3);
  if (s % 16 === 0) pad([29, 36], t, 0.07, 8.4, 260, 2);
  if (s % 2 === 0) noise(t, 0.03, 0.04, 'highpass', 4600);
  if (lv >= 1) {
    if (s % 8 === 0) { drum(t, 46, 0.3); drum(t + 0.3, 42, 0.22); }
    if (s % 16 === 8) pad([41, 44, 48], t, 0.04, 8, 700, 2.5);
  }
}
// 6 Crew, morning: warm, people waking up and getting on with it.
const CREW = [[43, 62, 67, 71], [38, 62, 66, 69], [40, 59, 64, 67], [36, 60, 64, 67]];
function crew(s: number, t: number) {
  const part = CREW[(s / 16 | 0) % 4];
  if (s % 16 === 0) {
    tone(part[0] + 12, t, { type: 'sine', gain: 0.07, dur: 5.6, attack: 0.6, hall: true });
    tone(part[1], t, { type: 'sine', gain: 0.03, dur: 5.6, attack: 1, hall: true });
  }
  const notes = part.slice(1);
  if (s % 2 === 0) tone(notes[(s / 2 | 0) % 3] + (s % 8 === 6 ? 12 : 0), t, { gain: 0.06, dur: 1.1, hall: true, cutoff: 2600 });
  if (s % 16 === 12) piano(part[3] + 12, t, 0.04, 3);
}
// 7 Cards on the table: a room without cameras, one piano and nothing to hide.
const TABLE = [[57, 64, 69, 72], [60, 67, 72, 76], [53, 60, 65, 69], [55, 62, 67, 71]];
function table(s: number, t: number) {
  const part = TABLE[(s / 8 | 0) % 4];
  if (s % 8 === 0) tone(part[0] - 12, t, { type: 'sine', gain: 0.05, dur: 6, attack: 0.6, hall: true });
  if (s % 2 === 0) piano(part[(s / 2 | 0) % 4], t, s % 8 === 0 ? 0.075 : 0.055, 3.4);
}
// 8 Finale, midnight in the hall: starts low and keeps climbing to something bright.
const FINALE = [[41, 60, 65, 69], [36, 60, 64, 67], [38, 57, 62, 65], [34, 58, 62, 65]];
function finale(s: number, t: number) {
  const part = FINALE[(s / 32 | 0) % 4];
  const grown = Math.min(3, s / 64 | 0);
  const bar = s % 16;
  if (s % 32 === 0) pad(part.slice(1), t, 0.04 + grown * 0.012, 6.8, 800 + grown * 500, 1);
  if ([0, 6, 8].includes(bar)) drum(t, 56, bar === 0 ? 0.42 : 0.24, 0.5);
  if (grown >= 1 && s % 2 === 0) tone(part[0] + 12, t, { type: 'sawtooth', gain: 0.05, dur: 0.18, cutoff: 800 });
  if (grown >= 2 && s % 32 === 0) chord(part.slice(1).map((n) => n + 12), t, { type: 'sawtooth', gain: 0.04, dur: 3.2, attack: 0.1, cutoff: 2000, hall: true, spread: 6 });
  if (grown >= 3 && bar === 8) tone(part[3] + 24, t, { type: 'sawtooth', gain: 0.04, dur: 1.1, attack: 0.05, cutoff: 2600, hall: true });
}

// ---------- EP 01. lv 0 setup, 1 tension, 2 the vote, 3 hush, 4 solved ----------
const NOIR = [[45, 52, 60], [41, 48, 57], [38, 50, 57], [40, 52, 56]];
const SOLVED = [[48, 55, 64], [41, 48, 57], [43, 50, 59], [45, 52, 60]];
const NOIR_PIANO = [69, 72, 76, 75, 72, 69, 64, 68, 71, 74, 72, 64];
const SOLVED_PIANO = [72, 76, 79, 77, 74, 71, 72, 67, 69, 72, 76, 74];
function noir(s: number, t: number) {
  const beat = 0.5;
  const chords = lv === 4 ? SOLVED : NOIR;
  if (s % 16 === 0) pad(chords[(s / 16) % 4], t, 0.05, 8.6, lv === 4 ? 900 : 480, 1.6);
  if (lv !== 3 && lv !== 4 && s % 2 === 0) noise(t, 0.03, lv ? 0.05 : 0.03, 'highpass', 5200);
  const phrase = s % 16;
  if (lv !== 2 && (phrase === 3 || phrase === 6 || phrase === 11)) {
    const n = (s / 16 | 0) * 3 + (phrase === 3 ? 0 : phrase === 6 ? 1 : 2);
    piano((lv === 4 ? SOLVED_PIANO : NOIR_PIANO)[n % 12], t);
  }
  if (lv === 1 && s % 8 === 0) {
    drum(t, 48, 0.42);
    drum(t + beat * 0.6, 44, 0.3);
  }
  if (lv === 2) {
    if (s % 2 === 0) { drum(t, 48, 0.4); drum(t + beat * 0.5, 44, 0.26); }
    if (s % 16 === 0) pad(chords[(s / 16) % 4].map((n) => n + 12), t, 0.035, 8, 1000, 3);
  }
}

// ---------- EP 02. lv 0 the march begins, 1 brass, 2 Thanos, 3 everything, 4 the Jar (mystery) ----------
const EPIC = [38, 34, 41, 36];
const EPIC_THIRD = [3, 4, 4, 4];
const EPIC_RHYTHM = [1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0];
const SHIMMER = [86, 81, 88, 84, 89, 86];
function epic(s: number, t: number) {
  const root = EPIC[(s / 32 | 0) % 4];
  const third = EPIC_THIRD[(s / 32 | 0) % 4];
  const bar = s % 16;
  if (lv === 4) {
    if (s % 32 === 0) pad([38, 45, 53], t, 0.05, 5, 500, 1.2);
    if (s % 6 === 0) tone(SHIMMER[(s / 6 | 0) % 6], t, { type: 'sine', gain: 0.04, dur: 1.8, hall: true });
    if (s % 32 === 24) noise(t, 1.2, 0.04, 'bandpass', 2600, 1);
    return;
  }
  if (lv === 2) {
    if (s % 32 === 0) pad([26, 33, 41], t, 0.09, 5, 420, 0.3);
    if (bar === 0) drum(t, 42, 0.8, 1.1);
    if (bar === 8) drum(t, 46, 0.55, 0.8);
    if (bar === 12 || bar === 14) drum(t, 70, 0.2, 0.25);
    return;
  }
  if (EPIC_RHYTHM[bar]) tone(root + (bar % 8 === 6 ? 12 : 0), t, { type: 'sawtooth', gain: 0.1, dur: 0.16, cutoff: 800, spread: 5 });
  if ([0, 3, 6, 8].includes(bar)) drum(t, 62, bar === 0 ? 0.55 : 0.34, 0.45);
  if (lv >= 1 && (bar === 12 || bar === 14)) drum(t, 92, 0.3, 0.3);
  if (lv >= 1 && s % 32 === 0) chord([root + 24, root + 24 + third, root + 31], t, { type: 'sawtooth', gain: 0.06, dur: 2.5, attack: 0.08, cutoff: 1500, hall: true, spread: 6 });
  if (lv === 3) {
    if (bar === 8) chord([root + 36, root + 36 + third, root + 43], t, { type: 'sawtooth', gain: 0.04, dur: 1.1, attack: 0.04, cutoff: 2600, hall: true, spread: 8 });
    if (bar === 0) noise(t, 1.3, 0.05, 'highpass', 6000);
  }
  if (s % 64 === 56) noise(t, 1.2, 0.05, 'bandpass', 3000, 1.1);
}

// ---------- EP 03. lv 0 sunny, 1 curious, 2 the planet is full of it, 3 forward, 4 serious ----------
const SUNNY = [
  { pad: [48, 55, 64], arp: [60, 64, 67, 72, 76, 72, 67, 64] },
  { pad: [45, 52, 60], arp: [57, 60, 64, 69, 72, 69, 64, 60] },
  { pad: [41, 48, 57], arp: [53, 57, 60, 65, 69, 65, 60, 57] },
  { pad: [43, 50, 59], arp: [55, 59, 62, 67, 71, 67, 62, 59] },
];
const SAD = [
  { pad: [45, 52, 60], arp: [57, 60, 64, 69, 72, 69, 64, 60] },
  { pad: [41, 48, 57], arp: [53, 57, 60, 65, 69, 65, 60, 57] },
];
function sunny(s: number, t: number) {
  if (lv === 4) {
    if (s % 16 === 0) pad([29, 36, 41], t, 0.06, 7, 320, 1);
    if (s % 8 === 0) drum(t, 46, 0.26, 0.9);
    return;
  }
  const list = lv === 2 ? SAD : SUNNY;
  const part = list[(s / 8 | 0) % list.length];
  if (s % 8 === 0) chord(part.pad, t, { type: 'sine', gain: 0.045, dur: 4, attack: 0.9, hall: true });
  if (lv === 2 && s % 2) return;
  if (lv === 1) {
    if (s % 2 === 0) tone(part.arp[s % 8] + 12, t, { gain: 0.06, dur: 0.35, cutoff: 3000, hall: true });
    return;
  }
  tone(part.arp[s % 8], t, { gain: s % 8 === 0 ? 0.09 : 0.06, dur: 1.5, hall: true, cutoff: 2600 });
  if (lv === 3) {
    if (s % 4 === 0) drum(t, 64, 0.16, 0.3);
    tone(part.pad[0] + 12, t, { gain: 0.04, dur: 0.2, cutoff: 900 });
  }
}

// ---------- EP 04. lv 0 storm, 1 rocking, 2 the lords, 3 ports and gold, 4 the full theme, 5 held breath ----------
// Written for this site: G minor, Eb, Bb, F.
const SEA = [[43, 50, 58], [39, 46, 55], [46, 53, 62], [41, 48, 57]];
const GOLD = [74, 79, 82, 79, 74, 70];
const SEA_THEME: Record<number, number> = {
  0: 74, 3: 70, 5: 72, 6: 70, 9: 67,
  12: 75, 15: 70, 17: 72, 18: 67, 21: 70,
  24: 74, 27: 77, 29: 74, 30: 70, 33: 74,
  36: 72, 39: 69, 41: 65, 42: 72, 45: 74,
};
function sea(s: number, t: number) {
  const bar = s % 6;
  const part = SEA[(s / 12 | 0) % 4];
  if (s % 24 === 0) noise(t, 5.5, 0.06, 'lowpass', 620, 2.6);
  if (lv === 5) {
    if (s % 24 === 0) tone(62, t, { type: 'sine', gain: 0.04, dur: 5, attack: 2, hall: true });
    return;
  }
  if (lv === 0) {
    if (s % 12 === 0) drum(t, 40, 0.5, 1.2);
    if (s % 24 === 0) pad(SEA[0], t, 0.04, 4.5, 500, 1);
    return;
  }
  if (s % 12 === 0) pad(part, t, lv >= 2 ? 0.06 : 0.04, 2.9, lv === 4 ? 1400 : 600, 0.5);
  if (bar === 0 || bar === 3) tone(part[0] - (bar === 3 ? 0 : 12), t, { gain: 0.16, dur: 0.42, cutoff: 700 });
  if (bar === 0) drum(t, 58, lv >= 2 ? 0.42 : 0.26, 0.5);
  if (lv >= 2 && bar === 3) drum(t, 72, 0.22, 0.3);
  if (lv === 3 && s % 2 === 0) tone(GOLD[(s / 2 | 0) % 6], t, { gain: 0.05, dur: 0.5, hall: true, cutoff: 3000 });
  const theme = SEA_THEME[s % 48];
  if (theme && lv >= 3) {
    tone(theme, t, { type: 'sawtooth', gain: lv === 4 ? 0.085 : 0.06, dur: 0.38, cutoff: 2400, hall: true, spread: 6 });
    if (lv === 4) tone(theme - 12, t, { type: 'sawtooth', gain: 0.05, dur: 0.38, cutoff: 1500, spread: 4 });
  }
  if (lv === 4 && s % 12 === 0) chord(part.map((n) => n + 24), t, { type: 'sawtooth', gain: 0.04, dur: 2.2, attack: 0.1, cutoff: 2200, hall: true, spread: 7 });
}

type Shot = { lv: number; hit?: 'low' | 'big' };
type Score = { play: (s: number, t: number) => void; step: number; gain: number; shots?: Record<number, Shot> };

const SCORES: Record<Mood, Score> = {
  lock: { play: blackout, step: 0.5, gain: 0.9 },
  cold: { play: cold, step: 0.375, gain: 0.75 },
  brief: { play: brief, step: 0.3, gain: 1.7 },
  montage: { play: epic, step: 0.15, gain: 0.42 },
  lab: { play: lab, step: 0.5, gain: 0.8 },
  rain: { play: rain, step: 0.5, gain: 0.85 },
  crew: { play: crew, step: 0.375, gain: 1.9 },
  table: { play: table, step: 0.75, gain: 1.7 },
  finale: { play: finale, step: 0.2, gain: 0.85 },
  crewBed: { play: crew, step: 0.375, gain: 1.2 },
  sunnyBed: { play: sunny, step: 0.4286, gain: 0.55 },
  seaBed: { play: sea, step: 0.2, gain: 0.5 },
  // Shots are ids from the script, not their order. The numbers follow what the narrator is saying.
  ep1: {
    play: noir, step: 0.5, gain: 1,
    shots: {
      1: { lv: 0 }, 2: { lv: 0 }, 3: { lv: 0 }, 4: { lv: 0 },
      5: { lv: 1 }, 6: { lv: 1, hit: 'low' },
      7: { lv: 1, hit: 'low' }, 8: { lv: 1, hit: 'low' }, 9: { lv: 1, hit: 'low' },
      10: { lv: 3 }, // the one nobody notices: the room goes quiet
      11: { lv: 1 }, 12: { lv: 3 }, 13: { lv: 2 },
      14: { lv: 1, hit: 'big' }, 15: { lv: 3 }, // "no accident": the room holds its breath
      16: { lv: 1 }, 17: { lv: 1 }, 18: { lv: 2 }, 19: { lv: 2, hit: 'low' },
      20: { lv: 4, hit: 'big' },
    },
  },
  ep2: {
    play: epic, step: 0.15, gain: 1,
    shots: {
      1: { lv: 0, hit: 'big' }, 2: { lv: 0 }, 3: { lv: 1 },
      4: { lv: 4, hit: 'low' }, // the Jar
      8: { lv: 2, hit: 'big' }, // Thanos
      5: { lv: 1 }, 6: { lv: 1 }, 7: { lv: 3, hit: 'big' },
    },
  },
  ep3: {
    play: sunny, step: 0.4286, gain: 1,
    shots: { 1: { lv: 0 }, 2: { lv: 0 }, 3: { lv: 0 }, 6: { lv: 1 }, 7: { lv: 0 }, 8: { lv: 2 }, 9: { lv: 3 }, 5: { lv: 4 } },
  },
  ep4: {
    play: sea, step: 0.2, gain: 1,
    shots: {
      1: { lv: 0, hit: 'low' }, 2: { lv: 1, hit: 'big' }, 3: { lv: 4, hit: 'big' }, 6: { lv: 2 }, 7: { lv: 3 },
      8: { lv: 4, hit: 'big' }, 4: { lv: 1 }, 5: { lv: 5 },
    },
  },
};
// What keeps playing under the end screen of each episode, while there is something to read.
const AFTER: Record<FilmMood, Mood> = { ep1: 'table', ep2: 'crewBed', ep3: 'sunnyBed', ep4: 'seaBed' };
// EP 03 says "Žádná hudba" on this shot, and for those few seconds it is true.
const EP3_SILENT = 4;

function schedule() {
  if (!ctx || !bus || ctx.state !== 'running') return;
  const score = SCORES[mood];
  if (at < ctx.currentTime) at = ctx.currentTime + 0.05;
  while (at < ctx.currentTime + LOOKAHEAD) {
    score.play(step, at);
    step += 1;
    at += score.step;
  }
}

function drop(fade: number) {
  clearInterval(timer);
  clearTimeout(later);
  timer = 0;
  if (!bus || !wet || !ctx) return;
  const now = ctx.currentTime;
  [bus, wet].forEach((node) => {
    node.gain.cancelScheduledValues(now);
    node.gain.setValueAtTime(node.gain.value, now);
    node.gain.linearRampToValueAtTime(0, now + fade);
    window.setTimeout(() => node.disconnect(), (fade + 0.2) * 1000);
  });
  bus = null;
  wet = null;
}

// There is only ever one `bus`: whatever played before is faded out first, so a scene and an episode cannot play together.
function begin(next: Mood, fade: number, out = fade) {
  const c = ensure();
  drop(out);
  mood = next;
  step = 0;
  lv = 0;
  bus = c.createGain();
  bus.gain.setValueAtTime(0, c.currentTime);
  bus.gain.linearRampToValueAtTime(SCORES[next].gain * (filmOpen ? UNDER_VOICE : 1), c.currentTime + fade);
  bus.connect(master);
  wet = c.createGain();
  wet.connect(room);
  at = c.currentTime + 0.05;
  schedule();
  timer = window.setInterval(schedule, 200);
}

// The music is always on. Browsers hold sound back until the first click, tap or key press, and some allow it
// right away, so it is tried on load and on every gesture until it really runs. A finger pressing down is not
// enough for a phone, that is why it must not stop at the first event.
function startMusic() {
  if (wokenAt) return;
  wokenAt = performance.now();
  GESTURES.forEach((type) => removeEventListener(type, wake, true));
  if (!filmOpen) begin(scene, 1.2);
}
function wake() {
  ensure().resume().then(startMusic).catch(() => {});
}
const GESTURES = ['pointerdown', 'pointerup', 'touchend', 'keydown', 'click'];
GESTURES.forEach((type) => addEventListener(type, wake, { capture: true, passive: true }));
// An iPhone with the ring switch on silent would otherwise mute everything made in code.
const session = (navigator as Navigator & { audioSession?: { type: string } }).audioSession;
if (session) session.type = 'playback';
wake();
// A phone stops sound when another app comes to the front, and it has to come back with the page.
let heldByFilm = false;
document.addEventListener('visibilitychange', () => {
  if (!document.hidden && ctx && !heldByFilm) ctx.resume().catch(() => {});
});

/** The scene on screen. It plays right away if sound is already allowed and no episode is running. */
export function setScene(next: SceneMood) {
  if (scene === next && bus && mood === next) return;
  scene = next;
  if (wokenAt && !filmOpen) begin(next, 1.6);
}

/** Scene mood going up a notch: letters found on the lock, a decision made in the rain. */
export function setLevel(value: number) {
  lv = value;
}

/** Single sounds on top of the mood. */
export function cue(name: 'letter' | 'power', index = 0) {
  if (!ctx || !bus) return;
  const t = ctx.currentTime + 0.02;
  if (name === 'letter') {
    const note = [69, 72, 76, 79, 84][index % 5];
    tone(note, t, { gain: 0.12, dur: 1.7, hall: true });
    tone(note + 12, t, { type: 'sine', gain: 0.05, dur: 1.2, hall: true });
    return;
  }
  drum(t, 40, 0.8, 1.2);
  noise(t, 1.1, 0.07, 'highpass', 2400, 0.8);
  chord([50, 57, 62, 66, 69], t + 0.3, { type: 'sawtooth', gain: 0.05, dur: 3, attack: 0.2, cutoff: 1800, hall: true, spread: 6 });
}

export function startFilm(next: FilmMood) {
  filmOpen = true;
  wokenAt ||= performance.now();
  GESTURES.forEach((type) => removeEventListener(type, wake, true));
  begin(next, 0.5, 0.2);
  ctx!.resume().catch(() => {});
}

/** The shot on air. `loud` is off while dragging the timeline, so it does not fire a stream of hits. */
export function scoreShot(beat: number, loud = true) {
  if (mood === 'ep3' || (filmOpen && !bus)) {
    if (mood === 'ep3' && beat === EP3_SILENT) {
      drop(0.04);
      return;
    }
    if (!bus) begin(mood, 0.8);
  }
  const shot = SCORES[mood].shots?.[beat];
  if (!shot) return;
  const fresh = shot.lv !== lv;
  lv = shot.lv;
  if (!loud || !shot.hit || !ctx) return;
  const t = ctx.currentTime + 0.02;
  if (shot.hit === 'low') {
    drum(t, 44, 0.5, 0.9);
    return;
  }
  drum(t, 36, 0.95, 1.6);
  drum(t, 55, 0.4, 0.6);
  noise(t, 1.1, 0.09, 'lowpass', 1800);
  if (fresh) pad([38, 45, 50, 57], t, 0.07, 2.4, 1400, 0.03);
}

/** The narration ended. EP 04 is cut mid-sentence, so it goes silent for a moment before the sea comes back. */
export function filmFinished(film: FilmMood) {
  if (film === 'ep4') {
    drop(0.03);
    later = window.setTimeout(() => {
      begin(AFTER.ep4, 2);
      lv = 1;
    }, 2400);
    return;
  }
  begin(AFTER[film], 2.5);
}

export function endFilm() {
  filmOpen = false;
  begin(scene, 1.2, 0.3);
}

export function pauseScore() {
  heldByFilm = true;
  ctx?.suspend().catch(() => {});
}

export function resumeScore() {
  heldByFilm = false;
  ctx?.resume().catch(() => {});
}

if (import.meta.env.DEV) (window as unknown as { __score: () => object }).__score = () => ({ mood, scene, filmOpen, lv, playing: !!bus });
