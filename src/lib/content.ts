export const breedStats = [
  { label: "Height", value: "17–20 in" },
  { label: "Weight", value: "35–50 lb" },
  { label: "Lifespan", value: "12–16 yrs" },
  { label: "Group", value: "Herding" },
  { label: "Energy", value: "Very high" },
  { label: "Coat", value: "Blue / Red" },
] as const;

export const temperamentTraits = [
  {
    title: "Loyal to the bone",
    body: "Heelers bond hard with their people. They appoint themselves guardian of home, herd, and habit.",
  },
  {
    title: "Work-wired intelligence",
    body: "Independent problem-solvers. Give them a job or they invent one — usually involving your shoes, kids, or the mailman.",
  },
  {
    title: "Reserved with strangers",
    body: "That watchful glint is breed-typical. Early socialization keeps suspicion from tipping into reactivity.",
  },
  {
    title: "Drive without an outlet",
    body: "Bored Heelers dig, bark, nip, and plot. Exhausted Heelers nap. Plan for the second outcome.",
  },
] as const;

export const careBlocks = [
  {
    title: "Coat & shed cycles",
    body: "Short double coat. Weekly brush most of the year; daily during seasonal blowouts. Bath only when needed — the coat is weather-built.",
  },
  {
    title: "Ears, nails, teeth",
    body: "Check ears after dusty runs. Trim nails every 2–4 weeks. Dental care matters for a breed that heels with its teeth.",
  },
  {
    title: "Fuel for the engine",
    body: "Active working dogs need quality protein and measured portions. Adjust calories to real output, not wishful walks.",
  },
  {
    title: "Health watchlist",
    body: "Ask breeders about PRA, deafness, hip dysplasia, and elbow scores. Longevity is strong when genetics and lifestyle align.",
  },
] as const;

export const trainingPillars = [
  {
    title: "Daily mileage",
    body: "Not a stroll-around-the-block breed. Aim for vigorous runs, fetch with rules, bikejoring, hiking, or herding practice.",
  },
  {
    title: "Brain work",
    body: "Nosework, tricks, obedience sequences, puzzle feeders. Mental fatigue is as real as physical for this breed.",
  },
  {
    title: "Heel instinct management",
    body: "Nipping at heels is coded in. Redirect early with structured play and clear “off” language — never reward the chase of kids.",
  },
  {
    title: "Consistent leadership",
    body: "Positive, firm, predictable. Heelers respect clarity. Soft inconsistency reads as an open invitation to negotiate.",
  },
] as const;

export const historyBeats = [
  {
    era: "1800s",
    title: "Built for Australian cattle",
    body: "European herding dogs struggled in harsh Australian conditions. Stockmen needed a tough, biting heeler that could move cattle across vast distances.",
  },
  {
    era: "1840s–90s",
    title: "Dingo blood, deliberate craft",
    body: "Breeding programs mixed collie-types with dingoes and other working dogs, refining a compact athlete with endurance, bite, and grit.",
  },
  {
    era: "Today",
    title: "From station to suburb",
    body: "Still a cattle dog at heart — now also excelling in agility, disc, herding trials, and as a fiercely devoted family partner for active homes.",
  },
] as const;

export const colorNotes = [
  {
    name: "Blue",
    body: "Blue, blue-mottled, or blue-speckled with or without tan markings on head and legs. The classic “Blue Heeler” look.",
  },
  {
    name: "Red Speckle",
    body: "Even red speckle throughout. Same dog underneath — same drive, same loyalty, same need for a job.",
  },
] as const;

export const fitChecks = [
  {
    id: "exercise",
    prompt: "I can give 60–120+ minutes of real exercise most days",
  },
  {
    id: "job",
    prompt: "I’m ready to train, sport, or give this dog ongoing mental work",
  },
  {
    id: "experience",
    prompt: "I have (or will get) experience with high-drive herding breeds",
  },
  {
    id: "space",
    prompt: "My home and schedule can handle a vigilant, busy dog",
  },
  {
    id: "social",
    prompt: "I will socialize early and manage stranger wariness thoughtfully",
  },
  {
    id: "kids",
    prompt: "If kids are in the home, I will supervise and teach both sides manners",
  },
  {
    id: "longgame",
    prompt: "I want a 12–16 year partnership with a demanding athlete",
  },
] as const;

export const faqs = [
  {
    q: "Is a Blue Heeler a good first dog?",
    a: "Usually no. They’re brilliant, but they punish soft inconsistency and under-stimulation. First-time owners succeed only with serious research, training support, and a high-activity lifestyle.",
  },
  {
    q: "Are they apartment dogs?",
    a: "Possible if you over-deliver on exercise and enrichment — not if “apartment” means limited outdoor time. The breed needs output, not square footage alone.",
  },
  {
    q: "Do they shed a lot?",
    a: "Moderate most of the year; heavy during seasonal coat blows. Expect blue or red hair on everything twice a year.",
  },
  {
    q: "Are they aggressive?",
    a: "They’re protective and can be sharp with strangers or weird dog energy if poorly socialized. That’s management and training — not an excuse to skip either.",
  },
  {
    q: "Blue vs Red — temperament difference?",
    a: "Color is coat, not personality. Drive and temperament vary by line and individual, not blue vs red.",
  },
  {
    q: "Where should I get one?",
    a: "Start with ethical breeders who health-test and match puppies to lifestyle — or reputable breed rescue. Avoid impulse buys from unverified sellers.",
  },
] as const;

export const resources = [
  {
    title: "Australian Cattle Dog Club of America",
    href: "https://www.acdca.org/",
    note: "Parent club — standard, education, events, breeder ethics.",
  },
  {
    title: "AKC Breed Page",
    href: "https://www.akc.org/dog-breeds/australian-cattle-dog/",
    note: "Official stats, groups, and marketplace starting points.",
  },
  {
    title: "ACD Rescue",
    href: "https://www.acdca.org/",
    note: "Explore club-linked rescue channels before buying on impulse.",
  },
] as const;
