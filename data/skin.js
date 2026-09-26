// SKIN COURSE — 12 weeks · professional esthetics foundation
module.exports = {
  id: 'skin',
  title: 'Skin Science & Facials',
  tagline: 'Anatomy • Analysis • European Facials • Devices • Glow Protocols',
  color: '#0d9488',
  icon: '✨',
  level: 'Beginner → Facialist',
  duration: '12 weeks · 2–3 hrs/week · ~30 hrs',
  image: 'skin',
  description: `From skin anatomy to bookable glow facials: hygiene and treatment room, skin layers and nutrition, skin typing, cleansing/exfoliation/mask science, the classic European facial, massage manipulations, contraindications, hair removal and makeup basics, product chemistry, electrical modalities, targeted protocols (acne, pigmentation, ageing) and client business skills.`,
  outcomes: [
    'Analyse skin type vs condition and spot contraindications',
    'Perform a 60-min European facial with massage to standard',
    'Select products by ingredients, not marketing',
    'Use high-frequency + light therapy safely (intro level)',
    'Build rebooking + home-care plans that retain clients'
  ],
  threeDTheme: 'skin',
  modules: [
    {
      title: 'The Professional Treatment Room',
      weekLabel: 'Week 1', hours: '2 hrs',
      objectives: ['Set hygiene + disinfection to board standard', 'Lay out trolley, bed, lighting, laundry flow', 'Drape, position and ensure comfort/privacy', 'Communicate boundaries + consent'],
      theory: `<p>Skin work is intimate: trust = hygiene + privacy + communication. <b>Room:</b> warm (24–26°C), dimmable light, magnifying lamp, steamer (if available), closed storage, sharps/bin + laundry flow (clean vs used never cross).</p><p><b>Hygiene:</b> wash hands + short nails, tie hair, no dangling sleeves; disinfect bed/trolley/bowls between clients; single-use spatulas, headbands laundered; double-dip never. Patch-test new products.</p><p><b>Client journey:</b> greet → health form + consent → private change + drape (chest covered, hair banded) → explain every step before touch → check pressure/heat → aftercare card.</p>`,
      visualSteps: [
        { e: '🛏️', t: 'Bed — fresh linens, headband, blanket, knee roll for comfort' },
        { e: '🧴', t: 'Trolley — clean left, dirty right; labelled bowls, single-use spatulas' },
        { e: '💡', t: 'Light + loupe — magnifier ready, steamer water fresh' },
        { e: '🤝', t: 'Consent — health form, allergies, sign before touch' },
        { e: '🧼', t: 'Reset — disinfect surfaces, bag laundry, wash hands' }
      ],
      activity: { type: 'checklist', title: 'Room Open/Close', instructions: 'Complete before your first facial.', items: ['Bed + linens fresh', 'Trolley clean/dirty zones', 'Lamp + steamer checked', 'Consent forms ready', 'Laundry + bins separated'] },
      threeD: { type: 'skin', title: '3D Lab: Treatment Room', description: 'Orbit the room: bed height, lamp angle, trolley zones. Good ergonomics = your back survives 6 facials a day.' },
      quiz: [
        { q: 'Clean vs dirty on trolley:', options: ['Never cross — separate zones', 'Mix freely', 'No trolley needed', 'Floor is fine'], answer: 0, explain: 'Cross-contamination control.' },
        { q: 'Double-dipping spatulas:', options: ['Forbidden', 'Fine', 'Encouraged', 'Only creams'], answer: 0, explain: 'Single-use or disinfect.' },
        { q: 'Room temp ~', options: ['24–26°C', '15°C', '35°C', 'Any'], answer: 0, explain: 'Client relaxed, product stable.' },
        { q: 'Before touch you need:', options: ['Consent + allergy check', 'Nothing', 'Payment only', 'Selfie'], answer: 0, explain: 'Legal + safety.' },
        { q: 'Linens per client:', options: ['Fresh set', 'Reuse if clean-looking', 'Weekly change', 'None'], answer: 0, explain: 'Fresh every client.' }
      ],
      practical: { title: 'In-salon: Room Setup Photo', task: 'Set your treatment bed/trolley, photograph zones, label clean/dirty. Mentor checks.', outcome: 'Board-ready room setup.', checklist: ['Photo submitted', 'Zones labelled', 'Mentor pass'] }
    },
    {
      title: 'Skin Anatomy: Layers, Functions & Nutrition',
      weekLabel: 'Week 2', hours: '2.5 hrs',
      objectives: ['Name epidermis (5 sublayers), dermis, hypodermis', 'Explain barrier, collagen, melanin roles', 'Link diet/sleep/sun to skin', 'Choose care by barrier state'],
      theory: `<p><b>Epidermis</b> (basale → spinosum → granulosum → lucidum (palms/soles) → corneum): keratinocytes rise and shed in ~28 days (slower with age). <b>Dermis:</b> collagen + elastin + vessels + follicles + glands. <b>Hypodermis:</b> fat + insulation.</p><p><b>Barrier (acid mantle ~pH 4.5–5.5):</b> keeps water in, irritants out. Over-cleansing/harsh scrubs strip it → sensitivity. <b>Melanin</b> (melanocytes) protects from UV; <b>collagen</b> = firmness (UV + sugar + smoking degrade it).</p><p><b>Nutrition:</b> water, protein, vitamin C (collagen), E + essential fats (barrier), zinc; sleep + SPF beat any cream. Recommend lifestyle kindly, never diagnose.</p>`,
      visualSteps: [
        { e: '🧱', t: 'Corneum bricks-and-mortar — lipids hold cells, harsh foam dissolves mortar' },
        { e: '🩸', t: 'Dermis factory — collagen/elastin + blood feed the epidermis' },
        { e: '🌞', t: 'Melanin umbrella — UV triggers pigment shields' },
        { e: '💧', t: 'Barrier test — tight/shiny after wash = stripped, needs gentler cleanse' },
        { e: '🥗', t: 'Plate check — protein + C + fats + water + sleep + SPF' }
      ],
      activity: { type: 'cards', title: 'Layer Match', instructions: 'Match structure to job.', items: [['Stratum corneum', 'Barrier shield'], ['Melanocyte', 'Pigment protection'], ['Collagen (dermis)', 'Firmness + bounce'], ['Acid mantle', 'pH 4.5–5.5 defence'], ['Hypodermis', 'Cushion + insulation']] },
      threeD: { type: 'skin', title: '3D Lab: Skin Layers', description: 'Peel the layers: corneum → living epidermis → dermis with vessels → fat. Toggle UV to see collagen breakdown.' },
      quiz: [
        { q: 'Skin turnover ~', options: ['~28 days', '~2 days', '~1 year', 'Never'], answer: 0, explain: 'Young adult average.' },
        { q: 'Barrier pH ~', options: ['4.5–5.5', '9–11', '7 exactly', '1–2'], answer: 0, explain: 'Slightly acidic mantle.' },
        { q: 'Collagen lives in:', options: ['Dermis', 'Corneum', 'Hair shaft', 'Nails'], answer: 0, explain: 'Dermal firmness fibres.' },
        { q: 'Melanin job:', options: ['UV protection', 'Hydration', 'Oil control', 'Heating'], answer: 0, explain: 'Natural sun shield.' },
        { q: 'Stripped barrier feels:', options: ['Tight/shiny/sensitive', 'Calm', 'Oily forever', 'Nothing'], answer: 0, explain: 'Needs gentler routine.' }
      ],
      practical: { title: 'In-salon: Barrier Checks x3', task: 'Assess 3 skins (with permission): barrier state + lifestyle notes + one gentle recommendation each.', outcome: 'Anatomy-linked recommendations.', checklist: ['3 assessments', 'Barrier noted', 'Advice given'] }
    },
    {
      title: 'Skin Types, Conditions & Analysis',
      weekLabel: 'Week 3', hours: '2.5 hrs',
      objectives: ['Separate type (genetic) vs condition (changeable)', 'Identify normal/dry/oily/combination/sensitive', 'Spot dehydration, sensitised, acne grades', 'Complete a consultation + analysis form'],
      theory: `<p><b>Types (genetic):</b> Normal (balanced) • Dry (tight, fine pores, flaky) • Oily (shine, enlarged pores, congestion) • Combination (oily T, normal/dry cheeks) • Sensitive (reacts easily — handle as care modifier).</p><p><b>Conditions (temporary):</b> dehydrated (crepey, tight but oily possible — lacks water), sensitised (red, stinging — barrier impaired), acne (grades 1–4), pigmentation, ageing.</p><p><b>Analysis:</b> cleanse → loupe + Wood’s lamp (if available) → touch + blot test → record T-zone/cheeks separately → choose facial map (different mask zones OK — multi-masking).</p>`,
      visualSteps: [
        { e: '🧽', t: 'Cleanse — remove makeup, observe bare skin 10 min' },
        { e: '🔍', t: 'Loupe scan — pores, flakes, vessels, lesions zone by zone' },
        { e: '🧻', t: 'Blot test — tissue on T vs cheeks, oil transfer map' },
        { e: '✋', t: 'Touch — temperature, texture, elasticity bounce' },
        { e: '🗺️', t: 'Map — multi-mask plan per zone on form' }
      ],
      activity: { type: 'scenario', title: 'Type or Condition?', instructions: 'Classify each case.', items: [['Oily T + dry cheeks, long-term', 'Type: combination'], ['Tight + crepey after travel', 'Condition: dehydrated'], ['Red sting after harsh scrub', 'Condition: sensitised'], ['Balanced, few issues', 'Type: normal']] },
      threeD: { type: 'skin', title: '3D Lab: Pore Field', description: 'Fly over zones: T-zone craters (oily) vs cheek plains (dry). Mark your multi-mask zones.' },
      quiz: [
        { q: 'Type vs condition:', options: ['Type genetic, condition changeable', 'Same thing', 'Condition permanent', 'Type changes daily'], answer: 0, explain: 'Core distinction.' },
        { q: 'Combination =', options: ['Oily T + normal/dry cheeks', 'Oily everywhere', 'Dry everywhere', 'No pores'], answer: 0, explain: 'Zone-based.' },
        { q: 'Dehydrated means lacks:', options: ['Water', 'Oil always', 'Pores', 'Colour'], answer: 0, explain: 'Even oily skins dehydrate.' },
        { q: 'Blot test maps:', options: ['Oil per zone', 'pH exact', 'DNA', 'Age'], answer: 0, explain: 'Simple sebum map.' },
        { q: 'Multi-masking is:', options: ['Different masks per zone', 'Many layers same mask', 'No mask', 'Mud only'], answer: 0, explain: 'Zone-targeted.' }
      ],
      practical: { title: 'In-salon: 5 Skin Analyses', task: 'Analyse 5 faces, complete forms, propose facial plan each. Mentor verifies 2.', outcome: 'Confident analysis + planning.', checklist: ['5 forms', 'Zone maps', '2 verified'] }
    },
    {
      title: 'Cleanse, Exfoliate & Mask Science',
      weekLabel: 'Week 4', hours: '2.5 hrs',
      objectives: ['Double-cleanse + choose cleanser by type', 'Compare physical vs enzyme vs AHA/BHA', 'Select mask (clay/cream/gel/sheet) per zone', 'Time + remove without stripping'],
      theory: `<p><b>Cleanse:</b> oil/balm first (dissolves SPF/makeup) → water-based gel/milk second. Dry/sensitive = milky, low-foam; oily = gel, thorough but not squeaky.</p><p><b>Exfoliate:</b> physical (scrubs — gentle, avoid sharp shells; not for inflamed acne) • enzymes (papain/bromelain — gentle, great sensitive) • AHAs (glycolic/lactic — surface + glow) • BHA salicylic (oil-soluble — pores/acne). Frequency: 1–2x/week; over-exfoliation = shine + sting.</p><p><b>Masks:</b> clay (absorb oil — T-zone), cream (nourish — dry), gel (soothe/hydrate — sensitive), sheet (serum push). 10–15 min, never crack-dry on sensitive; mist if drying.</p>`,
      visualSteps: [
        { e: '🫧', t: 'Double cleanse — oil then water-based, 60-sec massage' },
        { e: '🍍', t: 'Exfoliate — enzyme/AHA thin layer, timer, cool remove' },
        { e: '🎭', t: 'Multi-mask — clay T, cream cheeks, gel sensitivity' },
        { e: '⏱️', t: 'Time — 10–15 min, mist before cracking' },
        { e: '💧', t: 'Seal — toner + serum + moisturiser + SPF (day)' }
      ],
      activity: { type: 'mixer', title: 'Product Match', instructions: 'Match skin to exfoliant.', items: [['Sensitive/red', 'Enzyme (papain)'], ['Oily congested', 'BHA salicylic'], ['Dull, fine lines', 'AHA glycolic/lactic'], ['Inflamed acne', 'No scrub — gentle enzyme/BHA only']] },
      threeD: { type: 'skin', title: '3D Lab: Exfoliation Depth', description: 'Cross-section: scrub (surface) vs AHA (even peel) vs BHA (into pore). Depth = results + risk.' },
      quiz: [
        { q: 'Double cleanse order:', options: ['Oil then water-based', 'Water then oil', 'Scrub only', 'Toner only'], answer: 0, explain: 'Oil dissolves oil-based debris first.' },
        { q: 'BHA best for:', options: ['Oily/congested pores', 'Dry flakes only', 'No one', 'Eyes'], answer: 0, explain: 'Oil-soluble into pores.' },
        { q: 'Clay masks suit:', options: ['Oily T-zone', 'Dry cheeks mainly', 'Eyes', 'Lips'], answer: 0, explain: 'Absorb excess sebum.' },
        { q: 'Over-exfoliation signs:', options: ['Shine + sting + sensitivity', 'Calm glow', 'Smaller pores forever', 'None'], answer: 0, explain: 'Barrier distress.' },
        { q: 'Mask timing ~', options: ['10–15 min', '1 hour', 'Overnight always', '30 sec'], answer: 0, explain: 'Effective without dehydrating.' }
      ],
      practical: { title: 'In-salon: Cleanse + Mask Trio', task: 'On 3 models: double-cleanse + exfoliant choice + multi-mask. Photograph before/after (permission), log products/times.', outcome: 'Product-matched mini-facials.', checklist: ['3 sessions', 'Photos', 'Product log'] }
    },
    {
      title: 'The Classic 60-Min European Facial',
      weekLabel: 'Week 5', hours: '3 hrs',
      objectives: ['Sequence 10 steps in order + time', 'Use steam + extraction safely (intro)', 'Layer serum/moisturiser/SPF correctly', 'Deliver silent-check luxury'],
      theory: `<p><b>10 steps (~60 min):</b> 1 consult + drape (5) 2 first cleanse (3) 3 analysis (5) 4 second cleanse/exfoliate (7) 5 steam (5–7, 30 cm distance) 6 extraction <i>only</i> open comedones with tissue-wrapped fingers, no nails, stop if bleeding/pain (5) 7 massage (10) 8 mask (12) 9 tone/serum/moisturise (5) 10 SPF + home-care (3).</p><p><b>Touch rules:</b> warm products in palms, no dragging (support with other hand), check heat/pressure twice. Extractions optional at foundation level — refer severe congestion.</p>`,
      visualSteps: [
        { e: '📋', t: 'Consult + drape — 5 min, plan on form' },
        { e: '🧼', t: 'Cleanse x2 + exfoliate — 10 min total' },
        { e: '♨️', t: 'Steam 5–7 min — 30 cm, check heat, cover eyes' },
        { e: '💆', t: 'Massage 10 min — 5 movements (next week deep-dive)' },
        { e: '🎭', t: 'Mask 12 + seal — tone, serum, moisturise, SPF' }
      ],
      activity: { type: 'checklist', title: 'Facial Timing Drill', instructions: 'Run a mock facial with timer. Hit all windows.', items: ['Consult 5', 'Cleanses 10', 'Steam 5–7', 'Massage 10', 'Mask 12 + seal 8'] },
      threeD: { type: 'skin', title: '3D Lab: Facial Timeline', description: 'Walk the 60-min timeline in 3D: each station lights as you progress. Miss a station = incomplete facial.' },
      quiz: [
        { q: 'Steam distance/time:', options: ['~30 cm, 5–7 min', '5 cm, 20 min', '1 m, 1 min', 'Direct boiling'], answer: 0, explain: 'Safe softening.' },
        { q: 'Extractions only on:', options: ['Open comedones, gentle', 'Inflamed cysts', 'Moles', 'Eyes'], answer: 0, explain: 'Know limits; refer severe.' },
        { q: 'Massage slot ~', options: ['10 min', '30 min', '1 min', 'None'], answer: 0, explain: 'Classic protocol.' },
        { q: 'Layering order:', options: ['Toner→serum→moisturiser→SPF', 'SPF→serum', 'Oil→water', 'Random'], answer: 0, explain: 'Thin to thick, SPF last (day).' },
        { q: 'Stop extraction if:', options: ['Bleeding/pain', 'Client breathes', 'Time passes', 'Never'], answer: 0, explain: 'Skin safety first.' }
      ],
      practical: { title: 'In-salon: Full European x2', task: 'Two full 60-min facials on models, timed, with forms + photos. Mentor observes one.', outcome: 'Timed, flowing European facial.', checklist: ['2 facials timed', 'Forms + photos', '1 observed'] }
    },
    {
      title: 'Facial Massage: The 5 Manipulations',
      weekLabel: 'Week 6', hours: '2.5 hrs',
      objectives: ['Perform effleurage, petrissage, friction, tapotement, vibration', 'Direct lymph + boost glow safely', 'Adapt pressure for sensitive/acne', 'Time 10 min without rushing'],
      theory: `<p><b>5 moves:</b> Effleurage (flat stroking — warm-up/close) • Petrissage (knead/lift — tone) • Friction (circles — release tension jaw/temples) • Tapotement (light tapping — stimulate, avoid thin/inflamed skin) • Vibration (tremor — calm finish).</p><p><b>Direction:</b> up + out (against gravity), support skin, medium slip (cream/oil). Avoid: inflamed acne, open lesions, recent peels, severe rosacea flare. Lymph: light sweeps to pre-auricular + submandibular nodes.</p>`,
      visualSteps: [
        { e: '🤲', t: 'Effleurage — broad strokes, 2 min warm-up' },
        { e: '👐', t: 'Petrissage — knead cheeks/jaw, 3 min' },
        { e: '⭕', t: 'Friction — temples, jaw, brow circles, 2 min' },
        { e: '👆', t: 'Tapotement + vibration — light, 2 min, calm close' },
        { e: '🌊', t: 'Lymph sweeps — feather-light to nodes, 1 min' }
      ],
      activity: { type: 'cards', title: 'Move Match', instructions: 'Match move to effect.', items: [['Effleurage', 'Warm-up + close'], ['Petrissage', 'Tone + lift'], ['Friction', 'Release tension'], ['Tapotement', 'Stimulate (skip inflamed)'], ['Vibration', 'Calm finish']] },
      threeD: { type: 'skin', title: '3D Lab: Muscle + Lymph Map', description: 'See facial muscles + lymph nodes. Stroke up-out along muscle fibres, drain lightly to nodes.' },
      quiz: [
        { q: 'Massage direction:', options: ['Up + out', 'Down only', 'Random scrub', 'Pull down'], answer: 0, explain: 'Lift against gravity.' },
        { q: 'Skip tapotement on:', options: ['Inflamed/thin skin', 'Oily T-zone', 'Jaw', 'Neck'], answer: 0, explain: 'Too stimulating for flare.' },
        { q: 'Slip medium is:', options: ['Cream/oil', 'Dry dragging', 'Water only', 'Wax'], answer: 0, explain: 'Glide without stretch.' },
        { q: 'Lymph sweeps are:', options: ['Feather-light to nodes', 'Deep hard', 'Skipped always', 'On bones only'], answer: 0, explain: 'Lymph is superficial.' },
        { q: 'Massage time ~', options: ['10 min', '1 min', '40 min', 'No time'], answer: 0, explain: 'Classic slot.' }
      ],
      practical: { title: 'In-salon: Massage x5', task: 'Five 10-min massages (models/colleagues). Log pressure feedback + adapt for one sensitive skin.', outcome: 'Flowing 5-move massage.', checklist: ['5 massages', 'Feedback logged', 'Sensitive adapt'] }
    },
    {
      title: 'Disorders, Contraindications & Safety',
      weekLabel: 'Week 7', hours: '2.5 hrs',
      objectives: ['Recognise acne grades, dermatitis, rosacea, herpes, warts, moles', 'Know absolute vs caution contraindications', 'Refer correctly + document', 'Handle reactions calmly'],
      theory: `<p><b>Absolute (no facial):</b> fever/infection, conjunctivitis/stye (eye area), cold sores (lip area — cross-infection), impetigo, undiagnosed lumps, severe eczema flare. <b>Caution (adapt + consent):</b> mild rosacea (no heat/steam), controlled acne (no picking, gentle), diabetes (slow healing — gentle), pregnancy (avoid retinoids/strong acids, side-lying comfort).</p><p><b>Acne grades:</b> 1 comedonal → 2 papules → 3 pustules/nodules → 4 cystic (refer). Never extract inflamed lesions. <b>Moles:</b> never treat over suspicious changing mole — refer (ABCDE).</p><p><b>Reaction drill:</b> remove product, cool compress, calm + document, advise GP if spreading; anaphylaxis signs (swelling/breathing) = emergency.</p>`,
      visualSteps: [
        { e: '🚦', t: 'Triage — absolute red vs caution amber vs go green' },
        { e: '📸', t: 'Document — photo + note + referral letter copy' },
        { e: '🧤', t: 'Adapt — no steam/heat on rosacea, no pick on inflamed' },
        { e: '🆘', t: 'React — remove, cool, document, escalate if spreading' },
        { e: '📞', t: 'Refer — GP/dermatologist, never diagnose' }
      ],
      activity: { type: 'scenario', title: 'Red / Amber / Green', instructions: 'Triage each case.', items: [['Cold sore present, wants lip-area facial', 'RED — postpone lip area'], ['Mild rosacea, wants steam', 'AMBER — skip steam, gentle'], ['Grade 4 cystic acne, wants extraction', 'RED — refer, no extraction'], ['Controlled mild acne, gentle facial', 'GREEN with adapt']] },
      threeD: { type: 'skin', title: '3D Lab: Lesion Library', description: 'Rotate lesion models: comedone vs papule vs pustule vs cyst. Learn what you may vs must-not touch.' },
      quiz: [
        { q: 'Cold sores mean:', options: ['Avoid lip area / postpone', 'Scrub harder', 'Extract', 'Ignore'], answer: 0, explain: 'Viral cross-infection risk.' },
        { q: 'Grade 4 cystic acne:', options: ['Refer, no extraction', 'Deep extract', 'Steam hard', 'Peel strong'], answer: 0, explain: 'Medical referral.' },
        { q: 'Rosacea caution:', options: ['No heat/steam, gentle', 'Hot steam + scrub', 'Strong acids', 'Sunbed'], answer: 0, explain: 'Heat flares vessels.' },
        { q: 'Changing mole:', options: ['Refer (ABCDE)', 'Treat over it', 'Pick', 'Bleach'], answer: 0, explain: 'Never treat suspicious lesions.' },
        { q: 'Spreading reaction:', options: ['Remove, cool, document, GP', 'Add more product', 'Hide it', 'Charge extra'], answer: 0, explain: 'Safety + records.' }
      ],
      practical: { title: 'In-salon: Triage Log', task: 'Log 5 real triages with RAG rating + action + referral where needed. Mentor reviews.', outcome: 'Safe triage habit.', checklist: ['5 logs', 'RAG each', 'Mentor review'] }
    },
    {
      title: 'Hair Removal, Brows & Makeup Basics',
      weekLabel: 'Week 8', hours: '2.5 hrs',
      objectives: ['Wax/tweeze safely with patch + aftercare', 'Shape brows to face (start-arch-end mapping)', 'Do natural-day makeup + lashes intro', 'Prevent ingrowns + reactions'],
      theory: `<p><b>Wax:</b> patch-test 24h, no wax on broken skin/varicose/moles/sunburn/recent retinoids; cleanse → talc if sweaty → thin even strip with growth (strip wax) → remove against growth holding skin taut → soothe + aftercare (no heat/sweat/fragrance 24h).</p><p><b>Brows:</b> map start (nose wing → inner corner), arch (nose wing → iris edge), end (nose wing → outer corner); step back for symmetry; trim only excess; tint patch-test mandatory.</p><p><b>Makeup basics:</b> prep (moisturise/SPF) → base matched jawline → conceal → blush/bronze lightly → eyes (neutral) → lips; strip lashes measured + trimmed + glue tacky 30s; colour theory from Hair Week 9 applies (corrective: green hides red).</p>`,
      visualSteps: [
        { e: '🧪', t: 'Patch test — 24h, document' },
        { e: '🗺️', t: 'Brow map — 3 dots, symmetry check' },
        { e: '🕯️', t: 'Wax — thin, taut skin, against growth, soothe' },
        { e: '💄', t: 'Base — jawline match, blend neck, set lightly' },
        { e: '👁️', t: 'Eyes/lashes — neutral, trimmed strip, 30s tacky glue' }
      ],
      activity: { type: 'checklist', title: 'Wax Safety Pass', instructions: 'All 6 before live waxing.', items: ['Patch test 24h', 'No contraindicated area', 'Hair 5–6 mm+', 'Skin taut on pull', 'Aftercare given', 'Reaction plan known'] },
      threeD: { type: 'skin', title: '3D Lab: Brow Architecture', description: 'Golden-ratio brow map in 3D: move start/arch/end and see face balance shift.' },
      quiz: [
        { q: 'Wax patch test:', options: ['24h before', 'During wax', 'Never', 'After reaction'], answer: 0, explain: 'Allergy/intolerance window.' },
        { q: 'Strip removal:', options: ['Against growth, skin taut', 'With growth, loose', 'Slow peel up', 'Twist'], answer: 0, explain: 'Clean pull, less breakage.' },
        { q: 'Brow arch maps via:', options: ['Nose wing → iris edge', 'Ear → chin', 'Guess', 'Template only'], answer: 0, explain: 'Facial proportion.' },
        { q: 'After wax avoid 24h:', options: ['Heat/sweat/fragrance', 'Moisturiser always', 'Water forever', 'Nothing'], answer: 0, explain: 'Follicles open.' },
        { q: 'Lash glue:', options: ['Tacky ~30s then place', 'Wet slide', 'Superglue', 'No glue'], answer: 0, explain: 'Tacky = hold.' }
      ],
      practical: { title: 'In-salon: Brows + Natural Makeup', task: 'On 2 models: brow map/shape + natural-day makeup with before/after photos + product list.', outcome: 'Bookable brow + makeup mini-service.', checklist: ['2 models', 'Before/after', 'Product list'] }
    },
    {
      title: 'Product Chemistry & Smart Selection',
      weekLabel: 'Week 9', hours: '2.5 hrs',
      objectives: ['Read INCI: actives vs base vs fragrance', 'Dose niacinamide, C, retinoids, acids safely (intro)', 'Match vehicle (gel/cream/oil) to skin', 'Build AM/PM routines + SPF habit'],
      theory: `<p><b>INCI order:</b> highest % first (after 1% actives can shuffle). <b>Stars:</b> niacinamide 2–5% (pores/tone) • vitamin C 10–20% L-AA/MAP (bright, AM + SPF) • retinoids (PM only, pea-size, SPF mandatory, avoid pregnancy) • AHAs/BHAs (1–2x/wk) • hyaluronic (on damp skin + seal) • ceramides (barrier).</p><p><b>Vehicles:</b> gel (oily), lotion (combo), cream (dry), oil/balm (very dry/night). <b>Routine:</b> AM: cleanse → antioxidant → moisturise → SPF 30+. PM: double-cleanse → treat → moisturise. Introduce one active at a time, 2 weeks apart.</p><p><b>Claims:</b> “dermat-tested” ≠ suitable for all; fragrance/essential oils can sensitise; expiry/PAO matters.</p>`,
      visualSteps: [
        { e: '🏷️', t: 'Read label — first 5 = base, find % of actives' },
        { e: '💧', t: 'Match vehicle — gel oily, cream dry, seal damp HA' },
        { e: '🌅', t: 'AM — antioxidant + SPF 30+ (2 finger-lengths)' },
        { e: '🌙', t: 'PM — treat once, moisturise, retinoid pea + SPF next day' },
        { e: '📒', t: 'One-at-a-time log — 2-week gaps, photo track' }
      ],
      activity: { type: 'mixer', title: 'Routine Builder', instructions: 'Build correct AM/PM orders.', items: [['AM step 1', 'Cleanser'], ['AM last', 'SPF 30+'], ['PM treat', 'Retinoid/acid (not both new)'], ['Dry skin vehicle', 'Cream']] },
      threeD: { type: 'chem', title: '3D Lab: Ingredient Penetration', description: 'Molecule sizes sink differently: small acids dive, large HA sits + pulls water. Layer thin→thick.' },
      quiz: [
        { q: 'INCI lists by:', options: ['Descending %', 'Alphabetical', 'Random', 'Price'], answer: 0, explain: 'First ingredients dominate.' },
        { q: 'Retinoids:', options: ['PM pea-size + SPF', 'AM + sun', 'Pregnancy-safe always', 'Unlimited'], answer: 0, explain: 'Sun-sensitising, potent.' },
        { q: 'Hyaluronic best:', options: ['On damp + sealed', 'On dry + fan', 'Alone in desert', 'Eyes only'], answer: 0, explain: 'Humectant needs water + seal.' },
        { q: 'New actives:', options: ['One at a time, 2 wks apart', 'All day one', 'No log', 'Max strength first'], answer: 0, explain: 'Isolate tolerance.' },
        { q: 'SPF dose ~', options: ['2 finger-lengths face', 'Dot only', 'Weekly', 'Night only'], answer: 0, explain: 'Tested dose.' }
      ],
      practical: { title: 'In-salon: Routine Prescriptions x3', task: 'Prescribe AM/PM + SPF for 3 skin types with product names, doses, introduction order. Photograph shelf picks.', outcome: 'Retail-ready prescriptions.', checklist: ['3 routines', 'Doses stated', 'SPF each'] }
    },
    {
      title: 'Electrical Facials & Light Therapy (Intro)',
      weekLabel: 'Week 10', hours: '2.5 hrs',
      objectives: ['Explain galvanic vs high-frequency simply', 'Operate HF safely (gap, time, contraindications)', 'Use LED basics (red/blue) + eye protection', 'Document device settings'],
      theory: `<p><b>Galvanic:</b> low direct current — desincrustation (negative, softens oil) / iontophoresis (positive, pushes serum). <b>High-frequency (HF):</b> glass electrode + argon/violet glow — oxygenating, antibacterial (great congested/oily), spark-gap technique, 3–5 min.</p><p><b>HF safety:</b> no metal jewellery, no wet face dripping, keep electrode moving 5 mm gap, lower intensity on thin skin; <b>never</b> with pacemaker, epilepsy, pregnancy, rosacea flare, broken skin, over fillers/Botox window.</p><p><b>LED:</b> red (~630 nm, calm/collagen support) • blue (~415 nm, acne bacteria) • 10–20 min, goggles, clean skin, photo-consent. Devices support — not replace — good facial technique.</p>`,
      visualSteps: [
        { e: '🔌', t: 'Check — contraindications, jewellery off, skin dry-ish for HF' },
        { e: '🟣', t: 'HF — low intensity, moving electrode, 3–5 min, no parking' },
        { e: '🔴', t: 'LED — goggles, 10–20 min, correct wavelength' },
        { e: '📝', t: 'Log — device, intensity, time, skin response' },
        { e: '🧊', t: 'Soothe + SPF — post-device calm + protect' }
      ],
      activity: { type: 'scenario', title: 'Device Go / No-Go', instructions: 'Decide safe use.', items: [['Pacemaker + wants HF', 'NO-GO — refer'], ['Oily congested, no flags', 'GO HF 3–5 min low'], ['Pregnant + strong current facial', 'NO-GO — gentle manual only'], ['Mild acne + LED blue', 'GO with goggles 10–20 min']] },
      threeD: { type: 'skin', title: '3D Lab: Current + Light', description: 'See HF spark-gap vs LED photons. Energy falls with distance — keep the gap, keep it moving.' },
      quiz: [
        { q: 'HF gap technique:', options: ['~5 mm, keep moving', 'Press hard static', 'Soak face + max', 'Eyes directly'], answer: 0, explain: 'Prevents hotspots.' },
        { q: 'HF forbidden with:', options: ['Pacemaker/epilepsy/pregnancy', 'Oily skin', 'Adults', 'Dry hands'], answer: 0, explain: 'Absolute contraindications.' },
        { q: 'Blue LED targets:', options: ['Acne bacteria', 'Hair growth', 'Teeth', 'Nails'], answer: 0, explain: '~415 nm antibacterial.' },
        { q: 'HF time ~', options: ['3–5 min', '30 min', '1 sec', '1 hour'], answer: 0, explain: 'Short + effective.' },
        { q: 'Always log:', options: ['Device + settings + response', 'Nothing', 'Price only', 'Gossip'], answer: 0, explain: 'Reproducibility + safety.' }
      ],
      practical: { title: 'In-salon: Device Assists x2', task: 'Assist 2 device facials (HF or LED): setup, safety check, timing, logging. No solo until certified in-salon.', outcome: 'Supervised device competence.', checklist: ['2 assists', 'Safety checks', 'Logs filed'] }
    },
    {
      title: 'Targeted Protocols: Acne, Pigment & Ageing + Luxury',
      weekLabel: 'Week 11', hours: '3 hrs',
      objectives: ['Plan 4–6 session courses (not miracles)', 'Treat acne gently + refer grades 3–4', 'Brighten pigment with SPF + C/niacinamide + AHA', 'Deliver 24k-style luxury finish'],
      theory: `<p><b>Acne (mild):</b> gentle gel cleanse → BHA/enzyme → light hydration → non-comedogenic SPF; no picking, change pillowcases, 4–6 weekly sessions + home-care. Grades 3–4 → GP/derm.</p><p><b>Pigment:</b> SPF is treatment #1 (re-darkens without it) + vitamin C AM + niacinamide + weekly AHA + patience (8–12 wks). <b>Ageing:</b> SPF + retinoid PM (slow ramp) + peptides/ceramides + massage + LED red; honest language (soften, not erase).</p><p><b>Luxury (gold/caviar/hydra-style):</b> double-mask ritual, extended massage, jade/quartz + sheet finish, champagne-presentation (towel origami, scent, photo). Charge for theatre + results.</p>`,
      visualSteps: [
        { e: '🎯', t: 'Target — one goal per course (acne OR pigment OR firmness)' },
        { e: '📆', t: 'Course — 4–6 weekly, photo same light, measure' },
        { e: '🧴', t: 'Home-care — 3 items max, written AM/PM' },
        { e: '👑', t: 'Luxury layer — massage + double mask + tool finish' },
        { e: '📸', t: 'Prove — before/after + rebook course' }
      ],
      activity: { type: 'cards', title: 'Protocol Picker', instructions: 'Match goal to hero plan.', items: [['Mild acne', 'BHA + light hydrate + SPF course'], ['Pigment', 'SPF + C + niacinamide + AHA'], ['Fine lines', 'SPF + PM retinoid ramp + red LED'], ['Event glow', 'Enzyme + hydra mask + massage']] },
      threeD: { type: 'skin', title: '3D Lab: Course Timeline', description: '6-session arc: inflammation falls, tone evens. One facial = glow day; courses = change.' },
      quiz: [
        { q: 'Pigment treatment #1:', options: ['Daily SPF', 'Scrub hard', 'Sunbed', 'Bleach'], answer: 0, explain: 'UV re-darkens everything.' },
        { q: 'Grade 3–4 acne:', options: ['Refer to GP/derm', 'Extract all', 'Strong home peel', 'Ignore'], answer: 0, explain: 'Medical lane.' },
        { q: 'Retinoid ramp:', options: ['Slow + SPF', 'Daily max at once', 'AM sun', 'No moisturiser'], answer: 0, explain: 'Tolerance building.' },
        { q: 'Course length ~', options: ['4–6 weekly', '1 miracle', 'Daily strong', 'Yearly'], answer: 0, explain: 'Skin cycles need weeks.' },
        { q: 'Luxury charges for:', options: ['Theatre + results', 'Gold dust magic', 'Time only', 'Nothing'], answer: 0, explain: 'Experience + outcome.' }
      ],
      practical: { title: 'In-salon: Course Plan + Glow Facial', task: 'Plan a 4-session course for one real skin goal + deliver one luxury glow facial with photos.', outcome: 'Course-selling + luxury delivery.', checklist: ['Course plan written', 'Glow facial done', 'Photos + rebook'] }
    },
    {
      title: 'Business Skills, Retention & Final Assessment',
      weekLabel: 'Week 12', hours: '3 hrs',
      objectives: ['Price + rebook courses (not single facials)', 'Handle sensitivity reactions + complaints', 'Build portfolio + reviews ethically', 'Pass theory + practical'],
      theory: `<p><b>Sell courses:</b> diagnose → show 4–6 plan with price-per-session + total + home-care → before/after promise (honest) → 48h follow-up. Rebook at desk before coat-on.</p><p><b>Reviews:</b> ask happy clients (QR + timing), never fake; before/after with consent, same light. <b>Recovery:</b> listen → remove cause → cool + document → free review slot → learn.</p><p><b>Assessment:</b> 30-Q theory (≥70%) + practical (consult + analysis + European facial + massage + home-care pitch) under mentor.</p>`,
      visualSteps: [
        { e: '💳', t: 'Offer — course of 4–6 + home-care, two payment options' },
        { e: '📅', t: 'Rebook — before leaving, reminder 48h' },
        { e: '⭐', t: 'Review — QR at glow moment, consent for photos' },
        { e: '🤲', t: 'Recover — free review, log, improve' },
        { e: '🏁', t: 'Assess — theory + observed facial' }
      ],
      activity: { type: 'checklist', title: 'Facialist-Ready', instructions: 'All 7 = graduate.', items: ['Analysis <15 min', 'European 60 min timed', 'Massage 5 moves flowing', 'Device assist safe', 'Course plan + rebook', 'Reaction drill known', 'Portfolio 8+ facials'] },
      threeD: { type: 'skin', title: '3D Lab: Your Glow Journey', description: '12 nodes light up — revisit dim ones before finals. Confidence is a circuit.' },
      quiz: [
        { q: 'Sell:', options: ['Courses + home-care', 'Single facials only', 'Discounts only', 'Nothing'], answer: 0, explain: 'Courses = results + retention.' },
        { q: 'Rebook when:', options: ['Before client leaves', 'Never', 'Months later', 'By luck'], answer: 0, explain: 'Frictionless retention.' },
        { q: 'Reviews must be:', options: ['Real + consented', 'Faked for speed', 'Bought', 'Copied'], answer: 0, explain: 'Trust + law.' },
        { q: 'Reaction first step:', options: ['Remove + cool + document', 'Add more', 'Argue', 'Charge'], answer: 0, explain: 'Safety.' },
        { q: 'Final theory pass:', options: ['≥70%', '≥20%', 'No pass', '100% only'], answer: 0, explain: 'Professional bar.' }
      ],
      practical: { title: 'FINAL: Full Facial on Model', task: 'Consult → analysis → European facial + massage → home-care + course pitch → portfolio. Mentor rubric.', outcome: 'Signed-off facialist (foundation).', checklist: ['Full facial', 'Portfolio + plan', 'Rubric ≥70%'] }
    }
  ]
};
