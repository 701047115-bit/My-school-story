import type { Chapter } from "@/lib/story";
import { cn } from "@/lib/utils";
import { Polaroid } from "./Polaroid";
import { Reveal } from "./Reveal";

const SPINE_COLORS = ["#9E3D24", "#204652", "#C68B2C", "#2D6945", "#6E5B4B", "#B85D19"];

function Stars({ rating }: { rating: number }) {
  return (
    <span aria-label={`${rating} out of 5 stars`} className="font-mono text-sm text-[#C68B2C]">
      {"★".repeat(rating)}
      <span className="text-[#D9CAB8]">{"☆".repeat(5 - rating)}</span>
    </span>
  );
}

const heading3 = "font-mono text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground";

// One long-scroll chapter: asymmetric spread (text + tilted polaroid) with the
// chapter's own artifacts — round cards, memory wall, traditions, or book spines.
export function ChapterSection({ chapter, index }: { chapter: Chapter; index: number }) {
  const flip = index % 2 === 1; // alternate which side the polaroid sits on
  return (
    <section id={chapter.id} data-testid={`chapter-section-${index + 1}`} className={cn("scroll-mt-16", index % 2 === 1 && "bg-[#F1E9DD]")}>
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-24">
        <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-14">
          <div className={cn("lg:col-span-7", flip && "lg:order-2")}>
            <Reveal>
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-primary">{chapter.kicker}</p>
              <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                {chapter.title}
              </h2>
            </Reveal>
            <div className="mt-6 space-y-5">
              {chapter.paragraphs.map((paragraph, i) => (
                <Reveal key={i} delay={0.05 * i}>
                  <p
                    className={cn(
                      "leading-relaxed text-foreground/90",
                      i === 0 &&
                        "first-letter:float-left first-letter:mr-2 first-letter:font-heading first-letter:text-5xl first-letter:font-bold first-letter:leading-[0.9] first-letter:text-primary",
                    )}
                  >
                    {paragraph}
                  </p>
                </Reveal>
              ))}
            </div>
            <Reveal delay={0.15}>
              <ul aria-label="Key facts" className="mt-8 flex flex-wrap gap-2">
                {chapter.facts.map((fact) => (
                  <li
                    key={fact}
                    className="rounded-full border border-border bg-card px-3 py-1 font-mono text-xs text-muted-foreground"
                  >
                    {fact}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <div className={cn("lg:col-span-5", flip && "lg:order-1")}>
            <Reveal delay={0.2} className="flex justify-center lg:sticky lg:top-24">
              <Polaroid {...chapter.photo} testid={`polaroid-chapter-${index + 1}`} />
            </Reveal>
          </div>
        </div>

        {chapter.rounds ? (
          <Reveal className="mt-12">
            <h3 className={heading3}>The round-by-round</h3>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {chapter.rounds.map((round, i) => (
                <div
                  key={round.label}
                  data-testid={`boxing-round-card-${i + 1}`}
                  className="rounded-md border border-border bg-card p-4 shadow-sm transition-transform duration-300 ease-out hover:-translate-y-1"
                >
                  <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">{round.label}</p>
                  <p className="mt-1 font-heading text-lg font-bold text-foreground">{round.title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{round.text}</p>
                </div>
              ))}
            </div>
          </Reveal>
        ) : null}

        {chapter.memories ? (
          <Reveal className="mt-12">
            <h3 className={heading3}>Memory wall</h3>
            <div className="mt-6 grid gap-6 sm:grid-cols-3">
              {chapter.memories.map((memory, i) => (
                <div
                  key={memory.title}
                  data-testid={`sibling-memory-card-${i + 1}`}
                  className={cn(
                    "relative rounded-sm bg-[#FBF7ED] p-5 pt-7 shadow-[0_10px_25px_-5px_rgba(43,33,24,0.14),0_4px_6px_-2px_rgba(43,33,24,0.06)] transition-transform duration-300 ease-out hover:-translate-y-1 hover:rotate-0",
                    i % 2 === 0 ? "-rotate-1" : "rotate-1",
                  )}
                >
                  <span aria-hidden className="absolute left-1/2 top-2 h-3 w-3 -translate-x-1/2 rounded-full bg-[#D49E35] shadow" />
                  <p className="font-heading font-bold text-foreground">{memory.title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{memory.text}</p>
                </div>
              ))}
            </div>
          </Reveal>
        ) : null}

        {chapter.traditions ? (
          <Reveal className="mt-12">
            <h3 className={heading3}>House traditions</h3>
            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              {chapter.traditions.map((tradition, i) => (
                <div
                  key={tradition.name}
                  data-testid={`family-tradition-card-${i + 1}`}
                  className="rounded-md border border-dashed border-border bg-card p-5 transition-transform duration-300 ease-out hover:-translate-y-1"
                >
                  <p className="font-heading font-bold text-foreground">{tradition.name}</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{tradition.detail}</p>
                </div>
              ))}
            </div>
          </Reveal>
        ) : null}

        {chapter.books ? (
          <Reveal className="mt-12">
            <h3 className={heading3}>The shelf, annotated</h3>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {chapter.books.map((book, i) => (
                <div
                  key={book.title}
                  data-testid={`book-card-${i + 1}`}
                  className="flex gap-4 rounded-md border border-border bg-card p-4 transition-transform duration-300 ease-out hover:-translate-y-1"
                >
                  <div aria-hidden className="w-3 shrink-0 rounded-sm" style={{ backgroundColor: SPINE_COLORS[i % SPINE_COLORS.length] }} />
                  <div>
                    <p className="font-heading font-bold leading-snug text-foreground">{book.title}</p>
                    <p className="font-mono text-xs text-muted-foreground">{book.author}</p>
                    <div className="mt-1">
                      <Stars rating={book.rating} />
                    </div>
                    <p className="mt-2 font-heading text-sm italic text-muted-foreground">“{book.note}”</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}
