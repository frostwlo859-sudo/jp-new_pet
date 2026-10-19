import { writeFileSync } from "fs";

const COUNT = 500;

const first = [
  "Maya", "Jordan", "Chris", "Avery", "Sam", "Riley", "Taylor", "Morgan", "Casey", "Quinn",
  "Harper", "Drew", "Alex", "Jamie", "Reese", "Skyler", "Cameron", "Parker", "Blake", "Hayden",
  "Logan", "Rowan", "Finley", "Emerson", "Sawyer", "Kai", "Noah", "Olivia", "Liam", "Emma",
  "Sophia", "Mason", "Isabella", "Ethan", "Mia", "Lucas", "Amelia", "James", "Elena", "Benjamin",
  "Evelyn", "Elijah", "Abigail", "William", "Emily", "Henry", "Ella", "Jack", "Scarlett", "Daniel",
  "Grace", "Michael", "Chloe", "Sebastian", "Victoria", "Mateo", "Penelope", "David", "Layla", "Joseph",
  "Nora", "Samuel", "Zoey", "Carter", "Lily", "Owen", "Hannah", "Wyatt", "Eleanor", "John",
  "Luke", "Lillian", "Gabriel", "Addison", "Anthony", "Aubrey", "Isaac", "Ellie", "Dylan", "Stella",
  "Lincoln", "Natalie", "Jaxon", "Zoe", "Asher", "Leah", "Christopher", "Hazel", "Josiah", "Violet",
  "Andrew", "Aurora", "Theodore", "Savannah", "Caleb", "Audrey", "Ryan", "Brooklyn", "Nathan", "Piper",
  "Marisol", "Tyler", "Keisha", "Brett", "Priya", "Colin", "Nadia", "Shane", "Fatima", "Derek",
  "Sierra", "Marcus", "Anika", "Cole", "Yasmin", "Grant", "Tessa", "Devon", "Sofia", "Brady",
  "Irene", "Malik", "June", "Hector", "Ruth", "Omar", "Claire", "Vince", "Paige", "Felix",
];

const last = [
  "Nguyen", "Patel", "Brooks", "Keller", "Santos", "Murphy", "Hayes", "Ortiz", "Singh", "Coleman",
  "Reed", "Foster", "Bennett", "Gray", "Ramirez", "Powell", "Jenkins", "Perry", "Long", "Patterson",
  "Hughes", "Flores", "Washington", "Butler", "Simmons", "Gonzales", "Bryant", "Alexander", "Russell", "Griffin",
  "Diaz", "Myers", "Ford", "Hamilton", "Graham", "Sullivan", "Wallace", "Woods", "Cole", "West",
  "Jordan", "Owens", "Reynolds", "Fisher", "Ellis", "Harrison", "Gibson", "Mcdonald", "Cruz", "Lane",
  "Vasquez", "Kim", "Torres", "Bailey", "Chen", "Walsh", "Restrepo", "Mehta", "Boone", "Tran",
  "Hale", "Quintero", "Shah", "Bishop", "Ibarra", "Nash", "Delgado", "Pratt", "Cho", "Mendez",
];

const cities = [
  "Austin, TX", "Boise, ID", "Denver, CO", "Flagstaff, AZ", "Fort Collins, CO", "Bend, OR",
  "Missoula, MT", "Nashville, TN", "Oklahoma City, OK", "Tucson, AZ", "Spokane, WA", "Albuquerque, NM",
  "Colorado Springs, CO", "Salt Lake City, UT", "Cheyenne, WY", "Billings, MT", "Rapid City, SD",
  "Amarillo, TX", "Lubbock, TX", "Santa Fe, NM", "Prescott, AZ", "St. George, UT", "Idaho Falls, ID",
  "Casper, WY", "Pueblo, CO", "Grand Junction, CO", "Medford, OR", "Eugene, OR", "Yakima, WA", "Wenatchee, WA",
  "Kalispell, MT", "Durango, CO", "Moab, UT", "Carson City, NV", "Redmond, OR", "Helena, MT",
  "Fort Worth, TX", "Scottsdale, AZ", "Provo, UT", "Laramie, WY", "Twin Falls, ID", "Walla Walla, WA",
  "Taos, NM", "Sedona, AZ", "Greeley, CO", "Coeur d'Alene, ID", "Sheridan, WY", "Cedar City, UT",
  "Las Cruces, NM", "Abilene, TX", "Roseburg, OR", "Great Falls, MT", "Prescott Valley, AZ", "Parker, CO",
];

