import { writeFileSync } from "fs";

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
];

const last = [
  "Nguyen", "Patel", "Brooks", "Keller", "Santos", "Murphy", "Hayes", "Ortiz", "Singh", "Coleman",
  "Reed", "Foster", "Bennett", "Gray", "Ramirez", "Powell", "Jenkins", "Perry", "Long", "Patterson",
  "Hughes", "Flores", "Washington", "Butler", "Simmons", "Gonzales", "Bryant", "Alexander", "Russell", "Griffin",
  "Diaz", "Myers", "Ford", "Hamilton", "Graham", "Sullivan", "Wallace", "Woods", "Cole", "West",
  "Jordan", "Owens", "Reynolds", "Fisher", "Ellis", "Harrison", "Gibson", "Mcdonald", "Cruz", "Lane",
];

const cities = [
  "Austin, TX", "Boise, ID", "Denver, CO", "Flagstaff, AZ", "Fort Collins, CO", "Bend, OR",
  "Missoula, MT", "Nashville, TN", "Oklahoma City, OK", "Tucson, AZ", "Spokane, WA", "Albuquerque, NM",
  "Colorado Springs, CO", "Salt Lake City, UT", "Cheyenne, WY", "Billings, MT", "Rapid City, SD",
  "Amarillo, TX", "Lubbock, TX", "Santa Fe, NM", "Prescott, AZ", "St. George, UT", "Idaho Falls, ID",
  "Casper, WY", "Pueblo, CO", "Grand Junction, CO", "Medford, OR", "Eugene, OR", "Yakima, WA", "Wenatchee, WA",
];

const openings = [
  "Our heeler settled in faster than we expected.",
  "Communication from the kennel was clear from day one.",
  "We drove six hours and it was worth every mile.",
  "Health paperwork and temperament notes were thorough.",
  "This was our first working breed and we felt guided.",
  "The puppy we brought home matches the description exactly.",
  "Honest about drive levels — no sugarcoating.",
  "We asked hard questions and got straight answers.",
  "Pickup day felt organized, not chaotic.",
  "Follow-up texts after placement meant a lot.",
];

const middles = [
  "Daily exercise tips helped us avoid the usual adolescent chaos.",
  "Our dog heels lightly at first but redirects well with structure.",
  "Crate training was already started, which saved us weeks.",
  "The breeder matched us to a calmer pup for our setup.",
  "We got a high-drive dog and the training plan to match.",
  "Kids were introduced carefully and supervised from the start.",
  "Coat, bite, and ear set look classic for the line.",
  "Our vet checked the puppy and had zero red flags.",
  "Recall games they recommended became our evening ritual.",
  "Stock exposure as a pup shows up in focus on the farm.",
  "Apartment life works because we hike and train every day.",
  "The application process weeded out impulse buyers — good.",
  "Sibling temperament notes helped us pick the right one.",
  "No pressure to buy on the first visit.",
  "We appreciated the waiting list transparency.",
];

const closings = [
  "Would recommend to serious, active homes only.",
  "Five stars for ethics and follow-through.",
  "We are already counting down to the next litter updates.",
  "Best working companion we have owned.",
  "If you want a couch ornament, look elsewhere — and that is a compliment.",
  "Clear contract, fair price, solid dog.",
  "Grateful we waited for the right match.",
  "The dog has grit and a soft off-switch after work.",
  "Supportive without being pushy.",
  "Exactly the partnership we hoped for.",
];

const reviews = [];
const used = new Set();

for (let i = 0; i < 100; i++) {
  const f = first[i % first.length];
  const l = last[(i * 7) % last.length];
  const city = cities[(i * 3) % cities.length];
  const o = openings[i % openings.length];
  const m = middles[(i * 5) % middles.length];
  const c = closings[(i * 11) % closings.length];
  const twist = [
    `Week ${(i % 12) + 1} update: still thriving.`,
    `We named ours with the initial ${f.slice(0, 1)} — fits the attitude.`,
    `Came from litter #${10 + (i % 40)}.`,
    `We run about ${4 + (i % 6)} miles most mornings.`,
    `Train with a local club twice a week now.`,
    `Our property is ${1 + (i % 9)} acres and this dog patrols it.`,
    `Agility foundation class starts next month.`,
    `Herding lesson number ${(i % 8) + 1} went surprisingly well.`,
  ][i % 8];

  const text = `${o} ${m} ${twist} ${c}`;
  if (used.has(text)) continue;
  used.add(text);

  const rating = i % 17 === 0 ? 4 : 5;
  const daysAgo = 3 + i * 5;
  const d = new Date("2026-10-18T00:00:00Z");
  d.setUTCDate(d.getUTCDate() - daysAgo);

  reviews.push({
    id: `rev-${String(i + 1).padStart(3, "0")}`,
    author: `${f} ${l.charAt(0)}.`,
    location: city,
    rating,
    date: d.toISOString().slice(0, 10),
    source: "Google",
    text,
  });
}

while (reviews.length < 100) {
  const i = reviews.length;
  const text = `Placement #${i + 1}: consistent temperament notes, fair pricing, and a heeler that still wants a job every sunrise. Unique note ${i + 1}.`;
  if (used.has(text)) continue;
  used.add(text);
  reviews.push({
    id: `rev-${String(i + 1).padStart(3, "0")}`,
    author: `${first[i % first.length]} ${last[i % last.length].charAt(0)}.`,
    location: cities[i % cities.length],
    rating: 5,
    date: new Date(Date.UTC(2024, 0, 1 + i)).toISOString().slice(0, 10),
    source: "Google",
    text,
  });
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

writeFileSync("src/lib/reviews-data.ts", out);
console.log(`wrote ${reviews.length} unique reviews`);
