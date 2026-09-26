// HAIR COURSE — 12 weeks, 2–3h/week. Professional salon standard.
module.exports = {
  id: 'hair',
  title: 'Hair Mastery',
  tagline: 'Cutting • Styling • Finishing — from science to signature looks',
  color: '#7c3aed',
  icon: '💇',
  level: 'Beginner → Salon-ready',
  duration: '12 weeks · 2–3 hrs/week · ~30 hrs',
  image: 'hair',
  description: `A complete salon hair foundation: hair science, consultation, basin services, precision cutting, blow-dry and thermal styling, braids and up-styles, plus client care. Built from Cert III / NVQ-style units (cutting structures, basin services, finished designs, scalp conditions). Each week = 60 min theory + 30 min demo study + 20 min interactive lab + 15 min quiz + in-salon practical.`,
  outcomes: [
    'Consult professionally, analyse scalp & hair, spot contraindications',
    'Shampoo, condition and massage to basin-service standard',
    'Execute one-length, graduated and layered cuts on mannequin then models',
    'Blow-dry, set, thermal-style and build braids + classic up-styles',
    'Recommend home-care and retail with confidence'
  ],
  threeDTheme: 'hair',
  modules: [
    {
      title: 'Salon Safety, Hygiene & Professional Image',
      weekLabel: 'Week 1', hours: '2.5 hrs',
      objectives: ['Apply hygiene, disinfection & WHMIS-style chemical awareness', 'Set up, clean and maintain tools/work area', 'Present a professional, ethical image', 'Handle draping, posture and client comfort'],
      theory: `<p>Great hairdressing starts before scissors touch hair. Salons are regulated environments: you protect skin, eyes, airways and tools from cross-contamination every single service.</p><p><b>Core routine:</b> wash hands → disinfect tools (barbicide-style soak, dry, covered storage) → clean basin & chair → drape client (neck strip + cape, no hair on skin) → ventilate when products are strong. Never eat/drink near chemicals, recap bottles immediately, wipe spills at once.</p><p><b>Tools:</b> shears (hold: thumb + ring finger, pinky on tang, index/middle guide the blade — practice open-close using thumb only), combs (cutting vs styling), section clips, spray bottle. Clean after every client: remove hair, wash, disinfect, oil shear pivot weekly.</p><p><b>Professional image:</b> clean uniform/apron, closed shoes, tied-back hair, short nails, minimal jewellery. Greet within 30 seconds, use consultation form, never promise a result you cannot deliver.</p>`,
      visualSteps: [
        { e: '🧼', t: 'Hand wash + tool disinfection — 20-sec wash, tools soaked, dried, stored covered' },
        { e: '🪑', t: 'Workstation reset — chair, mirror, floor swept, cape + neck strip ready' },
        { e: '🧥', t: 'Drape client — tissue neck, cape clipped snug, long hair tied' },
        { e: '✂️', t: 'Shear hold drill — thumb-only movement, 10 slow open-close reps' },
        { e: '💨', t: 'Ventilation check — window/door open, mixing zone clear' }
      ],
      activity: { type: 'checklist', title: 'Salon Opening Checklist', instructions: 'Tick every item you completed in your salon today. All 6 = pass.', items: ['Hands washed', 'Tools disinfected & laid out', 'Basin & chair cleaned', 'Client draped correctly', 'Floor swept, ventilation on', 'Shear hold practised 10 reps'] },
      threeD: { type: 'hair', title: '3D Lab: The Salon Station in 3D', description: 'Rotate the station: chair, basin angle, tool zones (clean vs dirty). Drag to orbit. Notice the shear pivot — that is your control point.' },
      quiz: [
        { q: 'Correct shear hold is:', options: ['Thumb + ring finger, thumb moves', 'Full fist grip', 'Thumb + index, index moves', 'Palm grip'], answer: 0, explain: 'Thumb in one hole, ring finger in other, thumb drives the cut.' },
        { q: 'Before every client you must:', options: ['Disinfect tools & wash hands', 'Only sweep floor', 'Spray perfume', 'Change music'], answer: 0, explain: 'Hygiene is non-negotiable for every service.' },
        { q: 'Client draping order:', options: ['Neck strip then cape', 'Cape then neck strip', 'Towel only', 'No drape needed'], answer: 0, explain: 'Strip protects skin; cape goes over it.' },
        { q: 'Chemical bottles should be:', options: ['Recapped immediately, cool dark storage', 'Left open for speed', 'Stored in sunlight', 'Poured down basin'], answer: 0, explain: 'Prevents fumes, spills and degradation.' },
        { q: 'Ventilation matters because:', options: ['Airborne dust/chemicals accumulate', 'Clients like cold air', 'It dries hair faster', 'It is optional'], answer: 0, explain: 'Persulphates, ammonia and dust irritate airways.' }
      ],
      practical: { title: 'In-salon: Station Audit', task: 'In your salon, set up and photograph (or sketch) your station: clean zone vs dirty zone, disinfection jar, draping on a colleague/model. Ask your mentor to sign off.', outcome: 'A hygienic, organised station you can reset in under 5 minutes.', checklist: ['Photo/sketch submitted', 'Clean/dirty zones labelled', 'Mentor sign-off'] }
    },
    {
      title: 'Hair Science: Structure, Growth & Types',
      weekLabel: 'Week 2', hours: '2.5 hrs',
      objectives: ['Label cuticle, cortex, medulla and follicle', 'Explain anagen / catagen / telogen', 'Classify texture, density, porosity, elasticity', 'Link science to service choices'],
      theory: `<p>Hair is keratin. <b>Cuticle</b> (overlapping scales) protects; <b>cortex</b> holds strength, pigment and texture; <b>medulla</b> (not always present) is the soft core. The <b>follicle</b> root in the dermis grows hair; sebaceous glands oil it.</p><p><b>Growth cycle:</b> Anagen (growth, 2–7 yrs, ~85% of hair) → Catagen (transition, ~2 wks) → Telogen (rest/shedding, ~3 months). Normal loss ≈ 50–100 hairs/day.</p><p><b>Analysis quartet:</b> Texture (fine/medium/coarse — feel a strand), Density (thin/medium/thick — scalp visibility), Porosity (low/medium/high — float test: sinks fast = porous), Elasticity (stretch wet strand: 30–50% stretch + return = healthy). High porosity + low elasticity = caution with heat/chemicals.</p>`,
      visualSteps: [
        { e: '🔬', t: 'Strand under light — see shine (closed cuticle) vs frizz (raised cuticle)' },
        { e: '💧', t: 'Float test — clean strand in water: floats = low porosity, sinks = high' },
        { e: '↔️', t: 'Elasticity pull — wet strand stretches ⅓ and springs back = healthy' },
        { e: '📏', t: 'Density check — 1 cm parting: scalp clearly visible = thin' },
        { e: '🌀', t: 'Texture roll — roll strand between fingers: barely felt = fine' }
      ],
      activity: { type: 'cards', title: 'Flash Lab: Quartet Match', instructions: 'Flip each card and match the test to what it measures.', items: [['Float test', 'Porosity'], ['Stretch test', 'Elasticity'], ['Scalp visibility', 'Density'], ['Feel between fingers', 'Texture'], ['Anagen', 'Growth phase (years)'], ['Telogen', 'Shedding phase']] },
      threeD: { type: 'hair', title: '3D Lab: Hair Shaft & Follicle', description: 'Orbit the shaft: outer cuticle scales, cortex with pigment, follicle bulb below skin line. Toggle layers to see how bleach/heat must pass the cuticle first.' },
      quiz: [
        { q: 'Strength and pigment live in the:', options: ['Cortex', 'Cuticle', 'Medulla only', 'Sebaceous gland'], answer: 0, explain: 'Cortex = keratin chains + melanin.' },
        { q: 'Longest growth phase:', options: ['Anagen', 'Catagen', 'Telogen', 'Exogen'], answer: 0, explain: 'Anagen lasts years.' },
        { q: 'Sinks fast in float test =', options: ['High porosity', 'Low porosity', 'High density', 'Coarse texture'], answer: 0, explain: 'Porous hair absorbs water and sinks.' },
        { q: 'Healthy wet hair stretches:', options: ['~30–50% and returns', 'Not at all', 'Until it snaps is fine', 'Doubles in length'], answer: 0, explain: 'Elastic return signals intact bonds.' },
        { q: 'Sebaceous glands produce:', options: ['Sebum (oil)', 'Keratin', 'Melanin', 'Sweat only'], answer: 0, explain: 'Sebum conditions hair/scalp.' }
      ],
      practical: { title: 'In-salon: 3 Head Analyses', task: 'Analyse 3 colleagues/clients (with permission): texture, density, porosity, elasticity. Record on consultation cards and recommend one product each.', outcome: 'Three completed analysis cards + product recommendations.', checklist: ['3 cards filled', 'All 4 measures each', 'Recommendation given'] }
    },
    {
      title: 'Consultation, Scalp Analysis & Contraindications',
      weekLabel: 'Week 3', hours: '2.5 hrs',
      objectives: ['Run a 7-point consultation', 'Identify dandruff, psoriasis, pediculosis, alopecia signs', 'Know when to refuse/refer', 'Record clear client cards'],
      theory: `<p>Consultation prevents 90% of complaints. <b>7 points:</b> 1) lifestyle & expectations 2) history (colour/chemicals/meds) 3) scalp exam 4) hair analysis 5) face shape & lifestyle match 6) honest recommendation + price/time 7) aftercare + consent.</p><p><b>Scalp flags:</b> dry dandruff (small white flakes), oily scalp, psoriasis (thick silvery plaques — refer), pediculosis (nits glued to shaft — refuse, advise treatment), tinea/ringworm (circular bald itchy patches — refuse + refer), traction alopecia (receding edges from tight styles).</p><p><b>Rule:</b> broken skin, infestations, infections, undiagnosed lumps = no service, refer to pharmacist/doctor/dermatologist. Document everything; patch-test rule for colour comes in the Chemical course.</p>`,
      visualSteps: [
        { e: '💬', t: 'Ask: history + expectations + budget + maintenance willingness' },
        { e: '🔍', t: 'Examine scalp in 4 quadrants under good light, gloves if flakes/lesions' },
        { e: '📝', t: 'Record: analysis + agreed plan + price + time + aftercare' },
        { e: '🚫', t: 'Stop signs: nits, ringworm, open cuts, severe psoriasis → refer out' },
        { e: '🤝', t: 'Confirm: mirror + “repeat back” the plan, get explicit yes' }
      ],
      activity: { type: 'scenario', title: 'What Would You Do?', instructions: 'Read each scenario and choose the correct action.', items: [['Client has live nits visible', 'Refuse service, advise treatment, reschedule'], ['Dry small flakes, no redness', 'Proceed + recommend gentle exfoliating shampoo'], ['Round itchy bald patch', 'Refuse + refer to doctor (possible tinea)'], ['Wants platinum in 1 visit from black box dye', 'Explain realistic stages + test strand, re-plan']] },
      threeD: { type: 'skin', title: '3D Lab: Scalp Surface', description: 'Zoom the scalp field: follicle openings, scale flakes vs healthy surface. Count distribution — real analysis is quadrant by quadrant.' },
      quiz: [
        { q: 'First step of consultation:', options: ['Lifestyle, history & expectations', 'Shampoo immediately', 'Quote lowest price', 'Show Instagram only'], answer: 0, explain: 'History + expectations drive safe planning.' },
        { q: 'Nits (head lice eggs) mean:', options: ['Refuse + advise treatment', 'Proceed with strong shampoo', 'Cut it all off', 'Ignore'], answer: 0, explain: 'Infestation = no service, prevent spread.' },
        { q: 'Circular itchy bald patch suggests:', options: ['Tinea — refer to doctor', 'Normal shedding', 'Dandruff', 'Split ends'], answer: 0, explain: 'Fungal infection needs medical referral.' },
        { q: 'Client cards must record:', options: ['Analysis + plan + consent', 'Only the price', 'Nothing', 'Gossip'], answer: 0, explain: 'Legal protection + continuity.' },
        { q: 'Thick silvery scalp plaques:', options: ['Possible psoriasis — refer', 'Just dry skin, scrub hard', 'Bleach it', 'Perm it'], answer: 0, explain: 'Do not irritate; refer.' }
      ],
      practical: { title: 'In-salon: 5 Consultations', task: 'Perform 5 full consultations on real clients/models in-salon. Complete cards, photograph agreed reference style (with permission), get mentor feedback on one.', outcome: 'Five signed consultation cards + improved close rate.', checklist: ['5 cards complete', 'Contraindication check each', '1 mentor review'] }
    },
    {
      title: 'Basin Services: Shampoo, Condition & Massage',
      weekLabel: 'Week 4', hours: '2.5 hrs',
      objectives: ['Drape + position for comfort and drainage', 'Shampoo twice with correct pressure', 'Select conditioner/mask by porosity', 'Give a 5-min scalp massage clients rebook for'],
      theory: `<p>Basin work is where loyalty is won. <b>Position:</b> client neck supported, cape sealed, water 37–40°C (wrist test), pressure medium. <b>Double cleanse:</b> first wash lifts oil/styling (little lather), second builds lather and cleans scalp with finger pads — never nails — in circular zig-zags, front hairline → nape.</p><p><b>Conditioning:</b> squeeze excess water, apply mid-lengths → ends (roots only if dry scalp type needs it), comb through, 2–5 min. High porosity = richer mask + cooler rinse to lay cuticle. Always detangle gently from ends upward.</p><p><b>Massage (5 min):</b> effleurage (flat strokes) → petrissage (kneading) → friction (small circles on temples/occiput) → tapotement (light fingertips) → finishing strokes. Check pressure constantly.</p>`,
      visualSteps: [
        { e: '🌡️', t: 'Water test on wrist — warm, never hot; cape sealed, tissue dry' },
        { e: '🧴', t: 'First cleanse — coin of shampoo, scalp pads only, rinse fully' },
        { e: '🫧', t: 'Second cleanse — rich lather, zig-zag circles, clean hairline + nape' },
        { e: '💆', t: 'Massage sequence — strokes → knead → circles → fingertips, 5 min' },
        { e: '❄️', t: 'Condition + cool rinse — ends first, comb ends-up, seal cuticle' }
      ],
      activity: { type: 'checklist', title: 'Basin Self-Score', instructions: 'Rate your last basin service honestly. Aim 5/5 before Week 5.', items: ['Water temp + pressure checked', 'Double cleanse with pads (no nails)', 'Massage 5 min with 4 movements', 'Conditioner matched to porosity', 'No water down neck / in ears'] },
      threeD: { type: 'hair', title: '3D Lab: Water + Cuticle', description: 'See warm water lift cuticle scales (cleanse) vs cool rinse laying them flat (shine). Drag the temperature slider in your mind: warm open, cool seal.' },
      quiz: [
        { q: 'Ideal basin water temp:', options: ['37–40°C', '50°C+', 'Cold only', 'Boiling'], answer: 0, explain: 'Warm comforts and opens cuticle gently.' },
        { q: 'Shampoo with:', options: ['Finger pads in circles', 'Nails scratching', 'Palms only, no scalp touch', 'Brush'], answer: 0, explain: 'Pads clean without scratching.' },
        { q: 'Conditioner goes mainly:', options: ['Mid-lengths to ends', 'Directly on scalp always', 'On dry hair', 'Mixed with bleach'], answer: 0, explain: 'Ends are oldest and driest.' },
        { q: 'Detangle:', options: ['Ends upward in sections', 'Roots down in one pull', 'When dry with force', 'Never'], answer: 0, explain: 'Ends-up prevents breakage.' },
        { q: 'Cool final rinse helps:', options: ['Lay cuticle for shine', 'Strip colour faster', 'Freeze scalp', 'Nothing'], answer: 0, explain: 'Smooth cuticle reflects light.' }
      ],
      practical: { title: 'In-salon: 10 Basin Services', task: 'Perform 10 supervised shampoos + massages. Log water temp, products used, massage time. Collect 3 client comfort ratings (1–5).', outcome: 'Basin speed + comfort scores averaging 4.5/5.', checklist: ['10 services logged', '3 ratings collected', 'Mentor observed 2'] }
    },
    {
      title: 'Cutting Foundations: Sectioning & One-Length',
      weekLabel: 'Week 5', hours: '3 hrs',
      objectives: ['Section into 4–7 zones cleanly', 'Hold comb/shears and maintain tension', 'Cut a true one-length bob on mannequin', 'Cross-check and finish edges'],
      theory: `<p>Precision = <b>section + elevation + tension + line</b>. <b>Sections:</b> centre part ear-to-ear +nape-to-crown = 4 quarters; add horseshoe for control (7 sections). Subsections ≤ 1 cm, combed flat, tension even (stretch, don’t pull scalp).</p><p><b>One-length (solid form):</b> 0° elevation (all hair falls naturally), blunt line, cut palm-to-palm. Work nape → sides → front, guide from previous subsection (stationary guide). Cross-check: pull opposite directions, trim strays; check head upright + tilted.</p><p><b>Safety:</b> shears closed when moving, points down, never cut past second knuckle; call “closing” near ears. Mannequin first — minimum 3 practice cuts before models.</p>`,
      visualSteps: [
        { e: '📐', t: 'Section — centre + ear-to-ear + horseshoe, clips labelled' },
        { e: '🪮', t: 'Subsection 1 cm, comb flat, even tension, 0° elevation' },
        { e: '✂️', t: 'Blunt cut palm-to-palm, stationary guide, nape → sides' },
        { e: '🔁', t: 'Cross-check — comb opposite ways, head straight + forward' },
        { e: '✨', t: 'Finish — dry, check line, detail edges around ears/nape' }
      ],
      activity: { type: 'mixer', title: 'Elevation Lab', instructions: 'Match elevation to result: 0° / 45° / 90° / 180°.', items: [['0°', 'One-length, heaviest perimeter'], ['45° (graduated)', 'Stacked weight, shorter inside'], ['90°', 'Even layers'], ['180° (long layers)', 'Length + movement preserved']] },
      threeD: { type: 'hair', title: '3D Lab: Elevations & Lines', description: 'Orbit the head: see 0° fall vs 90° projection. The guide line glows — every subsection must meet it.' },
      quiz: [
        { q: 'One-length uses elevation:', options: ['0°', '90°', '180°', '45°'], answer: 0, explain: 'Natural fall, blunt perimeter.' },
        { q: 'Subsection size for precision:', options: ['≤1 cm', '5 cm chunks', 'Whole quarter at once', 'Random'], answer: 0, explain: 'Thin sections = control.' },
        { q: 'Stationary guide means:', options: ['Use previous cut as guide', 'Move guide each time', 'No guide', 'Guess'], answer: 0, explain: 'Consistency along the line.' },
        { q: 'Cross-check by:', options: ['Combing opposite + changing head position', 'Cutting again shorter', 'Only looking once', 'Wet only'], answer: 0, explain: 'Reveals uneven tension.' },
        { q: 'Shears when moving:', options: ['Closed, points down', 'Open for speed', 'Thrown', 'In mouth'], answer: 0, explain: 'Safety first.' }
      ],
      practical: { title: 'In-salon: 3 Mannequin One-Lengths', task: 'On mannequin: 3 one-length cuts with photos front/side/back. Measure perimeter evenness (≤3 mm variance). Mentor grades lines.', outcome: 'Straight, even perimeter you can repeat blindfolded (almost).', checklist: ['3 cuts photographed', 'Variance ≤3 mm', 'Mentor grade ≥7/10'] }
    },
    {
      title: 'Graduation & Layering + Face Shapes',
      weekLabel: 'Week 6', hours: '3 hrs',
      objectives: ['Build graduated bob (45°) and round layers (90°)', 'Choose cut for 5 face shapes', 'Blend weight without holes', 'Style the cut to sell it'],
      theory: `<p><b>Graduation (45°):</b> shorter inside, longer outside — builds weight/stack (classic bob). <b>Layers (90°+):</b> even projection removes weight, adds volume/movement. Over-direction pushes weight where you want it.</p><p><b>Face shapes:</b> Oval (anything) • Round (height + length, avoid wide volume) • Square (soften jaw, side part, texture) • Heart (weight at chin) • Long (width, fringe, avoid height). Always show two options and let client choose.</p><p><b>Blending:</b> point-cut/slide-cut to soften, never notch holes; check dry — wet hair lies ~1–2 cm longer. Cut less, check more.</p>`,
      visualSteps: [
        { e: '🔺', t: 'Graduated bob — 45°, shorter nape stacking to longer front' },
        { e: '⭕', t: 'Round layers — 90°, even projection, radial sections' },
        { e: '🪞', t: 'Face-shape match — recommend 2 options with mirror demo' },
        { e: '🪶', t: 'Blend — point-cut ends, check dry for ledges' },
        { e: '💨', t: 'Style to sell — blow-dry to reveal the shape' }
      ],
      activity: { type: 'cards', title: 'Face-Shape Prescriptions', instructions: 'Match shape to prescription.', items: [['Round', 'Height + length, flat sides'], ['Square', 'Soften jaw, side part'], ['Heart', 'Weight at chin/jaw'], ['Long', 'Width + fringe'], ['Oval', 'Most styles work']] },
      threeD: { type: 'hair', title: '3D Lab: Weight Maps', description: 'Heat-map view: graduation stacks weight low, layers distribute it. Rotate to see silhouette change.' },
      quiz: [
        { q: 'Graduated bob elevation ~', options: ['45°', '0°', '180°', '270°'], answer: 0, explain: 'Creates stacked weight.' },
        { q: 'Round face needs:', options: ['Height + length', 'Wide volume', 'Bowl fringe', 'Buzz'], answer: 0, explain: 'Elongate, narrow sides.' },
        { q: 'Layers mainly:', options: ['Remove weight + add movement', 'Add weight at perimeter', 'Straighten permanently', 'Add colour'], answer: 0, explain: 'Projection distributes weight.' },
        { q: 'Wet vs dry length:', options: ['Wet looks longer — cut cautiously', 'Identical', 'Dry longer', 'Ignore'], answer: 0, explain: 'Hair shrinks up when dry, esp. curly.' },
        { q: 'Blending tool:', options: ['Point/slide cutting', 'Razor on wet skin', 'Thinning everything', 'Fire'], answer: 0, explain: 'Softens lines without holes.' }
      ],
      practical: { title: 'In-salon: Graduated + Layered (Mannequin)', task: 'One graduated bob + one layered cut on mannequin. Photograph silhouettes. Get mentor to check weight balance.', outcome: 'Two distinct silhouettes with blended weight.', checklist: ['2 cuts photographed', 'No visible ledges', 'Mentor sign-off'] }
    },
    {
      title: 'Blow-Dry, Setting & Thermal Styling',
      weekLabel: 'Week 7', hours: '2.5 hrs',
      objectives: ['Section + tension blow-dry smooth/volume', 'Set rollers + pin curls', 'Flat-iron/curl safely with heat protectant', 'Finish with product cocktail'],
      theory: `<p>Heat styles by breaking/reforming hydrogen bonds — always on <b>dry-ish, protected</b> hair. <b>Blow-dry:</b> 80% rough-dry → section → nozzle down the shaft (cuticle direction) → round brush for curve/volume, paddle for sleek. Cool shot locks shape.</p><p><b>Setting:</b> rollers (volume/direction), pin curls (classic waves). Thermal: ≤185°C fine/damaged, ≤210°C coarse healthy; one slow pass beats three fast ones; never on wet hair; heat protectant mandatory.</p><p><b>Finish:</b> serum (ends), light spray (hold), shine check under two lights. Teach client the 5-min home version.</p>`,
      visualSteps: [
        { e: '💦', t: 'Prep — towel-blot, heat protectant, 80% rough dry' },
        { e: '🌀', t: 'Section + brush — nozzle down-shaft, tension + heat + cool shot' },
        { e: '🎀', t: 'Set — rollers/pin curls for direction + volume, cool fully' },
        { e: '🔥', t: 'Thermal — temp by hair type, 1 slow pass, no sizzle' },
        { e: '✨', t: 'Finish — serum ends, spray 20 cm away, home-teach' }
      ],
      activity: { type: 'mixer', title: 'Heat Match', instructions: 'Match hair type to safe max temp.', items: [['Fine / damaged', '≤185°C + protectant'], ['Medium healthy', '~185–200°C'], ['Coarse resistant', '≤210°C, 1 pass'], ['Wet hair', 'Never thermal-style wet']] },
      threeD: { type: 'hair', title: '3D Lab: Heat + Direction', description: 'Airflow arrows down the shaft smooth the cuticle; upward ruffles it. See volume vectors with round-brush lift.' },
      quiz: [
        { q: 'Nozzle direction:', options: ['Down the shaft', 'Up into cuticle', 'Random', 'At scalp only'], answer: 0, explain: 'Smooths cuticle = shine.' },
        { q: 'Cool shot用来:', options: ['Lock shape', 'Dry faster', 'Add oil', 'Curl permanently'], answer: 0, explain: 'Cooling sets hydrogen bonds.' },
        { q: 'Thermal on wet hair:', options: ['Forbidden — boil/fry damage', 'Fine', 'Better results', 'Faster'], answer: 0, explain: 'Steam bursts rupture the shaft.' },
        { q: 'Best pass technique:', options: ['One slow pass', 'Many fast scrubs', 'Clamp and hold 1 min', 'No protectant'], answer: 0, explain: 'Less damage, smoother result.' },
        { q: 'Heat protectant is:', options: ['Mandatory', 'Optional marketing', 'Only for colour', 'Never'], answer: 0, explain: 'Buffers heat to ~50% damage reduction.' }
      ],
      practical: { title: 'In-salon: 5 Blow-Drys', task: '5 blow-drys (2 sleek, 2 volume, 1 waves via iron). Time each (<30 min by #5). Photograph + get client smoothness score.', outcome: 'Sub-30-min versatile blow-dry you can charge for.', checklist: ['5 styles logged', 'Photos kept', 'Avg score ≥4/5'] }
    },
    {
      title: 'Braids & Classic Up-Styles',
      weekLabel: 'Week 8', hours: '2.5 hrs',
      objectives: ['Plait 3-strand, fishtail, Dutch/French', 'Build low chignon + high bun with balance', 'Pin invisibly + dress for occasions', 'Time a bridal trial routine'],
      theory: `<p>Up-styles = <b>prep + anchor + shape + dress</b>. Prep: light mousse + texture spray (clean hair slips). Anchor: ponytail/cushion/padding at balance point (occipital for chignon). Shape: smooth, twist, tuck; pins ripple-in (wavy side grabs more), crossed for hold, hidden.</p><p><b>Braids:</b> 3-strand (over), French (add sides), Dutch (under = 3D), fishtail (2 sections, fine pieces). Pancake gently for volume. Finish: shine spray, flyaway wax stick, trial photos in 3 angles + white/black backdrop.</p>`,
      visualSteps: [
        { e: '🧪', t: 'Prep — texture + light backcomb at crown for grip' },
        { e: '➰', t: 'Braid — even tension, feed clean sections, seal ends' },
        { e: '📍', t: 'Anchor — ponytail/padding at balance point, crossed pins' },
        { e: '🎀', t: 'Shape — twist/tuck/fan, hide ends, mirror-check silhouette' },
        { e: '📸', t: 'Dress + photo — flyaways tamed, 3 angles, accessory placed' }
      ],
      activity: { type: 'checklist', title: 'Up-Style Durability Test', instructions: 'After your style, test all 5: shake, bow, hug, wind (fan), 2-hour wear.', items: ['Shake test — no shifting', 'Bow test — pins hidden', 'Side silhouette balanced', 'No scalp pulling pain', 'Photo in 3 angles'] },
      threeD: { type: 'hair', title: '3D Lab: Balance Points', description: 'See anchor physics: weight centred over occiput holds; too-high/too-low topples. Pins as crossed vectors.' },
      quiz: [
        { q: 'Dutch braid feeds:', options: ['Under (3D)', 'Over (flat)', 'Random', 'No feed'], answer: 0, explain: 'Under-crossing pops the braid out.' },
        { q: 'Pins hold best:', options: ['Crossed + ripple side in', 'Straight + visible', 'One pin per kilo', 'Glue only'], answer: 0, explain: 'Cross + texture grip.' },
        { q: 'Clean slippery hair needs:', options: ['Texture prep', 'More oil', 'Water only', 'Nothing'], answer: 0, explain: 'Grit = grip.' },
        { q: 'Chignon balance point ~', options: ['Occipital bone', 'Forehead', 'Nape skin', 'Crown tip'], answer: 0, explain: 'Skull shelf supports weight.' },
        { q: 'Bridal trial must include:', options: ['3-angle photos + wear test', 'One selfie', 'Verbal only', 'No record'], answer: 0, explain: 'Reproducibility on wedding day.' }
      ],
      practical: { title: 'In-salon: Occasion Set (Model)', task: 'On a model: 1 braid + 1 up-style. Wear-test 2 hours, photograph 3 angles, record pins/products/time.', outcome: 'Bookable occasion service with photos.', checklist: ['Braid + up-style done', '2-hr wear test', 'Photos filed'] }
    },
    {
      title: 'Colour Theory & Formulation Basics',
      weekLabel: 'Week 9', hours: '2.5 hrs',
      objectives: ['Use the wheel: complementary/neutralising', 'Read levels 1–10 + tone (.1 ash–.6 red)', 'Mix + measure ratios accurately', 'Do strand + skin tests (theory)'],
      theory: `<p>Colour is physics + chemistry. <b>Wheel:</b> opposites neutralise (blue↔orange, violet↔yellow, green↔red). Ash (.1) cools gold; violet shampoos counter yellow.</p><p><b>Levels 1 (black) → 10 (lightest blonde); tone:</b> .0 natural, .1 ash, .3 gold, .4 copper, .5 mahogany, .6 red. <b>Developers:</b> 10vol (deposit/darken), 20vol (1–2 lift), 30vol (2–3 lift), 40vol (max lift, high damage — pros only).</p><p><b>Mix:</b> 1:1 or 1:1.5 per brand, scale-measured, bowl/tube labelled, timer on. <b>Tests:</b> skin (allergy) 48h before + strand (timing/result). No test = no colour.</p>`,
      visualSteps: [
        { e: '🎡', t: 'Wheel drill — name the neutraliser for orange, yellow, red' },
        { e: '🔢', t: 'Level chart — sort swatches 1→10 blind' },
        { e: '⚗️', t: 'Mix — weigh 1:1.5, label bowl, start timer on application' },
        { e: '🧪', t: 'Strand test — timing + result recorded before full head' },
        { e: '🤍', t: 'Skin test — 48h, inner elbow/behind ear, no rinse-cheating' }
      ],
      activity: { type: 'mixer', title: 'Neutraliser Mixer', instructions: 'Drag the right neutraliser to each unwanted tone.', items: [['Orange', 'Blue (.1 ash-blue)'], ['Yellow', 'Violet'], ['Red', 'Green'], ['Brassy gold', 'Blue-violet']] },
      threeD: { type: 'chem', title: '3D Lab: Colour Wheel', description: 'Spin the wheel: complementary pairs align opposite. Levels rise as a helix 1→10.' },
      quiz: [
        { q: 'Orange is neutralised by:', options: ['Blue', 'Red', 'Yellow', 'Black'], answer: 0, explain: 'Opposites on the wheel.' },
        { q: '20 vol lifts about:', options: ['1–2 levels', '5 levels', 'None', '10 levels'], answer: 0, explain: 'Standard lift.' },
        { q: 'Level 10 is:', options: ['Lightest blonde', 'Black', 'Red', 'Grey'], answer: 0, explain: '1 dark → 10 light.' },
        { q: 'Skin test timing:', options: ['48h before', '5 min before', 'After colour', 'Never'], answer: 0, explain: 'Allergy window.' },
        { q: 'Mix ratios must be:', options: ['Weighed per brand', 'Eyeballed', 'Doubled for speed', 'Halved to save'], answer: 0, explain: 'Chemistry demands accuracy.' }
      ],
      practical: { title: 'In-salon: Wheel + Swatch Drill', task: 'In-salon: arrange dummy swatches 1–10, formulate 2 mock Bowls (grey coverage, neutralise brass) with weighed ratios — no client application yet. Mentor checks.', outcome: 'Fluent level/tone reading + accurate mixing.', checklist: ['Swatch sort correct', '2 mock mixes weighed', 'Mentor sign-off'] }
    },
    {
      title: 'Full Colour, Retouch & Grey Coverage',
      weekLabel: 'Week 10', hours: '3 hrs',
      objectives: ['Apply virgin vs retouch correctly', 'Cover 70–100% grey with N + fashion mix', 'Time + emulsify + rinse topH-balance', 'Troubleshoot banding/drag'],
      theory: `<p><b>Virgin:</b> lengths first (or per brand), roots last (heat lifts faster) — or as brand directs. <b>Retouch:</b> roots only, 1 cm, do not drag through lengths (causes banding); refresh ends with demi/gloss in last 10 min if needed.</p><p><b>Grey:</b> needs N (natural) base for coverage — e.g. 6N + 6.4 for copper coverage; resistant grey = 20vol + extra time + fine sections. Process full time; cool rinse + acidic seal.</p><p><b>Banding fix:</b> de-band with careful re-application + blending, never overlap harshly. Document formula (brand+shade+vol+ratio+time) every time.</p>`,
      visualSteps: [
        { e: '🗺️', t: 'Map — quadrant sections, 1 cm subsections, roots vs lengths plan' },
        { e: '🖌️', t: 'Apply — retouch roots only, saturate without flooding scalp' },
        { e: '⏱️', t: 'Time — full development, check at ¾, emulsify last 5 min' },
        { e: '🚿', t: 'Rinse — cool, colour-safe shampoo, acidic conditioner' },
        { e: '📝', t: 'Record — full formula card for next visit' }
      ],
      activity: { type: 'scenario', title: 'Grey Coverage Calls', instructions: 'Choose the right formula move.', items: [['100% resistant grey, wants 6 copper', '6N + 6.4 with 20vol, fine sections'], ['Retouch with banded ends', 'Roots only + demi refresh last 10 min'], ['Client wants darker + shine', 'Demi deposit, 10vol, full time'], ['Unsure of allergy history', 'Skin test + postpone']] },
      threeD: { type: 'chem', title: '3D Lab: Root vs Lengths', description: 'Heat-map scalp: roots process faster (body heat). See why lengths-first vs roots-only matters.' },
      quiz: [
        { q: 'Retouch means:', options: ['Roots only ~1 cm', 'Whole head every time', 'Ends only', 'Random'], answer: 0, explain: 'Prevents banding.' },
        { q: 'Grey coverage needs:', options: ['N base in mix', 'Only fashion shade', 'Bleach', 'Water only'], answer: 0, explain: 'N fills lack of pigment.' },
        { q: 'Roots process faster because:', options: ['Scalp heat', 'More product', 'Magic', 'They are drier'], answer: 0, explain: 'Body heat accelerates.' },
        { q: 'Refresh faded ends with:', options: ['Demi/gloss last 10 min', '40vol overlap', 'Bleach', 'Nothing'], answer: 0, explain: 'Gentle deposit.' },
        { q: 'Always record:', options: ['Full formula + time', 'Nothing', 'Price only', 'Gossip'], answer: 0, explain: 'Reproducibility + liability.' }
      ],
      practical: { title: 'In-salon: Assist 2 Colour Services', task: 'Assist/observe 2 real colour services: mix, section, time, rinse. Write formula cards. No solo application until mentor approves.', outcome: 'Assisted colour competence + formula records.', checklist: ['2 assists logged', 'Formula cards filed', 'Mentor feedback'] }
    },
    {
      title: 'Highlights: Foils, Balayage & Toning',
      weekLabel: 'Week 11', hours: '3 hrs',
      objectives: ['Weave/slice with correct tension + saturation', 'Place foils (brick-lay) and paint balayage', 'Tone to target (ash/beige/pearl)', 'Maintain hair integrity (elasticity checks)'],
      theory: `<p><b>Foils:</b> weave (soft dimension) vs slice (bold); brick-lay stagger prevents lines; saturation edge-to-edge, seal firmly; check every 10 min; never overlap lightener on previously lightened hair.</p><p><b>Balayage:</b> hand-painted V/sweep, feathered roots, open-air or film; processes slower — great for lived-in looks. <b>Toning:</b> on damp, pre-lightened hair (level 9–10 for ash/pearl), 5–20 min visual check; violet kills yellow, blue kills orange.</p><p><b>Integrity:</b> elasticity test mid-process; if gummy — rinse immediately, protein + trim plan, honest talk. Olaplex-style bond builders per brand.</p>`,
      visualSteps: [
        { e: '🪮', t: 'Weave/slice — fine sections, even tension, no pushing lightener to scalp' },
        { e: '🥈', t: 'Foil — saturate, seal, brick-lay stagger' },
        { e: '🖌️', t: 'Balayage — feathered V, soft pressure, blend zone' },
        { e: '👁️', t: 'Check — every 10 min, elasticity pull, tone visual' },
        { e: '💜', t: 'Tone — damp hair, timed, cool rinse + bond care' }
      ],
      activity: { type: 'cards', title: 'Technique Picker', instructions: 'Match client want to technique.', items: [['Soft dimension, office-friendly', 'Fine weave foils'], ['Bold money-piece', 'Slice foils'], ['Lived-in, low maintenance', 'Balayage'], ['Yellow blonde → clean ash', 'Violet toner level 10'], ['Orange brass', 'Blue toner']] },
      threeD: { type: 'chem', title: '3D Lab: Lift Stages', description: 'Watch undercoat stages: red → orange → yellow → pale yellow. Toner lands only when lift is sufficient.' },
      quiz: [
        { q: 'Brick-lay means:', options: ['Staggered foils, no lines', 'Stacked same spot', 'No foils', 'Random'], answer: 0, explain: 'Stagger prevents harsh lines.' },
        { q: 'Balayage is:', options: ['Hand-painted, feathered', 'Cap only', 'All-over bleach', 'No technique'], answer: 0, explain: 'Freehand soft grow-out.' },
        { q: 'Ash toner needs lift to:', options: ['Level 9–10 pale yellow', 'Level 5 orange', 'Level 1', 'Any'], answer: 0, explain: 'Toner cannot lift, only refine.' },
        { q: 'Gummy elasticity mid-process =', options: ['Rinse now, stop', 'Add more bleach', 'Add heat', 'Ignore'], answer: 0, explain: 'Breakage warning.' },
        { q: 'Toner processes:', options: ['Visually, 5–20 min', '1 hour fixed', 'Overnight', 'No timing'], answer: 0, explain: 'Watch the tone develop.' }
      ],
      practical: { title: 'In-salon: Mannequin Foils + Balayage Panel', task: 'On mannequin: 10 foils (weave + slice mix) + 1 balayage panel + toner. Photograph lift stages + final tone.', outcome: 'Foil + paint competence with tone control.', checklist: ['10 foils neat', 'Balayage blended', 'Tone photographed'] }
    },
    {
      title: 'Client Care, Retail & Final Assessment',
      weekLabel: 'Week 12', hours: '3 hrs',
      objectives: ['Recommend home-care without pressure', 'Handle complaints + re-dos gracefully', 'Build portfolio + rebooking system', 'Pass theory + practical assessment'],
      theory: `<p>Retention > acquisition. <b>Retail script:</b> diagnose → prescribe 2–3 items (shampoo + conditioner + one styler) → demo on client → sample/sachet → follow-up message. Never push; explain <i>why for their hair</i>.</p><p><b>Complaints:</b> listen, apologise for experience, examine under good light, offer realistic fix + timeline (free re-do window e.g. 7 days for cut, 14 for colour), log and learn. <b>Rebook:</b> pre-book 4–8 weeks, reminder 48h, aftercare card with formula.</p><p><b>Assessment:</b> 30-Q theory (≥70%) + practical (consultation + basin + cut/style or colour-assist + finishing + home-care pitch) graded by mentor.</p>`,
      visualSteps: [
        { e: '🧴', t: 'Prescribe — 2–3 items matched to analysis, demo on client' },
        { e: '📅', t: 'Rebook — offer 2 times, 48h reminder, aftercare card' },
        { e: '🤲', t: 'Recover — listen, fix window, log lesson learned' },
        { e: '📸', t: 'Portfolio — before/after same light/angle, consent signed' },
        { e: '🏁', t: 'Assess — theory + practical under mentor observation' }
      ],
      activity: { type: 'checklist', title: 'Salon-Ready Checklist', instructions: 'You are salon-ready when all 7 are true.', items: ['Consultation in <10 min', 'Basin 15 min + comfort 4.5/5', 'One-length + layers repeatable', 'Blow-dry <30 min', 'Colour assist competent', 'Retail pitch without fear', 'Portfolio 10+ looks'] },
      threeD: { type: 'hair', title: '3D Lab: Your Growth Map', description: 'Your 12-week journey as a 3D path: each week a node lighting up. Review weak nodes before assessment.' },
      quiz: [
        { q: 'Retail should be:', options: ['Prescribed for their hair (2–3 items)', '10 items pushed', 'Never mentioned', 'Only cheapest'], answer: 0, explain: 'Diagnosis-driven, helpful.' },
        { q: 'Rebooking best practice:', options: ['Offer 2 times + reminder', 'Hope they return', 'No follow-up', 'Discount only'], answer: 0, explain: 'Frictionless retention.' },
        { q: 'Colour complaint fix window ~', options: ['~14 days', '1 year', 'Never', '1 hour only'], answer: 0, explain: 'Fair redo policy.' },
        { q: 'Portfolio photos need:', options: ['Same light/angle + consent', 'Filters + no consent', 'Blurry is fine', 'Stock photos'], answer: 0, explain: 'Honest, comparable, legal.' },
        { q: 'Pass mark for final theory:', options: ['≥70%', '≥30%', '100% or fail forever', 'No mark'], answer: 0, explain: 'Salon standard.' }
      ],
      practical: { title: 'FINAL: Full Service on Model', task: 'Consult → basin → cut OR colour-assist → style → home-care pitch → before/after portfolio. Mentor grades with rubric. Upload scores + photos.', outcome: 'Signed-off salon-ready hair stylist (foundation).', checklist: ['Full service done', 'Portfolio before/after', 'Mentor rubric ≥70%'] }
    }
  ]
};
