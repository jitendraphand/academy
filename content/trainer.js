// Trainer-led classroom wrapper: converts the existing self-study activity
// (checklist / cards / mixer / scenario) into a projector-friendly classroom script.
// No content data is rewritten — this function re-presents it for trainer use.

function toClassroom(activity) {
  const type = activity.type;
  const base = {
    title: activity.title,
    instructions: activity.instructions,
    items: activity.items,
  };
  if (type === 'checklist') {
    return {
      ...base,
      mode: 'Live demonstration checklist',
      trainerScript: 'Perform each step live on model / mannequin. After each step, ask the class “what did you see?” and tick it on screen together.',
      taskForClass: 'Front two rows call out misses. Back rows note one improvement each.',
      timing: '20 min demo + tick',
      materials: 'Model / mannequin, full kit, projector timer',
    };
  }
  if (type === 'cards') {
    return {
      ...base,
      mode: 'Rapid-fire oral drill',
      trainerScript: 'Show the left column only. Cold-call trainees for the match, then flip on screen. Keep pace under 30 sec per card.',
      taskForClass: 'Pairs whisper the answer first, then one pair answers aloud. Trainer corrects with the “why”.',
      timing: '15 min drill',
      materials: 'Projector, whiteboard for scores',
    };
  }
  if (type === 'mixer') {
    return {
      ...base,
      mode: 'Match-and-defend',
      trainerScript: 'Reveal prompts one by one. A trainee proposes the match AND defends it in one sentence before you reveal.',
      taskForClass: 'Half the class argues for option A, half for B. Trainer closes with the standard.',
      timing: '20 min debate + reveal',
      materials: 'Projector, no devices — hands up only',
    };
  }
  return {
    ...base,
    mode: 'Scenario clinic',
    trainerScript: 'Read the scenario aloud. Give pairs 2 minutes to agree the action, then hear 2–3 answers before revealing the standard response.',
    taskForClass: 'Each pair must cite the rule (hygiene / RAG / strand-test / referral) behind their answer.',
    timing: '20 min clinic (4–5 scenarios)',
    materials: 'Printed scenario slips (optional), projector',
  };
}

module.exports = { toClassroom };
