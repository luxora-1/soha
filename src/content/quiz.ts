/**
 * The two-minute quiz. Shared by the client (renders the steps) and the
 * server (validates submitted answers), so option keys are the contract.
 *
 * The quiz gathers context and an email; it makes no clinical determination.
 * A clinician decides after the consult, and the copy says so.
 */

export type QuizOption = { key: string; label: string };

export type QuizQuestion = {
  key: string;
  type: "single" | "multi";
  question: string;
  hint?: string;
  options: readonly QuizOption[];
};

export const quizQuestions = [
  {
    key: "symptoms",
    type: "multi",
    question: "What's been going on?",
    hint: "Choose everything that applies.",
    options: [
      { key: "hot-flashes", label: "Hot flashes or night sweats" },
      { key: "sleep", label: "Trouble sleeping" },
      { key: "mood", label: "Mood swings or irritability" },
      { key: "energy", label: "Low energy" },
      { key: "focus", label: "Brain fog" },
      { key: "libido", label: "Low libido" },
      { key: "dryness", label: "Vaginal dryness or discomfort" },
      { key: "weight", label: "Weight changes" },
    ],
  },
  {
    key: "stage",
    type: "single",
    question: "Where are you in the transition?",
    options: [
      { key: "changing", label: "Still having periods, but they've changed" },
      { key: "recent", label: "No period for less than a year" },
      { key: "post", label: "No period for more than a year" },
      { key: "unsure", label: "Not sure" },
    ],
  },
  {
    key: "current",
    type: "multi",
    question: "What are you using today?",
    hint: "Choose everything that applies.",
    options: [
      { key: "nothing", label: "Nothing yet" },
      { key: "patch", label: "An estrogen patch or gel" },
      { key: "progesterone-pill", label: "A progesterone pill" },
      { key: "oral", label: "Oral hormone tablets" },
      { key: "supplements", label: "Supplements" },
      { key: "other", label: "Something else" },
    ],
  },
  {
    key: "priority",
    type: "single",
    question: "What matters most right now?",
    options: [
      { key: "sleep", label: "Sleeping through the night" },
      { key: "flashes", label: "Fewer hot flashes" },
      { key: "mood", label: "A steadier mood" },
      { key: "energy", label: "Energy and focus" },
      { key: "intimacy", label: "Comfort and intimacy" },
      { key: "all", label: "All of it" },
    ],
  },
  {
    key: "age",
    type: "single",
    question: "How old are you?",
    options: [
      { key: "under-40", label: "Under 40" },
      { key: "40-44", label: "40 to 44" },
      { key: "45-49", label: "45 to 49" },
      { key: "50-54", label: "50 to 54" },
      { key: "55-59", label: "55 to 59" },
      { key: "60-plus", label: "60 or over" },
    ],
  },
] as const satisfies readonly QuizQuestion[];

export type QuizQuestionKey = (typeof quizQuestions)[number]["key"];

/** Submitted answers: question key → chosen option keys. */
export type QuizAnswers = Partial<Record<QuizQuestionKey, string[]>>;

export const quizCopy = {
  title: "See if Estrada is right for you",
  intro: "Two minutes. No payment. An OB/GYN makes the final call.",
  progress: (step: number, total: number) => `Step ${step} of ${total}`,
  back: "Back",
  next: "Continue",
  skip: "Skip",
  close: "Close",
  email: {
    heading: "Where should we send your results?",
    body: "We'll email your summary and hold your place in line for Estrada. Nothing else.",
    label: "Email address",
    placeholder: "you@example.com",
    submit: "See my results",
    submitting: "One moment…",
  },
  result: {
    heading: "Thanks. You're on the list.",
    lead: "Here's what your answers tell us. A clinician makes the final decision after your consult.",
    youSaid: "You told us about:",
    nothingSelected: "You didn't pick any symptoms, and that's fine. A clinician will talk it through with you.",
    next: "When Estrada opens in your state, we'll email you a link to a short online visit.",
    done: "Done",
  },
} as const;

/** Result notes per symptom, as claims to verify. Rendered inside <Unverified> by the server. */
export const quizResultNotes = {
  "hot-flashes": { text: "Estradiol is the hormone most often prescribed for hot flashes and night sweats.", verify: "estradiol for vasomotor symptoms" },
  sleep: { text: "Progesterone is known for helping many women sleep more deeply.", verify: "progesterone and sleep" },
  mood: { text: "Steady estradiol levels, rather than peaks and dips, are linked to a steadier mood.", verify: "estradiol and mood" },
  energy: { text: "Better sleep and steadier hormones tend to bring energy back.", verify: "hormone therapy and energy" },
  focus: { text: "Many women report clearer thinking once estradiol levels are restored.", verify: "estradiol and cognition" },
  libido: { text: "Estradiol supports libido and comfort; your clinician can tailor the dose.", verify: "estradiol and libido" },
  dryness: { text: "Estradiol restores vaginal tissue, which eases dryness and discomfort.", verify: "estradiol and vaginal atrophy" },
  weight: { text: "Hormone therapy doesn't cause weight loss, but steadier sleep and energy make healthy habits easier.", verify: "hormone therapy and weight" },
} as const satisfies Record<string, { text: string; verify: string }>;