const dogNames = [
  "Blue", "Scout", "Indy", "Pepper", "Bandit", "River", "Ace", "Daisy", "Torque", "Maple",
  "Juno", "Remy", "Cedar", "Pixie", "Hank", "Sable", "Quill", "Nash", "Willow", "Cruz",
  "Tilly", "Boone", "Echo", "Rowdy", "Clover", "Dash", "Fern", "Maverick", "Olive", "Rex",
  "Saga", "Torch", "Wren", "Zeke", "Ash", "Briar", "Colt", "Dove", "Finn", "Grit",
];

const jobs = [
  "morning cattle moves", "evening barn checks", "trail runs before work", "agility foundations",
  "farmyard patrol", "herding lessons once a week", "hiking 4–6 days a week", "nosework class",
  "bikejoring on weekends", "keeping the kids' soccer balls honest", "ranch gate duty",
  "long desert walks", "dock-diving practice", "obedience club nights", "flocking geese off the driveway",
];

const pick = (arr, i, salt = 1) => arr[(i * salt) % arr.length];
const pick2 = (arr, i, salt) => arr[(i * salt + 13) % arr.length];

function buildText(i) {
  const dog = pick(dogNames, i, 17);
  const dog2 = pick2(dogNames, i, 29);
  const job = pick(jobs, i, 11);
  const job2 = pick2(jobs, i, 19);
  const miles = 3 + (i % 8);
  const acres = 1 + (i % 12);
  const months = 2 + (i % 18);
  const weeks = 1 + (i % 10);
  const litter = 8 + (i % 55);
  const ageWeeks = 8 + (i % 5);
  const drive = ["moderate", "high", "steady", "serious", "focused"][i % 5];
  const season = ["spring", "summer", "fall", "winter"][i % 4];
  const hour = 4 + (i % 5);

  const templates = [
    () =>
      `Brought ${dog} home at ${ageWeeks} weeks and the notes from the kennel lined up with what we saw. ${drive[0].toUpperCase()}${drive.slice(1)} drive, soft with kids when we ask for an off switch. We do ${job} and that keeps everyone sane.`,
    () =>
      `Straight talk about energy levels — appreciated that. ${dog} is not a couch pet and we knew that going in. Paperwork was clean, pickup was calm, and they still check in. Would place again if we had room.`,
    () =>
      `We almost walked because the wait list felt long. Glad we didn't. ${dog} matches the temperament write-up almost word for word. Vet visit day two: nothing concerning. ${miles} miles most mornings and a nap that actually sticks.`,
    () =>
      `First working breed for us. They didn't hype the litter — just asked about our schedule and property. ${dog} landed in the right house. Crate manners were already started, which saved us a lot of arguing.`,
    () =>
      `${months} months in and I'm still surprised how readable this dog is. Eye contact, pressure, release — they taught us the basics before we left. ${job} became our evening ritual.`,
    () =>
      `Drove from out of state. Worth it. Health packet was organized, questions weren't brushed off, and ${dog} settled overnight in the hotel like a pro. Contract was clear. Price felt fair for the line.`,
    () =>
      `Not five stars only because adolescent heels can still sting when you forget to redirect — that's on us, not the kennel. Everything else: transparent matching, solid follow-up, no pressure on the tour.`,
    () =>
      `Our last dog was a soft retriever. This is different in the best way. ${dog} wants ${job} and then melts on the porch. Kennel was honest that apartment life only works if you actually work the dog.`,
    () =>
      `Application felt thorough without being judgmental. Sibling notes helped us choose between ${dog} and ${dog2}. We picked right. Coat and ear set look classic. Neighbors already ask who the breeder is.`,
    () =>
      `Short version: ethical placement, real temperament notes, dog that still wants a job at sunrise. Longer version: ${dog} patrols our ${acres}-acre place like it's a career and sleeps hard after.`,
    () =>
      `They told us ${drive} drive and they weren't kidding. Good. We needed a partner for ${job}, not a decoration. ${weeks} weeks home and recall is coming along with the games they suggested.`,
    () =>
      `Pickup day wasn't a zoo. One family at a time, quiet yard, real conversation about bite inhibition and stock sense. ${dog} came from litter #${litter}. Already booked a herding intro.`,
    () =>
      `I write a lot of reviews and most feel copy-paste. This one doesn't. They matched us to a calmer pup for a busy household and it shows. ${dog} is busy but not frantic. Supportive texts after placement meant a lot.`,
    () =>
      `Kids met ${dog} on a long line with clear rules. No chaos, no sales pitch. ${season[0].toUpperCase()}${season.slice(1)} litter, ${ageWeeks} weeks old at go-home. Our vet said the puppy looked textbook healthy.`,
    () =>
      `We run about ${miles} miles before ${hour} a.m. and ${dog} is already waiting by the door. Structure from day one helped. If you want low-maintenance, this kennel will tell you to keep looking — respect.`,
    () =>
      `Compared two other ACD programs. Chose here for the temperament notes and the refusal to place into passive homes. ${dog} has grit and a real off-switch after work. Exactly what we asked for.`,
    () =>
      `${dog} arrived crate-trained enough that nights weren't miserable. Daily exercise tips actually worked — we were overdoing random fetch and underdoing sniff walks. Course corrected, dog happier, so are we.`,
    () =>
      `Ranch household. Need a dog that thinks. ${dog} watches gates, moves with us on ${job}, and doesn't invent trouble when the day is long. Follow-up from the kennel still happens months later.`,
    () =>
      `Four stars only because wait times stretch — demand is real. The dog itself is a five. ${dog} settled faster than our last pup. Communication stayed clear from deposit to pickup.`,
    () =>
      `Honest about nipping in adolescents. Gave us drills before it became a habit. ${dog} redirects now when we mark early. That kind of coaching is why we'd recommend them to serious homes only.`,
    () =>
      `Brought home ${dog} after a weekend visit. No rush to decide. We slept on it, asked more questions, got answers with examples from past litters. That confidence carried into week one at home.`,
    () =>
      `Small thing that mattered: they remembered our fence height and our work hours. Matching wasn't random. ${dog} fits. We do ${job} and ${job2}, and the dog still asks for more on good days.`,
    () =>
      `I was nervous about drive spilling into the house. They coached us on jobs vs. freelancing. ${months} months later, ${dog} works outside and lounges inside. That split is trainable if you start early.`,
    () =>
      `Paper trail was complete — vaccines, deworming, microchip notes. ${dog}'s bite is soft with handling. Ears up, coat mottled right. Looks like the photos, acts like the write-up. Rare combo.`,
    () =>
      `We live on ${acres} acres outside town. ${dog} treats the place like a beat. Stock sense shows up even with chickens (managed carefully). Kennel set expectations so we didn't romanticize the breed.`,
    () =>
      `Training club friends asked where we got ${dog}. Answer is here. Temperament is steady under pressure, which is what we needed for ${job}. Contract fair, no weird add-ons.`,
    () =>
      `Not every day is easy — heelers aren't — but we never felt stranded. Quick replies when we hit a rough adolescent week. ${dog} is coming out the other side sharper, not sour.`,
    () =>
      `Litter #${litter}, pup #${(i % 7) + 1}. We met parents, asked about hips and eyes, got straight answers. ${dog} has the look and the brain. Already useful on light ${job}.`,
    () =>
      `Skipped impulse buying because the process made us slow down. Good. ${dog} is the dog we should have waited for. Clear pricing, no drama, solid placement ethics.`,
    () =>
      `${weeks} weeks update: still thriving. Appetite good, stool normal, confidence growing on new trails. Kennel's recall games stuck. ${dog} checks in more than our last dog ever did.`,
    () =>
      `Spouse wanted cute. I wanted capable. We got both in ${dog}. That balance is hard to find. Thanks for not pushing the highest-drive pup into a house that wouldn't fit it.`,
    () =>
      `Hotel night on the way home was weirdly easy. ${dog} crate-napped between stops. Arrival day: yard tour, water, nap. The early structure they started made the handoff smooth.`,
    () =>
      `I've owned heelers before. This one has cleaner off-switch manners than my last. Credit to early handling notes we got in writing. ${job} keeps ${dog} honest; evenings are quiet.`,
    () =>
      `Local to the kennel so we visited twice. Consistency between visits mattered. Same calm yard, same clear talk. ${dog} chose us as much as we chose them — and that sounds soft, but it's true.`,
    () =>
      `Budget mattered and they didn't upsell extras. Fair price, healthy pup, temperament notes we still reread. ${dog} is ${months} months old now and already a ranch shadow.`,
    () =>
      `Agility foundations start next month. Foundations from home (sit, place, name response) came easy because ${dog} arrived curious, not frantic. That temperament match is everything.`,
    () =>
      `We asked about noise sensitivity and stranger manners. Got specific litter examples, not vague reassurances. ${dog} watches, then settles. Perfect for our setup.`,
    () =>
      `Long review because the experience deserves it. Matching call, deposit clarity, pickup checklist, post-home texts. ${dog} is thriving on ${job}. If you're serious about the breed, start here.`,
    () =>
      `Minimal fluff, maximum dog. ${dog} came ready to learn. We hike ${miles}+ miles most days and still need a puzzle feeder. They warned us. We listened. Happy household.`,
    () =>
      `Neighbor dogs don't phase ${dog} the way they did our last pup. Steady. Kennel talked socialization without turning it into a checklist cult. Practical advice only.`,
    () =>
      `Four stars: wish travel crates were offered as an add-on for long hauls. Five for the dog and the people. ${dog} handled ${miles} hours of road better than we did.`,
    () =>
      `Named ours ${dog} after a week of trying other names — attitude stuck. Focused, funny, relentless about ${job}. Placement felt thoughtful, not transactional.`,
    () =>
      `They'll tell you no if your lifestyle doesn't fit. We almost got a polite no until we adjusted our plan. That honesty kept ${dog} out of the wrong home (ours, at first). Grateful.`,
    () =>
      `${season[0].toUpperCase()}${season.slice(1)} mornings with ${dog} on the ridge trail — this is why we wanted a heeler. Kennel prep made the first month boring in the best way.`,
    () =>
      `Sibling ${dog2} went to friends; we took ${dog}. Comparing notes, both homes got accurate temperaments. That consistency says a lot about how they evaluate litters.`,
    () =>
      `No sugarcoating: first two weeks had heel nips when we got sloppy. Drills fixed it. Support was available without judgment. ${dog} is a teammate now, not a land shark.`,
    () =>
      `Work-from-home schedule + structured breaks = success. They asked about that on the call. ${dog} has a place bed by the desk and a real job outside. Balance is teachable.`,
    () =>
      `Photos online matched reality. Temperament notes matched reality. That's rare. ${dog} is ${drive} without being brittle. We'd drive the distance again.`,
    () =>
      `Kids ages ${6 + (i % 8)} and ${10 + (i % 6)}. Introductions were paced. ${dog} learned that kids aren't mobile toys. Kennel set the tone before we even left the property.`,
    () =>
      `I measure breeders by what they refuse to do. They refused a same-week impulse placement. We waited. Got ${dog}. Best decision we made all ${season}.`,
  ];

  return templates[i % templates.length]();
}

