// International professional standards alignment — CIDESCO / CIBTAC / VTCT / NVQ / HABIA / WHO / EU / ISO
// This layer adds breadth + depth without rewriting the 36 modules: every course + module
// is tagged to the global frameworks trainers are expected to teach to.

const INTERNATIONAL_STANDARDS = [
  { code: 'CIDESCO', body: 'CIDESCO International', focus: 'Facial, body, hair — anatomy, hygiene, consultation, ethics; global employer benchmark' },
  { code: 'CIBTAC', body: 'CIBTAC / BABTAC', focus: 'End-to-end treatment evidence, safe practice, client care, business conduct' },
  { code: 'VTCT / NVQ L2–L3', body: 'VTCT & NVQ Levels 2–3 (HABIA NOS)', focus: 'UK National Occupational Standards: cutting, colour, facials, health & safety, consultation' },
  { code: 'HABIA NOS', body: 'HABIA National Occupational Standards', focus: 'Consult, assess, perform, evaluate, aftercare — the consult→plan→perform→review spine used in every module' },
  { code: 'WHO IPC', body: 'WHO Infection Prevention & Control', focus: 'Hand hygiene 5 moments, cleaning→disinfection→sterilisation, laundry 60°C+, sharps + blood protocol' },
  { code: 'EU 1223/2009', body: 'EU Cosmetics Regulation + PPD/allergy law', focus: '48-hr skin / allergy alert testing, PPD warnings, product labelling (PAO, INCI), ventilation' },
  { code: 'ISO 22716 GMP', body: 'ISO 22716 Cosmetics GMP', focus: 'Decant discipline, single-use spatulas, batch/expiry control, storage — no finger-dipping, no topping-up' },
  { code: 'Fitzpatrick I–VI', body: 'Fitzpatrick + barrier gating', focus: 'Tone-aware heat / acid / laser thresholds, PIH risk control, test-patch 48 h on V–VI + reactive skin' },
];

const COURSE_STANDARDS = {
  hair: ['CIDESCO', 'CIBTAC', 'VTCT / NVQ L2–L3', 'HABIA NOS', 'WHO IPC', 'Fitzpatrick I–VI'],
  skin: ['CIDESCO', 'CIBTAC', 'VTCT / NVQ L2–L3', 'HABIA NOS', 'WHO IPC', 'EU 1223/2009', 'ISO 22716 GMP', 'Fitzpatrick I–VI'],
  chemical: ['CIDESCO', 'CIBTAC', 'VTCT / NVQ L2–L3', 'HABIA NOS', 'WHO IPC', 'EU 1223/2009', 'ISO 22716 GMP', 'Fitzpatrick I–VI'],
};

// Golden safety rules shown on every module (trainer reads aloud in class).
const SAFETY_GOLDEN_RULES = [
  'Patch / strand test every time — 48-hr skin test for tints, strand test for lightener/perm/relaxer. No test, no service.',
  'RAG triage: RED (refuse + refer — lice, tinea, impetigo, open wounds, severe inflammation, allergy) · AMBER (adapt with consent) · GREEN (proceed).',
  'Cleaning → disinfection (full label contact time) → sterilisation where skin is punctured. 60°C+ laundry, covered storage.',
  'Ventilation + PPE: nitrile gloves, eye protection for lightener/spray, fresh-air exchange when mixing.',
];

const CLASSROOM_FLOW = [
  { phase: 'Set up', mins: '5 min', what: 'Trainer states objectives + standards tag + safety rule on screen. Volunteers / mannequin ready.' },
  { phase: 'Demonstrate', mins: '15 min', what: 'Trainer performs live demo using Visual demo steps + 3D Lab on projector. Narrate every decision.' },
  { phase: 'Classroom activity', mins: '20 min', what: 'Whole-class guided task (see activity card). Trainer cold-calls, pairs discuss, front row demonstrates.' },
  { phase: 'Knowledge check', mins: '10 min', what: 'Oral quiz on screen — hands up, no devices. Trainer reveals explanations after each vote.' },
  { phase: 'Salon application', mins: '5 min', what: 'Trainer assigns in-salon practice + rubric as homework. Recap 3 takeaways.' },
];

module.exports = { INTERNATIONAL_STANDARDS, COURSE_STANDARDS, SAFETY_GOLDEN_RULES, CLASSROOM_FLOW };
