import { FONT_REGISTRY, TEMPLATE_REGISTRY, getTemplateList, renderTemplateFront, renderTemplateBack } from "./templates.js";

const W = 650;
const H = 1004;
const EXPECTED_NUMBERS = [
  ...Array.from({ length: 11 }, (_, i) => i + 1),
  ...Array.from({ length: 35 }, (_, i) => i + 14),
];
const KNOWN_EXTRAS = new Set(["schoolName", "signatureImage", "trumpOptions"]);
const KNOWN_BACK_STYLES = new Set(["center", "diagonal", "pattern", "pattern45"]);

const failures = [];
const warnings = [];
const pass = (condition, message) => {
  if (!condition) failures.push(message);
};

function makeGradient() {
  return { addColorStop() {} };
}

function makeContextStub() {
  const fixed = {
    createLinearGradient: makeGradient,
    createRadialGradient: makeGradient,
    measureText: (text) => ({ width: String(text ?? "").length * 10 }),
    isPointInPath: () => false,
  };
  return new Proxy(fixed, {
    get(target, prop) {
      if (prop in target) return target[prop];
      if (typeof prop === "symbol") return undefined;
      return () => {};
    },
    set() {
      return true;
    },
  });
}

function makeEnv(template) {
  const c = {
    name: "QA SAMPLE",
    schoolName: "QA HIGH SCHOOL",
    trumpSuit: "heart",
    trumpRank: "A",
    trumpSuitColor: "auto",
    trumpRankColor: "auto",
    group: "IVE",
    element: "#E7C68E",
    text: "#F5E5C2",
    background: "auto",
    stroke: "#FFFFFF",
    strokeWidth: 1,
    shadow: true,
    logoOutline: true,
    logoShadow: true,
    fx: 50,
    fy: 50,
    zoom: 100,
    ...template.defaults,
  };
  const ctx = makeContextStub();
  return {
    ctx,
    W,
    H,
    R: 28,
    c,
    signatureImage: null,
    fillRound() {},
    photoRect() {},
    subjectRect() {},
    punchRoundRect() {},
    ribbonFrame() {},
    async logo() {},
    async backLogo() {},
    name() {},
    backBase() {},
    signature() {},
  };
}

const fonts = new Set(FONT_REGISTRY.map((x) => x.name));
const templates = getTemplateList();

pass(templates.length === 46, `Expected 46 templates, found ${templates.length}`);
pass(new Set(templates.map((x) => x.id)).size === templates.length, "Template IDs must be unique");
pass(new Set(templates.map((x) => x.label)).size === templates.length, "Template labels must be unique");

const actualNumbers = templates
  .map((x) => Number.parseInt(x.label, 10))
  .sort((a, b) => a - b);
pass(
  JSON.stringify(actualNumbers) === JSON.stringify(EXPECTED_NUMBERS),
  `Template numbering mismatch. expected=${EXPECTED_NUMBERS.join(",")} actual=${actualNumbers.join(",")}`
);

for (const t of templates) {
  const d = t.defaults ?? {};
  pass(Boolean(t.id), "Template with missing id");
  pass(Boolean(t.label), `${t.id}: missing label`);
  pass(Boolean(t.front) && Boolean(t.back), `${t.label}: missing front/back renderer key`);
  pass(fonts.has(d.font), `${t.label}: unknown default font "${d.font}"`);

  for (const [key, min, max] of [
    ["textX", 0, W],
    ["textY", 0, H],
    ["frontLogoX", 0, W],
    ["frontLogoY", 0, H],
    ["backLogoX", 0, W],
    ["backLogoY", 0, H],
    ["fontSize", 12, 90],
    ["frontLogoScale", 40, 200],
    ["backLogoScale", 40, 200],
  ]) {
    const value = d[key];
    pass(Number.isFinite(value) && value >= min && value <= max, `${t.label}: ${key}=${value} outside ${min}..${max}`);
  }

  pass(KNOWN_BACK_STYLES.has(d.backStyle), `${t.label}: unknown backStyle "${d.backStyle}"`);
  for (const extra of t.extras ?? []) {
    pass(KNOWN_EXTRAS.has(extra), `${t.label}: unknown extra field "${extra}"`);
  }

  if (d.textX < 40 || d.textX > W - 40) warnings.push(`${t.label}: textX is close to card edge`);
  if (d.textY < 35 || d.textY > H - 35) warnings.push(`${t.label}: textY is close to card edge`);

  const env = makeEnv(t);
  try {
    await renderTemplateFront(t.id, env);
  } catch (error) {
    failures.push(`${t.label}: front render smoke failed — ${error?.stack || error}`);
  }
  try {
    await renderTemplateBack(t.id, env);
  } catch (error) {
    failures.push(`${t.label}: back render smoke failed — ${error?.stack || error}`);
  }

  pass(TEMPLATE_REGISTRY[t.id] === t, `${t.label}: registry/list object mismatch`);
}

console.log(`Template QA: ${templates.length} templates, ${templates.length * 2} renderer smoke checks`);
if (warnings.length) {
  console.log("\nWarnings:");
  for (const warning of warnings) console.log(`- ${warning}`);
}

if (failures.length) {
  console.error(`\nFAILED (${failures.length})`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("\nPASS — registry, defaults, numbering and all front/back renderers are healthy.");