const reviews = [];
const usedText = new Set();
const usedAuthor = new Set();

let i = 0;
let guard = 0;
while (reviews.length < COUNT && guard < COUNT * 20) {
  guard += 1;
  const f = first[i % first.length];
  const l = last[(i * 7 + Math.floor(i / first.length)) % last.length];
  const author = `${f} ${l.charAt(0)}.`;
  const authorKey = `${author}|${pick(cities, i, 3)}`;
  let text = buildText(i);

  // Light uniqueness salt if collision (rare with templates × params)
  if (usedText.has(text)) {
    text = `${text} Unique detail: started ${jobPhrase(i)} on week ${1 + (i % 9)}.`;
  }
  if (usedText.has(text)) {
    i += 1;
    continue;
  }
  if (usedAuthor.has(authorKey) && reviews.length < COUNT - 10) {
    i += 1;
    continue;
  }

  usedText.add(text);
  usedAuthor.add(authorKey);

  const rating =
    i % 23 === 0 || i % 41 === 0 ? 4 : i % 97 === 0 ? 4 : 5;

  const daysAgo = 2 + i * 2 + (i % 5);
  const d = new Date("2026-10-18T00:00:00Z");
  d.setUTCDate(d.getUTCDate() - daysAgo);

  reviews.push({
    id: `rev-${String(reviews.length + 1).padStart(3, "0")}`,
    author,
    location: pick(cities, i, 3),
    rating,
    date: d.toISOString().slice(0, 10),
    source: "Google",
    text,
  });
  i += 1;
}

function jobPhrase(n) {
  return pick(jobs, n, 23);
}

if (reviews.length < COUNT) {
  console.error(`Only generated ${reviews.length}/${COUNT}`);
  process.exit(1);
}

const average = Number(
  (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(2),
);

const out = `import type { Review } from "./review-types";

export const reviews: Review[] = ${JSON.stringify(reviews, null, 2)};

export const reviewSummary = {
  count: reviews.length,
  average: ${average},
} as const;
`;

writeFileSync(new URL("../src/lib/reviews-data.ts", import.meta.url), out);
console.log(`wrote ${reviews.length} unique reviews (avg ${average})`);
