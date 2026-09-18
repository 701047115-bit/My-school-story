// ─── Make this story yours ────────────────────────────────────────────────────
// Everything the site shows lives in this one file: your name, the chapter text,
// photo captions. Swap a photo by replacing the file in frontend/public/photos/
// (keep the same file name) — no code changes needed.

export const AUTHOR = "Lethin";
export const STORY_TAGLINE = "Gloves, pages & the people who made me.";

export interface PolaroidPhoto {
  src: string;
  caption: string;
  alt: string;
  tilt?: number;
}

export interface Round {
  label: string;
  title: string;
  text: string;
}

export interface Memory {
  title: string;
  text: string;
}

export interface Tradition {
  name: string;
  detail: string;
}

export interface Book {
  title: string;
  author: string;
  rating: number;
  note: string;
}

export interface Chapter {
  id: string;
  kicker: string;
  title: string;
  paragraphs: string[];
  facts: string[];
  photo: PolaroidPhoto;
  rounds?: Round[];
  memories?: Memory[];
  traditions?: Tradition[];
  books?: Book[];
}

export const chapters: Chapter[] = [
  {
    id: "chapter-1",
    kicker: "Chapter One · Me & My World",
    title: "The Kid with the Notebook",
    paragraphs: [
      "I'm L, a Grade 10 student, I am almost so quiet with the people i just met because i am a overthinking guy who always thinks what if the person in the other side doesn't like the way I talk and all. I'm the kind of person who keeps two things on the nightstand, hand wraps and books.I usually doesn't talk much in a group but regret that when I'm on my way back to home . Learning, making things, chasing new ideas, that's where I'm mostly busy during my free times.",
      "My notebook is mostly full of halfbuilt things like ai projects, apps, websites,dropshipping etc, etc which i did out of curiosity but coudn't publish it yet because of my younger age and money requirements which im not ready to risk yet since success isn't guarenteed. Ai, technology, video creation, business, investing,that's the things which i mainly focus on when im free because those are the things with more scope in future than normal 9-5 jobs.",
      "I grew up in a small house with my aunt and her kids and later moved with my parents for the first time when i had my sister. Before that i lived with my aunt for 8 years.But nowadays, the loudest voice belongs to my baby sister and I'd recognise that noise anywhere. It's the sound of my whole story starting.",
      "I'm still figuring out exactly where my future takes me, but the plan is simple, keep learning, become a better version of myself, build something of my own one day, and use whatever success I find to take care of my family. This page is chapter one of that.",
    ],
    facts: ["Grade 10 · quiet by choice", "Into AI, tech & video", "Learning business & investing", "Nightstand: hand wraps + books"],
    photo: {
      src: "/photos/chapter-me.jpg",
      alt: "Watercolour illustration of a student writing in a notebook at a desk under warm lamp light",
      caption: "me, planning big things (and small excuses)",
      tilt: -2,
    },
  },
  {
    id: "chapter-2",
    kicker: "Chapter Two · My Boxing Life",
    title: "The Sweet Science",
    paragraphs: [
      "My boxing life start at 5pm and ends at 6pm and that's the time when i forget my overthinking and introverted side and turn into a different version of me . From 5 to 6 it's hand wraps, skipping ropes and heavy bags, one hour where the only notification that matters is the round bell.",
      "People think boxing is about throwing punches. It's not. It taught me discipline, patience under pressure, confidence that I need to earn one round at a time, and resilience,getting hit, adjusting and coming back. The gym taught me things more than any classroom ever did and ever will.",
      "I'm not chasing a belt (yet). I'm chasing the version of me that doesn't quit in round three.",
    ],
    facts: ["5–6 PM, every session", "Jab · cross · breathe", "Favourite round: the last one"],
    rounds: [
      { label: "Round 01", title: "The Warm-up", text: "Three rounds of skipping to leave the school day behind. By the second one, it's just breathing and rhythm." },
      { label: "Round 02", title: "The Spar", text: "First sparring session, I forgot every combination I ever learned. My coach said good , now box with your head, not your highlights." },
      { label: "Round 03", title: "The Bell", text: "There's a second right before the bell when everything goes quiet. That silence is the whole sport." },
      { label: "Round 04", title: "The Lesson", text: "Boxing taught me to lose in the gym, so I don't panic outside it." },
    ],
    photo: {
      src: "/photos/chapter-boxing.jpg",
      alt: "Watercolour illustration of boxing gloves hanging beside a heavy bag in a dawn-lit gym",
      caption: "old gloves, honest miles",
      tilt: 2,
    },
  },
  {
    id: "chapter-3",
    kicker: "Chapter Three · My Little Sister",
    title: "The Boss of the House",
    paragraphs: [
      "My little sister is four months old, and in four months she has taken over the entire house. She doesn't walk, talk, or lift a finger.She just cries, and every person in the building moves like it's an emergency. Because it kinda is.",
      "I'm the big brother, which turns out to be a job title, more than a sibling thing . I check if she's asleep. I warm her bottle wrong and got corrected thrice, to be honest, at this point i felt like she was my onw daughter. I've learned that a person who can't even roll over yet can run the whole family.",
      "Everyone says I'm the one protecting her. Honestly, she's the one who made me want work hard so i can protect her in future. Everything in this book, I'm building a little bit for her.",
    ],
    facts: ["4 months old", "Runs the house", "Best worst alarm clock", "My biggest why"],
    memories: [
      { title: "The 3 AM Meetings", text: "She calls a meeting every night at 3 AM. Attendance is mandatory. The agenda is crying. Nobody has ever been brave enough to object." },
      { title: "The Finger Grab", text: "She wrapped her whole hand around one of my fingers and held on. I've hit the heavy bag a thousand times. Nothing has ever hit me like that." },
      { title: "The First Smile", text: "Boxing taught me to read every opponent. She got me with one gummy smile. Knocked out, no eight second count needed." },
    ],
    photo: {
      src: "/photos/chapter-sibling.jpg",
      alt: "Watercolour illustration of a teenage big brother cradling his baby sister by a warm window",
      caption: "the boss & her bodyguard",
      tilt: -3,
    },
  },
  {
    id: "chapter-4",
    kicker: "Chapter Four · My Family",
    title: "The Anchor",
    paragraphs: [
      "Everything strong in me was built at a dinner table. My family works quietly, early shifts, packed lunches.",
      "A big part of my childhood belongs to my aunt. I grew up spending much of my time in her care, and a lot of what's steady in me was built there, the habits, the patience, the quiet belief that I can become more than I currently am.",
      "They never came to a single match due to the busy life but still showed me thier support and love at home , every school event i participated, every small thing I've ever done was all with the support from her. Half the time they don't understand the sport, all of the time they understand me.",
      "If this story has a moral, my family is it, support is important than just showing up for people, feed them well, and don't make a big speech about it.",
    ],
    facts: ["Table of 4, chairs for more", "Loud at matches", "Quieter in love"],
    traditions: [
      { name: "Sunday dinner,", detail: "One rule, enforced by auntie. The biryani does the talking." },
      { name: "Match-day rule", detail: "Family shows up early, sits together, cheers too loud. Non-negotiable." },
      { name: "Auntie's wisdom quota", detail: "Every visit ends with one piece of advice I'll pretend to ignore and secretly use." },
    ],
    photo: {
      src: "/photos/chapter-family.jpg",
      alt: "Watercolour illustration of a family sharing dinner at a wooden table in golden evening light",
      caption: "the whole story, at one table",
      tilt: 2,
    },
  },
  {
    id: "chapter-5",
    kicker: "Chapter Five · The Books I Read",
    title: "Pages That Shaped Me",
    paragraphs: [
      "Books are the quietest things in my house and the loudest things in my head. Between training sessions and homework, I escape into books until my body and mind cools down and I know that's the time to sleep.",
      "I write in the margins now , little arguments with the author, stars next to sentences I want to keep. Here's my shelf, with the notes that stayed.",
    ],
    facts: ["Margins, defaced", "Paperback > screen", "One chapter before sleep"],
    books: [
      { title: "The Old Man and the Sea", author: "Ernest Hemingway", rating: 5, note: "'A man can be destroyed but not defeated' — my corner quote before every bout." },
      { title: "The Alchemist", author: "Paulo Coelho", rating: 5, note: "Read it three times. Still checking for omens." },
      { title: "Atomic Habits", author: "James Clear", rating: 4, note: "One percent better every day — the gym, in book form." },
      { title: "Diary of a Wimpy Kid", author: "Jeff Kinney", rating: 4, note: "The book that tricked me into loving reading. Forever grateful." },
      { title: "Ikigai", author: "Héctor García & Francesc Miralles", rating: 4, note: "Reading it like a roadmap for the things I want to build." },
      { title: "Matilda", author: "Roald Dahl", rating: 5, note: "Proof that the small kid with the books wins in the end." },
      { title: "Rich Dad Poor Dad", author: "Robert Kiyosaki", rating: 4, note: "Made money feel like a subject you can study, not a mystery." },
      { title: "The Psychology of Money", author: "Morgan Housel", rating: 4, note: "Money is a story about behaviour — I'm taking notes early." },
    ],
    photo: {
      src: "/photos/chapter-books.jpg",
      alt: "Watercolour illustration of a tall stack of well-worn paperback books beside a warm reading lamp",
      caption: "the nightstand bookshelf",
      tilt: -2,
    },
  },
];
