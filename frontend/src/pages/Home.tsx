import { ChevronDown } from "lucide-react";
import { Toaster } from "@/components/ui/sonner";
import type { NavItem } from "@/components/story/ChapterNav";
import { ChapterNav } from "@/components/story/ChapterNav";
import { ChapterSection } from "@/components/story/ChapterSection";
import { Guestbook } from "@/components/story/Guestbook";
import { Polaroid } from "@/components/story/Polaroid";
import { Reveal } from "@/components/story/Reveal";
import { AUTHOR, STORY_TAGLINE, chapters } from "@/lib/story";

const navItems: NavItem[] = [
  { href: "#cover", label: "Cover", short: "★", testid: "nav-cover" },
  ...chapters.map((chapter, i) => ({
    href: `#${chapter.id}`,
    label: chapter.title,
    short: String(i + 1),
    testid: `nav-chapter-${i + 1}`,
  })),
  { href: "#epilogue", label: "Epilogue & Guestbook", short: "✎", testid: "nav-chapter-epilogue" },
];

export default function Home() {
  return (
    <div className="paper-grain min-h-svh">
      <ChapterNav items={navItems} />
      <Toaster />

      <main>
        {/* ── Cover ─────────────────────────────────────────────── */}
        <header id="cover" data-testid="story-cover" className="scroll-mt-16 bg-[#ECE2D0]">
          <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 pb-20 pt-14 sm:px-8 lg:grid-cols-2 lg:pb-28 lg:pt-20">
            <Reveal>
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-primary">
                A school project · a life in five chapters
              </p>
              <h1 className="embossed mt-4 font-heading text-6xl font-bold tracking-tight text-foreground sm:text-7xl">
                My Story
              </h1>
              <p className="mt-4 font-heading text-xl italic text-muted-foreground">{STORY_TAGLINE}</p>
              <p className="mt-2 text-sm text-muted-foreground">
                scrapbooked by{" "}
                <span className="font-heading text-base italic text-foreground">{AUTHOR}</span>
              </p>

              <div className="mt-8 inline-flex rotate-2 items-center rounded-sm border-2 border-dashed border-[#A8281E] px-4 py-2 text-[#A8281E]">
                <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.25em]">
                  Strive &amp; endure
                </span>
              </div>

              <nav aria-label="Table of contents" className="mt-10">
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                  In this book
                </p>
                <ol className="mt-3 space-y-1">
                  {chapters.map((chapter, i) => (
                    <li key={chapter.id}>
                      <a
                        data-testid={`hero-chapter-link-${i + 1}`}
                        href={`#${chapter.id}`}
                        className="group flex items-baseline gap-3 rounded-sm px-2 py-1.5 transition-colors hover:bg-card"
                      >
                        <span className="font-mono text-xs text-primary">{String(i + 1).padStart(2, "0")}</span>
                        <span className="font-heading text-lg text-foreground group-hover:underline">
                          {chapter.title}
                        </span>
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            </Reveal>

            <Reveal delay={0.15} className="flex flex-col items-center gap-6">
              <Polaroid
                src="/photos/hero.jpg"
                alt="Watercolour still life of boxing gloves, a stack of books and a framed family photo"
                caption="gloves, pages & home — the three plots of my story"
                tilt={3}
                width={400}
                testid="polaroid-hero"
              />
              <a
                href="#chapter-1"
                data-testid="scroll-invite"
                className="flex flex-col items-center gap-1 font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground transition-colors hover:text-primary"
              >
                Begin with chapter one
                <ChevronDown aria-hidden className="h-4 w-4 animate-bounce" />
              </a>
            </Reveal>
          </div>
        </header>

        {/* ── Chapters ──────────────────────────────────────────── */}
        {chapters.map((chapter, i) => (
          <ChapterSection key={chapter.id} chapter={chapter} index={i} />
        ))}

        {/* ── Epilogue + guestbook ──────────────────────────────── */}
        <Guestbook />

        <footer className="border-t border-border/60 bg-[#ECE2D0] py-8 text-center">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
            My Story · scrapbooked with ink, grit &amp; glue · {AUTHOR}
          </p>
        </footer>
      </main>
    </div>
  );
}
