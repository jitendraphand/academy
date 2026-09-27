// CHEMICAL SERVICES — 12 weeks · colour + texture, safety-first
module.exports = {
  id: 'chemical',
  title: 'Chemical Services',
  tagline: 'Colour • Bleach • Perm • Straightening — chemistry with care',
  color: '#db2777',
  icon: '⚗️',
  level: 'Intermediate (Hair base advised)',
  duration: '12 weeks · 2–3 hrs/week · ~30 hrs',
  image: 'chemical',
  description: `The high-risk, high-reward course: salon chemistry (pH, oxidation), consultation and hair analysis for chemicals, perm science and wrapping, relaxers/keratin, colour categories and developers, lightening, foiling/balayage/corrective, neutralising and toning, ventilation/PPE/adverse-reaction drills, aftercare and troubleshooting. Prerequisite advised: Hair Weeks 1–4 or equivalent.`,
  outcomes: [
    'Explain pH, oxidation and patch/strand testing like a pro',
    'Choose perm vs relaxer vs keratin by hair history + elasticity',
    'Formulate roots/retouch/grey and lift + tone to target',
    'Work ventilated, gloved and documented every time',
    'Plan aftercare that prevents breakage and rebooks'
  ],
  threeDTheme: 'chem',
  modules: [
    {
      title: 'Salon Chemistry: pH, Oxidation & Safety Mindset',
      weekLabel: 'Week 1', hours: '2.5 hrs',
      objectives: ['Explain pH 0–14 + hair ~4.5–5.5', 'Describe oxidation-reduction in tint/perm', 'Read SDS + labels + store safely', 'Adopt patch/strand non-negotiables'],
      theory: `<p><b>pH:</b> 0 acid → 7 neutral → 14 alkaline. Hair/skin ~4.5–5.5. Alkaline (ammonia/MEA, relaxers pH 12–14) swells/opens cuticle; acid (conditioners, neutralisers ~pH 3–5) closes/seals. Wrong pH = damage.</p><p><b>Oxidation:</b> developer (H₂O₂) + tint/perm chemistry = colour/ curl change; needs correct ratio + time. More vol/heat ≠ better — it = more damage.</p><p><b>Safety:</b> inventory + labels, cool/dark storage, recap now, gloves (powder-free, right size), no food near chemicals, ventilate mixing zone, clean spills, dusty bleach = mask + gentle handling. PPD allergy is lifelong — respect patch tests.</p>`,
      visualSteps: [
        { e: '📊', t: 'pH strip demo — shampoo vs tint vs relaxer vs conditioner' },
        { e: '⚗️', t: 'Oxidation — mix dot, watch colour develop with timer' },
        { e: '🧤', t: 'PPE — gloves + apron + ventilation, no bare-hand tint' },
        { e: '🏷️', t: 'Label + store — name, vol, date opened, cool dark shelf' },
        { e: '🧪', t: 'Pledge — no test, no chemical (48h skin + strand)' }
      ],
      activity: { type: 'mixer', title: 'pH Sort', instructions: 'Place each product on the scale.', items: [['Relaxer', 'pH 12–14 alkaline'], ['Tint with ammonia', 'pH 9–11 alkaline'], ['Hair natural', 'pH 4.5–5.5'], ['Conditioner/neutraliser', 'pH 3–5 acidic']] },
      threeD: { type: 'chem', title: '3D Lab: pH Scale Tower', description: 'Climb the tower 0→14: watch cuticle open (alkaline) vs seal (acid). Hair lives at 4.5–5.5.' },
      quiz: [
        { q: 'Hair natural pH ~', options: ['4.5–5.5', '10–12', '7 exactly', '1–2'], answer: 0, explain: 'Slightly acidic.' },
        { q: 'Alkaline does:', options: ['Opens/swells cuticle', 'Seals cuticle', 'Nothing', 'Cools'], answer: 0, explain: 'Entry for chemicals.' },
        { q: 'Developer drives:', options: ['Oxidation', 'Cooling', 'Drying', 'Cutting'], answer: 0, explain: 'Chemical change engine.' },
        { q: 'PPD allergy is:', options: ['Lifelong', 'One-day', 'Imaginary', 'Curable by more dye'], answer: 0, explain: 'Once sensitised, always.' },
        { q: 'Mixing zone needs:', options: ['Ventilation', 'Candles', 'Food', 'Carpet'], answer: 0, explain: 'Fumes + dust control.' }
      ],
      practical: { title: 'In-salon: Chemistry Shelf Audit', task: 'Inventory your backwash: list 10 chemicals with pH/vol, check labels/dates/storage/ventilation. Photograph before/after tidy.', outcome: 'Safe, labelled chemical zone.', checklist: ['10 items logged', 'Dates + storage fixed', 'Photo filed'] }
    },
    {
      title: 'Chemical Consultation & Hair Analysis',
      weekLabel: 'Week 2', hours: '2.5 hrs',
      objectives: ['Take chemical history (box dye, henna, keratin, metals)', 'Test porosity/elasticity/density for chemical choice', 'Do + record skin + strand tests', 'Say no + offer safe alternatives'],
      theory: `<p><b>History is everything:</b> box black? henna/metallic? recent keratin/relaxer? meds/pregnancy? Prior DIY + incompatibilities (henna + bleach, relaxer + bleach) can melt hair — strand test reveals.</p><p><b>Analysis for chemicals:</b> porosity (float + feel), elasticity (wet stretch — gummy = no-go), density/texture (fine + porous = lower vol/weaker solution), scalp state (broken = postpone).</p><p><b>Tests:</b> skin 48h (behind ear, no cheating) + strand (mix + time + result + photo). Document formula + result; get signed consent with honest outcome + price + maintenance.</p>`,
      visualSteps: [
        { e: '📜', t: 'History — every chemical 2 years back, box/henna flagged' },
        { e: '💧', t: 'Porosity + elasticity — float + wet stretch, record' },
        { e: '🧪', t: 'Skin test 48h + strand test with timer + photo' },
        { e: '🤝', t: 'Consent — realistic result + maintenance + price, signed' },
        { e: '🚫', t: 'No-go script — kind refusal + safe alternative + rebook' }
      ],
      activity: { type: 'scenario', title: 'Go / Caution / No-Go', instructions: 'Judge each history.', items: [['Box black 2 weeks ago, wants platinum today', 'NO-GO — strand + stage plan'], ['Henna last month, wants bleach', 'NO-GO — incompatibility risk'], ['Healthy virgin, wants 2-level lift', 'GO with tests'], ['Gummy elasticity, wants perm', 'NO-GO — protein + trim plan']] },
      threeD: { type: 'hair', title: '3D Lab: Strand Under Stress', description: 'Stretch the strand: healthy snap-back vs gummy over-processed. Your stretch test predicts breakage.' },
      quiz: [
        { q: 'Most critical history:', options: ['Box dye/henna/keratin', 'Favourite music', 'Shoe size', 'Lunch'], answer: 0, explain: 'Incompatibility risks.' },
        { q: 'Gummy wet stretch =', options: ['Postpone chemicals', 'Proceed stronger', 'Add heat', 'Fine'], answer: 0, explain: 'Broken bonds warning.' },
        { q: 'Skin test window:', options: ['48h', '5 min', 'After service', 'Never'], answer: 0, explain: 'Allergy lag.' },
        { q: 'Strand test shows:', options: ['Timing + result + condition', 'Nothing', 'Price', 'Gossip'], answer: 0, explain: 'Predicts outcome.' },
        { q: 'Broken scalp + chemical:', options: ['Postpone', 'Proceed', 'Scrub first', 'Double dose'], answer: 0, explain: 'Absorption + pain risk.' }
      ],
      practical: { title: 'In-salon: 5 Chemical Consults', task: 'Five chemical consultations with history + analysis + skin/strand where indicated. Log decisions (go/caution/no-go).', outcome: 'Consultation discipline that prevents disasters.', checklist: ['5 consults', 'Tests where needed', 'Decisions logged'] }
    },
    {
      title: 'Perm Science: Acid, Alkaline & Neutral',
      weekLabel: 'Week 3', hours: '2.5 hrs',
      objectives: ['Explain disulphide break + reform simply', 'Choose acid vs alkaline vs exothermic by hair', 'List rods/papers/solutions + neutraliser role', 'Time + rinse precisely'],
      theory: `<p><b>Perm = break + rebuild disulphide bonds:</b> waving lotion (thio, alkaline pH) softens → rods shape → neutraliser (acidic oxidiser) locks. Timing + rod size + tension = curl.</p><p><b>Types:</b> Alkaline (strong, resistant/coarse, tighter curl, more swelling) • Acid (gentler, damaged/tinted, softer curl, needs heat) • Exothermic/neutral (modern, low odour, balanced). Previously bleached/high-porous = extreme caution or no perm.</p><p><b>Tools:</b> rods (small=tight), end papers (prevent fish-hooks), tail comb, timer, cotton + barrier cream, neutraliser measured. Rinse 5+ min before neutralise; neutralise full time or curl drops.</p>`,
      visualSteps: [
        { e: '🔗', t: 'Bonds — lotion breaks, rods shape, neutraliser locks' },
        { e: '🧫', t: 'Choose — resistant=alkaline, damaged=acid/caution' },
        { e: '🎢', t: 'Rod map — size + tension + papers, no fish-hooks' },
        { e: '🚿', t: 'Rinse 5+ min — lukewarm, blot, then neutralise full time' },
        { e: '⏱️', t: 'Time — check one rod at ¾, never guess' }
      ],
      activity: { type: 'cards', title: 'Perm Picker', instructions: 'Match hair to solution.', items: [['Coarse resistant virgin', 'Alkaline'], ['Tinted, slightly porous', 'Acid gentle'], ['Bleached fragile', 'No perm / treatment plan'], ['Fine normal', 'Neutral/exothermic']] },
      threeD: { type: 'chem', title: '3D Lab: Bonds Break & Lock', description: 'Watch S–S bonds open (lotion) then re-link around the rod (neutraliser). Timing is the lock.' },
      quiz: [
        { q: 'Perm reshapes:', options: ['Disulphide bonds', 'Water only', 'Colour molecules', 'Nothing'], answer: 0, explain: 'Sulphur bridges.' },
        { q: 'Neutraliser is:', options: ['Acidic oxidiser, full time', 'Optional rinse', 'Shampoo', 'Oil'], answer: 0, explain: 'Locks the curl.' },
        { q: 'Small rods give:', options: ['Tighter curl', 'Straighter', 'No curl', 'Colour'], answer: 0, explain: 'Diameter = curl.' },
        { q: 'Rinse before neutralise:', options: ['5+ min lukewarm', 'Quick splash', 'Hot blast', 'Skip'], answer: 0, explain: 'Removes lotion fully.' },
        { q: 'Bleached fragile + perm:', options: ['Avoid / treat first', 'Strongest lotion', 'Double time', 'Heat max'], answer: 0, explain: 'Breakage certainty.' }
      ],
      practical: { title: 'In-salon: Rod Wrapping Drill', task: 'On mannequin: full-head wrap (bricklay) with papers, even tension, no fish-hooks. Timed, photographed. Mentor checks.', outcome: 'Clean, even wrap ready for solution (supervised).', checklist: ['Full wrap', 'No fish-hooks', 'Photo + time'] }
    },
    {
      title: 'Perm Techniques: Bricklay, Spiral & Finishing',
      weekLabel: 'Week 4', hours: '3 hrs',
      objectives: ['Wrap bricklay + spiral + piggyback neatly', 'Control processing with test curls', 'Neutralise + remove without frizz', 'Style + aftercare perm correctly'],
      theory: `<p><b>Patterns:</b> Bricklay (staggered, natural) • Spiral (long hair, vertical rods, defined) • Piggyback/double-rod (short-to-long blend). Base size = rod diameter + hair length; over-direct for volume.</p><p><b>Processing:</b> cotton + barrier, timer, test curl (unwind one rod at ¾ — S-shape holds = ready). Rinse rods-in 5 min → blot → neutralise 5+5 (apply, wait, reapply) → rods-out rinse → condition.</p><p><b>Aftercare:</b> no shampoo 48h, sulphate-free, wide-tooth, protein/moisture balance, heat low. Document lotion + rods + time.</p>`,
      visualSteps: [
        { e: '🧱', t: 'Bricklay — stagger bases, even tension' },
        { e: '🌀', t: 'Spiral — vertical, even winding for long hair' },
        { e: '👁️', t: 'Test curl — S-hold at ¾ time' },
        { e: '🔒', t: 'Neutralise 5+5 — lock, remove, rinse' },
        { e: '🌊', t: 'Finish — diffuse, scrunch, 48h no-wash card' }
      ],
      activity: { type: 'checklist', title: 'Wrap Quality Score', instructions: 'Score your mannequin wrap 1–5 each.', items: ['Tension even', 'Papers smooth, no fish-hooks', 'Bases staggered (bricklay)', 'Rods secure, scalp comfortable', 'Time logged'] },
      threeD: { type: 'chem', title: '3D Lab: Wrap Patterns', description: 'Compare bricklay vs spiral rod maps: see curl direction + volume vectors.' },
      quiz: [
        { q: 'Test curl checks:', options: ['S-shape at ¾ time', 'Colour', 'Smell', 'Price'], answer: 0, explain: 'Processing gauge.' },
        { q: 'Neutralise style:', options: ['5+5 with reapply', '10-sec rinse', 'Skip', 'Shampoo hard'], answer: 0, explain: 'Full lock.' },
        { q: 'After perm avoid:', options: ['Shampoo 48h', 'Conditioner ever', 'Combing ever', 'Water ever'], answer: 0, explain: 'Let bonds settle.' },
        { q: 'Spiral suits:', options: ['Long hair, defined curl', 'Buzz cuts', 'No hair', 'Straightening'], answer: 0, explain: 'Vertical length.' },
        { q: 'Fish-hooks from:', options: ['Bad papers/tension', 'Good technique', 'Rods', 'Water'], answer: 0, explain: 'Ends bent wrong.' }
      ],
      practical: { title: 'In-salon: Pattern Wraps x2', task: 'Two mannequin wraps: bricklay + spiral. Photos + times + mentor grade.', outcome: 'Two pattern wraps to standard.', checklist: ['2 wraps', 'Photos', 'Grade ≥7/10'] }
    },
    {
      title: 'Relaxers, Keratin & Straightening Choices',
      weekLabel: 'Week 5', hours: '2.5 hrs',
      objectives: ['Compare NaOH vs thio vs keratin/cysteine', 'Do virgin vs retouch relaxer safely', 'Flat-iron + neutralise to standard', 'Maintain protein/moisture after'],
      theory: `<p><b>Relaxers:</b> Sodium hydroxide (lye, strong, resistant) • Thio/ammonium thioglycolate (milder, tinted/delicate) • Keratin/cysteine smoothing (frizz-taming, not bone-straight, formaldehyde-aware ventilation). All demand strand + scalp checks.</p><p><b>Technique:</b> barrier cream + base scalp, virgin (1 cm from scalp → lengths, then scalp last) vs retouch (new growth only, no overlap — overlap = breakage), smooth with back of comb (no scratching), time strictly, rinse 5+ min, neutralise/shampoo per brand, condition.</p><p><b>After:</b> protein + moisture rotation, low heat, silk/satin night, 6–12 wk retouch only. Chemical haircut (over-processed snap) = honest trim plan.</p>`,
      visualSteps: [
        { e: '🧴', t: 'Protect — barrier + base, gloves, ventilation' },
        { e: '🗺️', t: 'Map — virgin vs retouch, no overlap plan' },
        { e: '🪮', t: 'Smooth — back-of-comb, no scratch, timer' },
        { e: '🚿', t: 'Rinse 5+ + neutralise/shampoo full time' },
        { e: '💧', t: 'Balance — protein/moisture plan + retouch date' }
      ],
      activity: { type: 'scenario', title: 'Straightening Calls', instructions: 'Choose correctly.', items: [['Resistant virgin, wants sleek', 'NaOH virgin, strand-tested'], ['Tinted delicate, wants loosen', 'Thio gentle / keratin option'], ['Overlap on previously relaxed', 'FORBIDDEN — retouch only'], ['Gummy + wants relaxer', 'No-go — treatment + trim']] },
      threeD: { type: 'chem', title: '3D Lab: Overlap Danger', description: 'See overlap zone weaken: double-processed band glows red — the breakage point.' },
      quiz: [
        { q: 'Retouch rule:', options: ['New growth only', 'Whole head', 'Ends only', 'Random'], answer: 0, explain: 'Overlap breaks.' },
        { q: 'Scalp protection:', options: ['Barrier/base cream', 'Scratch to absorb', 'Nothing', 'Oil fire'], answer: 0, explain: 'Chemical burn prevention.' },
        { q: 'Strongest relaxer:', options: ['Sodium hydroxide', 'Conditioner', 'Water', 'Serum'], answer: 0, explain: 'Lye, resistant hair.' },
        { q: 'Keratin smoothing mainly:', options: ['Tames frizz, not bone-straight', 'Permanently straightens all', 'Colours', 'Cuts'], answer: 0, explain: 'Manage expectations.' },
        { q: 'After relaxer need:', options: ['Protein/moisture balance', 'Bleach soon', 'Daily heat max', 'Nothing'], answer: 0, explain: 'Strength + elasticity.' }
      ],
      practical: { title: 'In-salon: Relaxer Assists x2', task: 'Assist 2 relaxer/keratin services: protect, time, rinse, aftercare card. No solo until signed off.', outcome: 'Supervised straightening competence.', checklist: ['2 assists', 'Cards filed', 'Mentor feedback'] }
    },
    {
      title: 'Colour Categories, Developers & Grey Logic',
      weekLabel: 'Week 6', hours: '2.5 hrs',
      objectives: ['Explain temp/semi/demi/permanent + lighteners', 'Pick 10/20/30/40 vol correctly', 'Formulate resistant grey (N + fashion)', 'Document formulas flawlessly'],
      theory: `<p><b>Categories:</b> Temporary (coats, 1 wash) • Semi (stains, 4–8 washes, no developer) • Demi (deposit + blend grey, low vol) • Permanent (lift + deposit, full vol, covers grey) • Lighteners/bleach (lift only, then tone).</p><p><b>Developers:</b> 10 (deposit/darken) • 20 (1–2 lift, grey) • 30 (2–3 lift) • 40 (max, high risk). <b>Grey:</b> N base required (e.g. 7N + 7.3), 20vol, full time, fine sections; resistant = pre-soften per brand.</p><p><b>Formula card:</b> brand + shade + vol + ratio + time + result + photo. No card = no rebook.</p>`,
      visualSteps: [
        { e: '🎨', t: 'Sort — temp/semi/demi/perm/bleach by box + vol' },
        { e: '🧪', t: 'Pick vol — deposit 10, grey 20, lift 30 (40 rare)' },
        { e: '⚖️', t: 'Weigh — ratio exact, label bowl' },
        { e: '👵', t: 'Grey — N + fashion, fine sections, full time' },
        { e: '📝', t: 'Card — full formula + photo' }
      ],
      activity: { type: 'mixer', title: 'Vol Picker', instructions: 'Match job to vol.', items: [['Deposit darker + shine', '10 vol'], ['Grey coverage, 1–2 lift', '20 vol'], ['2–3 lift blonding', '30 vol'], ['On-scalp max lift', '40 vol — caution only']] },
      threeD: { type: 'chem', title: '3D Lab: Lift Ladder', description: 'Climb vols: higher = more lift + more damage. Grey needs N ballast to stick.' },
      quiz: [
        { q: 'Demi is:', options: ['Deposit + blend grey, low vol', 'Bleach', 'Temporary spray', 'No chemical'], answer: 0, explain: 'Gentle deposit.' },
        { q: 'Grey coverage vol ~', options: ['20 vol', '40 vol always', 'Water', 'No vol'], answer: 0, explain: 'Standard.' },
        { q: 'N in grey mix:', options: ['Fills lack of pigment', 'Adds fashion only', 'Lightens', 'Nothing'], answer: 0, explain: 'Coverage ballast.' },
        { q: '40 vol is:', options: ['Max lift, high risk', 'Gentle daily', 'Conditioner', 'Toner'], answer: 0, explain: 'Rare + cautious.' },
        { q: 'Formula card needs:', options: ['All details + photo', 'Nothing', 'Price only', 'Memory'], answer: 0, explain: 'Reproducibility.' }
      ],
      practical: { title: 'In-salon: Grey Formulation Drill', task: 'Formulate (mock) 3 grey cases: 30%, 70%, 100% resistant. Weigh, label, mentor-check. Observe one real grey service.', outcome: 'Grey logic fluency.', checklist: ['3 mocks weighed', '1 observed', 'Cards filed'] }
    },
    {
      title: 'Lightening & Bleaching to Target',
      weekLabel: 'Week 7', hours: '3 hrs',
      objectives: ['Read undercoats (red→orange→yellow→pale)', 'Lift in stages with bond care', 'Protect scalp (off-scalp vs on-scalp rules)', 'Decide when to stop + rebook'],
      theory: `<p><b>Stages:</b> 1–4 red → 5–6 orange → 7 yellow → 8–10 pale yellow (tonable). Dark bases need stages across visits — one-day platinum from black box = breakage.</p><p><b>Rules:</b> off-scalp (foils/balayage) safer than on-scalp; 20/30vol + patience beats 40 + fry; bond builder per brand; elasticity checks every 15 min; scalp barrier + no overlapping lightener; cool rinse + protein + tone.</p><p><b>Stop signs:</b> gummy, smoking, pain → rinse now, treat, rebook. Honest staging keeps hair on heads.</p>`,
      visualSteps: [
        { e: '🟥', t: 'Map — natural level → target → stages count' },
        { e: '🥣', t: 'Mix — fresh (loses power), 20/30vol, bond additive' },
        { e: '👁️', t: 'Watch — 15-min checks + elasticity pulls' },
        { e: '🛑', t: 'Stop — gummy/pain = rinse + treat' },
        { e: '💜', t: 'Tone — only on pale enough base' }
      ],
      activity: { type: 'cards', title: 'Undercoat Reader', instructions: 'Name the stage + next move.', items: [['Orange (level 6)', 'Keep lifting / low + slow'], ['Yellow (level 7–8)', 'Almost — continue gently'], ['Pale yellow (9–10)', 'Tone now'], ['Gummy + pale', 'Stop — treat + rebook']] },
      threeD: { type: 'chem', title: '3D Lab: Lift Stages Tunnel', description: 'Travel the tunnel red→pale. Toner doors open only at pale yellow.' },
      quiz: [
        { q: 'Tonable base ~', options: ['Pale yellow 9–10', 'Orange 6', 'Red 4', 'Black 1'], answer: 0, explain: 'Toner refines, not lifts.' },
        { q: 'Safer than on-scalp:', options: ['Off-scalp foils/balayage', '40vol scalp', 'Overlap bleach', 'Heat max'], answer: 0, explain: 'Scalp + control.' },
        { q: 'Fresh bleach because:', options: ['Loses power with time', 'Tastes better', 'Colour nicer', 'No reason'], answer: 0, explain: 'Mix fresh per application.' },
        { q: 'Gummy mid-lift =', options: ['Rinse + treat + rebook', 'Add more + heat', 'Ignore', 'Tone over'], answer: 0, explain: 'Breakage stop.' },
        { q: 'Stages from black to platinum:', options: ['Multiple visits', 'One hour', 'One wash', 'No stages'], answer: 0, explain: 'Integrity first.' }
      ],
      practical: { title: 'In-salon: Lift Observation + Strand Lifts', task: 'Observe one real lightening + do 3 strand tests (different vols/times) with photos + elasticity notes.', outcome: 'Lift judgement + patience.', checklist: ['1 observed', '3 strands', 'Photos + notes'] }
    },
    {
      title: 'Dimensional Colour: Foils, Balayage & Corrective',
      weekLabel: 'Week 8', hours: '3 hrs',
      objectives: ['Weave/slice + saturate + brick-lay', 'Paint feathered balayage + blend', 'Plan corrective (fill + neutralise + recolour)', 'Price + time long services'],
      theory: `<p><b>Foils:</b> weave (soft) / slice (bold), saturation edge-to-edge, seal, brick-lay, check 10-min. <b>Balayage:</b> feathered V, mid-lengths→ends, open-air slower, blend zone with fingers/brush.</p><p><b>Corrective:</b> diagnose (bands, brass, over-lift) → fill missing undercoat when going darker (copper/gold filler) → neutralise → target shade → bond + trim plan. Always strand-test corrective; charge consult + stages honestly.</p>`,
      visualSteps: [
        { e: '🥈', t: 'Foil — weave/slice, saturate, seal, stagger' },
        { e: '🖌️', t: 'Balayage — feather, V, blend zone' },
        { e: '🔍', t: 'Corrective dx — bands/brass/porosity map' },
        { e: '🧱', t: 'Fill then colour — missing undercoat first when darkening' },
        { e: '💰', t: 'Quote — time + stages + maintenance, signed' }
      ],
      activity: { type: 'scenario', title: 'Corrective Calls', instructions: 'Pick the plan.', items: [['Banded bleach, wants even blonde', 'Strand + stage lift + tone, no overlap'], ['Bleached white, wants dark brown', 'Fill copper/gold then target'], ['Brassy orange, wants ash', 'Lift sufficient then blue toner'], ['Green tinge (pool)', 'Clarify + warm fill + re-tone']] },
      threeD: { type: 'chem', title: '3D Lab: Dimension Map', description: 'Light vs depth foils create 3D movement. Corrective fills rebuild the missing floor before painting.' },
      quiz: [
        { q: 'Going darker on bleached needs:', options: ['Fill first', 'Bleach more', 'Toner only', 'Nothing'], answer: 0, explain: 'Missing warmth causes muddy fade.' },
        { q: 'Brick-lay prevents:', options: ['Harsh lines', 'Lift', 'Toning', 'Drying'], answer: 0, explain: 'Stagger diffuses.' },
        { q: 'Balayage grow-out is:', options: ['Soft/low maintenance', 'Harsh line', 'No grow-out', 'Weekly'], answer: 0, explain: 'Feathered root.' },
        { q: 'Corrective first step:', options: ['Diagnose + strand test', 'Apply darkest', 'Bleach all', 'Guess'], answer: 0, explain: 'Plan before chemicals.' },
        { q: 'Overlap lightener:', options: ['Forbidden', 'Encouraged', 'Speeds', 'Tones'], answer: 0, explain: 'Breakage + bands.' }
      ],
      practical: { title: 'In-salon: Mannequin Dimension', task: '10 foils + balayage panel + corrective fill demo (darker) on mannequin. Photos + formulas.', outcome: 'Dimensional + corrective basics.', checklist: ['Foils + balayage', 'Fill demo', 'Formulas filed'] }
    },
    {
      title: 'Neutralising, Toning & Glossing',
      weekLabel: 'Week 9', hours: '2.5 hrs',
      objectives: ['Neutralise brass with wheel logic', 'Tone damp 5–20 min visually', 'Gloss for shine + blend', 'Maintain tone with home-care'],
      theory: `<p><b>Wheel:</b> blue kills orange, violet kills yellow, green kills red, blue-violet kills gold. Level must be pale enough — toner on orange = muddy, not ash.</p><p><b>Tone:</b> damp, even, 5–20 min visual (check every 5), cool rinse. <b>Gloss/demi:</b> refresh lengths, blend retouch lines, add shine; acidic seal after.</p><p><b>Maintain:</b> violet/blue shampoo 1x/wk (not daily), sulphate-free, cool wash, heat protectant, re-tone 4–6 wks. Document toner + time + base level.</p>`,
      visualSteps: [
        { e: '🎡', t: 'Wheel — name killer for each brass' },
        { e: '💧', t: 'Damp + even — toner saturates uniformly' },
        { e: '👁️', t: 'Watch — 5-min checks, rinse at target' },
        { e: '✨', t: 'Gloss — demi refresh + acidic seal' },
        { e: '💜', t: 'Maintain — purple 1x/wk + re-tone date' }
      ],
      activity: { type: 'mixer', title: 'Toner Bar', instructions: 'Pick the toner for each base.', items: [['Pale yellow + want ash', 'Violet-ash, 10 min visual'], ['Orange-gold + want neutral', 'Blue, level must lift first'], ['Faded ends + band', 'Demi gloss refresh'], ['Daily purple', 'NO — 1x/wk, can dull']] },
      threeD: { type: 'chem', title: '3D Lab: Toner Window', description: 'Toner lands in a narrow window: too early = grabby, too late = missed. Watch the timer.' },
      quiz: [
        { q: 'Yellow killed by:', options: ['Violet', 'Red', 'Black', 'Orange'], answer: 0, explain: 'Opposite.' },
        { q: 'Tone on:', options: ['Damp, visual 5–20', 'Dry 1 hour', 'Bleach fresh', 'Dirty month'], answer: 0, explain: 'Even + controlled.' },
        { q: 'Toner on orange base gives:', options: ['Muddy, not ash', 'Perfect ash', 'Platinum', 'Black'], answer: 0, explain: 'Lift first.' },
        { q: 'Purple shampoo:', options: ['1x/wk maintenance', 'Daily strong', 'Never', 'As conditioner'], answer: 0, explain: 'Overuse dulls/dries.' },
        { q: 'Gloss mainly:', options: ['Shine + blend + refresh', 'Lift 5 levels', 'Perm', 'Cut'], answer: 0, explain: 'Demi deposit.' }
      ],
      practical: { title: 'In-salon: Tone 2 Mannequins', task: 'Tone 2 pre-lightened mannequins (ash + beige) with timed checks + photos + home-care cards.', outcome: 'Controlled toning.', checklist: ['2 tones timed', 'Photos', 'Cards written'] }
    },
    {
      title: 'Ventilation, PPE & Adverse Reactions',
      weekLabel: 'Week 10', hours: '2.5 hrs',
      objectives: ['Run ventilated, gloved services every time', 'Handle spills, splashes, fumes calmly', 'Spot allergy/burn/breakage early', 'Document incidents + refer'],
      theory: `<p><b>Every service:</b> gloves (change if torn), apron, barrier cream, eye care (no rubbing, rinse station known), ventilation (windows/door + fan, mixing zone clear), no candles near flammables, food/drink away.</p><p><b>Spills/splash:</b> skin — rinse 15 min, remove contaminated clothing; eyes — irrigate 15+ min, seek care; fumes — fresh air, stop service; dust — mask + damp clean (no dry sweeping bleach).</p><p><b>Reactions:</b> itch/burn/blisters (allergy) → remove, cool, document, GP; chemical burn → rinse, cover, refer; breakage/smoke → rinse now, protein + trim plan. Incident log + photos + follow-up call.</p>`,
      visualSteps: [
        { e: '🧤', t: 'PPE — gloves fit, apron, barrier, ventilation on' },
        { e: '👁️', t: 'Eyes/skin — rinse 15 min stations known' },
        { e: '💨', t: 'Fumes — fresh air, pause, dilute' },
        { e: '📝', t: 'Log — what, when, action, referral, follow-up' },
        { e: '📞', t: 'Follow — 24h check-in call' }
      ],
      activity: { type: 'scenario', title: 'Emergency Drill', instructions: 'Choose the safe move.', items: [['Bleach dust cloud', 'Mask + ventilate + damp clean'], ['Tint in eye', 'Irrigate 15+ min + seek care'], ['Client reports burn mid-process', 'Rinse now + assess + log'], ['Torn glove mid-tint', 'Change gloves immediately']] },
      threeD: { type: 'chem', title: '3D Lab: Safe Salon Airflow', description: 'Airflow vectors: fresh in, fumes out. See why mixing by the window + fan matters.' },
      quiz: [
        { q: 'Eye splash:', options: ['Irrigate 15+ min + seek care', 'Rub + continue', 'Add more tint', 'Wait'], answer: 0, explain: 'Dilution + care.' },
        { q: 'Torn glove:', options: ['Change now', 'Tape + continue', 'Remove all PPE', 'Ignore'], answer: 0, explain: 'Barrier integrity.' },
        { q: 'Bleach dust clean:', options: ['Damp, masked, ventilated', 'Dry sweep fast', 'Blow', 'Vacuum face'], answer: 0, explain: 'Avoid airborne.' },
        { q: 'Burn mid-process:', options: ['Rinse now', 'Add heat', 'Wait full time', 'Cover'], answer: 0, explain: 'Stop damage.' },
        { q: 'Always file:', options: ['Incident log + follow-up', 'Nothing', 'Blame', 'Hide'], answer: 0, explain: 'Duty + learning.' }
      ],
      practical: { title: 'In-salon: Safety Drill + Log', task: 'Run a timed spill/splash drill (rinse station, PPE change, ventilation) + file one mock incident log. Mentor signs.', outcome: 'Calm emergency response.', checklist: ['Drill timed', 'Log filed', 'Mentor sign'] }
    },
    {
      title: 'Aftercare, Maintenance & Rebooking',
      weekLabel: 'Week 11', hours: '2.5 hrs',
      objectives: ['Prescribe sulphate-free + protein/moisture rotation', 'Schedule retouch/toner/trim cycles', 'Teach heat + sun + pool protection', 'Rebook before client leaves'],
      theory: `<p><b>After chemical:</b> sulphate-free + colour-safe, lukewarm wash, protein (strength) ↔ moisture (elasticity) rotation, leave-in + heat protectant, wide-tooth, silk night.</p><p><b>Cycles:</b> tint retouch 4–6 wks • toner 4–6 wks • perm/relaxer retouch 8–12 wks (new growth only) • trim 6–8 wks • treatment 2–4 wks. Sun/pool: hat + UV spray + pre-wet + clarifying after.</p><p><b>Retail 3:</b> shampoo + conditioner + one hero (mask/oil/protectant). Demo, sachet, 48h message: “How’s the colour settling?”</p>`,
      visualSteps: [
        { e: '🧴', t: 'Prescribe — 3 items, demo on client' },
        { e: '📅', t: 'Cycle — retouch/toner/trim dates booked' },
        { e: '🏖️', t: 'Protect — heat + sun + pool rules card' },
        { e: '💬', t: 'Follow — 48h message + review prompt' },
        { e: '🔁', t: 'Rotate — protein ↔ moisture by stretch test' }
      ],
      activity: { type: 'cards', title: 'Cycle Planner', instructions: 'Match service to revisit.', items: [['Tint retouch', '4–6 wks'], ['Toner refresh', '4–6 wks'], ['Relaxer retouch', '8–12 wks'], ['Trim', '6–8 wks']] },
      threeD: { type: 'chem', title: '3D Lab: Fibre Recovery', description: 'Protein patches + moisture floods rebuild the fibre over weeks. One wash never fixes.' },
      quiz: [
        { q: 'Chemical home shampoo:', options: ['Sulphate-free colour-safe', 'Clarifying daily', 'Soap bar', 'Any'], answer: 0, explain: 'Preserves tone + lipids.' },
        { q: 'Protein ↔ moisture by:', options: ['Stretch test', 'Guess', 'Smell', 'Price'], answer: 0, explain: 'Snaps=protein, gummy=balance.' },
        { q: 'Pool before swim:', options: ['Pre-wet + protect', 'Dry + bleach', 'No cap', 'Soak in chlorine'], answer: 0, explain: 'Limits absorption.' },
        { q: 'Toner revisit ~', options: ['4–6 wks', '1 year', 'Daily', 'Never'], answer: 0, explain: 'Fade cycle.' },
        { q: 'Rebook when:', options: ['Before leaving', 'Someday', 'Never', 'By luck'], answer: 0, explain: 'Retention.' }
      ],
      practical: { title: 'In-salon: Aftercare Cards x5', task: 'Write 5 aftercare cards (real/scenario): products, cycles, protection, rebook date. Mentor checks.', outcome: 'Aftercare that retains.', checklist: ['5 cards', 'Cycles dated', 'Mentor pass'] }
    },
    {
      title: 'Troubleshooting, Portfolio & Final Assessment',
      weekLabel: 'Week 12', hours: '3 hrs',
      objectives: ['Fix bands, brass, fade, frizz, drop with plans', 'Build chemical portfolio (stages + formulas)', 'Price corrective honestly', 'Pass theory + practical'],
      theory: `<p><b>Fix menu:</b> Bands → careful re-lift/blend (no overlap) + tone • Brass → lift sufficient + wheel toner • Fade → fill + demi + seal • Perm drop → check neutralise/time/rods, re-plan • Frizz/breakage → protein/moisture + trim + heat pause.</p><p><b>Portfolio:</b> before/during/after same light + formula + time + consent. Corrective priced by stages + tests, never flat-guessed.</p><p><b>Assessment:</b> 30-Q theory (≥70%) + practical (consult + tests + assist/strand + tone/gloss + aftercare pitch) under mentor. Pass = supervised chemical junior, not solo bleacher — keep assisting to mastery.</p>`,
      visualSteps: [
        { e: '🔧', t: 'Diagnose — map issue + cause + strand proof' },
        { e: '📐', t: 'Plan — stages + formulas + price + consent' },
        { e: '📸', t: 'Prove — staged photos + formula cards' },
        { e: '💰', t: 'Price — stages, not guesses' },
        { e: '🏁', t: 'Assess — theory + observed chemical service' }
      ],
      activity: { type: 'checklist', title: 'Chemical-Junior Ready', instructions: 'All 7 = graduate.', items: ['Tests every time', 'Vol/lotion choice correct', 'No overlap habit', 'Toner controlled', 'Emergency drill known', 'Aftercare + rebook', 'Portfolio 6+ cases'] },
      threeD: { type: 'chem', title: '3D Lab: Fix Simulator', description: 'Dial a fault (band/brass/fade) and see the fix path light: diagnose → fill/lift → tone → seal.' },
      quiz: [
        { q: 'Bands fixed by:', options: ['Careful re-lift/blend + tone', 'More overlap', 'Black box', 'Ignore'], answer: 0, explain: 'No overlap.' },
        { q: 'Faded bleached to brown needs:', options: ['Fill first', 'Ash directly', 'Bleach again', 'Water'], answer: 0, explain: 'Undercoat rebuild.' },
        { q: 'Portfolio needs:', options: ['Stages + formula + consent', 'Filters only', 'Stock photos', 'Nothing'], answer: 0, explain: 'Proof + law.' },
        { q: 'Corrective priced:', options: ['By stages + tests', 'Flat guess', 'Free always', 'Hourly lie'], answer: 0, explain: 'Honest scoping.' },
        { q: 'Final theory pass:', options: ['≥70%', '≥10%', 'No bar', '100% only'], answer: 0, explain: 'Safety bar.' }
      ],
      practical: { title: 'FINAL: Chemical Case + Assist', task: 'Present one full case (consult + tests + formula + staged photos + aftercare) + assist one live chemical service. Mentor rubric.', outcome: 'Signed-off supervised chemical junior.', checklist: ['Case file', 'Live assist', 'Rubric ≥70%'] }
    }
  ]
};
