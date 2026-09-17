import { useState, type FormEvent } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { format } from "date-fns";
import { apiGet, apiPost } from "@/lib/api";
import type { GuestbookNote, GuestbookNoteCreate } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

const STAMPS = ["⭐", "❤️", "🥊", "📚", "🌟"];

// Shown when the backend can't be reached (e.g. paused preview) — the
// guestbook still works, it just keeps notes on this device.
const FALLBACK_NOTES: GuestbookNote[] = [
  { id: "fallback-1", name: "Coach D", message: "Great scrapbook, champ. Now three more rounds of skipping before you celebrate.", stamp_emoji: "🥊", created_at: "2025-09-01T09:00:00Z" },
  { id: "fallback-2", name: "Little Sister", message: "Goo goo ga. (Translation: big brother is my favourite person.)", stamp_emoji: "🍼", created_at: "2025-09-02T15:30:00Z" },
  { id: "fallback-3", name: "English Teacher", message: "A lovely project — your love for books shows on every page.", stamp_emoji: "📚", created_at: "2025-09-03T11:00:00Z" },
  { id: "fallback-4", name: "Best Friend", message: "Read the whole thing in one go. I'll join the 5 PM crew — from the couch.", stamp_emoji: "⭐", created_at: "2025-09-04T18:45:00Z" },
  { id: "fallback-5", name: "Auntie", message: "Whatever chapter you write next, eat first. — wisdom quota, fulfilled.", stamp_emoji: "❤️", created_at: "2025-09-05T20:10:00Z" },
];

function fmtDate(iso: string): string {
  const date = new Date(iso);
  return Number.isNaN(date.getTime()) ? "" : format(date, "MMM d, yyyy");
}

const cardShadow = "shadow-[0_10px_25px_-5px_rgba(43,33,24,0.14),0_4px_6px_-2px_rgba(43,33,24,0.06)]";

export function Guestbook() {
  const queryClient = useQueryClient();
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [stamp, setStamp] = useState(STAMPS[0]);
  const [offlineNotes, setOfflineNotes] = useState<GuestbookNote[]>([]);

  const query = useQuery({
    queryKey: ["guestbook"],
    queryFn: () => apiGet<GuestbookNote[]>("/guestbook"),
    retry: 1,
  });

  const offline = query.isError;
  const serverNotes = query.data ?? FALLBACK_NOTES;
  const notes = [...offlineNotes, ...serverNotes];
  const showSkeleton = query.isPending && offlineNotes.length === 0;

  const submit = useMutation({
    mutationFn: (note: GuestbookNoteCreate) => apiPost<GuestbookNote>("/guestbook", note),
    onSuccess: (created) => {
      queryClient.setQueryData<GuestbookNote[]>(["guestbook"], (old) => [created, ...(old ?? [])]);
      toast.success("Pinned to the guestbook. Thank you!");
      setName("");
      setMessage("");
      setStamp(STAMPS[0]);
    },
    onError: () => {
      const local: GuestbookNote = {
        id: `local-${crypto.randomUUID()}`,
        name: name.trim() || "Anonymous",
        message: message.trim(),
        stamp_emoji: stamp,
        created_at: new Date().toISOString(),
      };
      setOfflineNotes((prev) => [local, ...prev]);
      toast.info("Backend unreachable — your note was pinned locally (offline mode).");
      setName("");
      setMessage("");
      setStamp(STAMPS[0]);
    },
  });

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = message.trim();
    if (!trimmed) return;
    submit.mutate({ name: name.trim() || "Anonymous", message: trimmed, stamp_emoji: stamp });
  }

  return (
    <section id="epilogue" data-testid="chapter-section-epilogue" className="scroll-mt-16 border-t border-border/60 bg-[#ECE2D0]">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-24">
        <Reveal>
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-primary">Epilogue · Leave a note</p>
          <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            The Unwritten Chapter
          </h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-foreground/90">
            Every scrapbook is really written by the people in it. Sign the guestbook — leave a note,
            a joke, or advice I'll pretend to ignore and secretly use.
          </p>
        </Reveal>

        <div className="mt-10 grid items-start gap-10 lg:grid-cols-5">
          <Reveal className="lg:col-span-2">
            <form
              data-testid="guestbook-form"
              onSubmit={handleSubmit}
              className={cn("rounded-md border border-border bg-[#FBF7ED] p-6", cardShadow)}
            >
              <h3 className="font-heading text-xl font-bold text-foreground">Sign the guestbook</h3>
              <div className="mt-5 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="gb-name">Your name</Label>
                  <Input
                    id="gb-name"
                    data-testid="guestbook-name-input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    maxLength={60}
                    placeholder="e.g. Coach D"
                    autoComplete="off"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gb-message">Your note</Label>
                  <Textarea
                    id="gb-message"
                    data-testid="guestbook-message-input"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    maxLength={500}
                    rows={4}
                    placeholder="Say something worth pinning…"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Pick a stamp</Label>
                  <div role="group" aria-label="Pick a stamp" className="flex gap-2">
                    {STAMPS.map((s, i) => (
                      <button
                        key={s}
                        type="button"
                        data-testid={`guestbook-stamp-${i + 1}`}
                        onClick={() => setStamp(s)}
                        aria-pressed={stamp === s}
                        aria-label={`Stamp ${s}`}
                        className={cn(
                          "h-9 w-9 rounded-full border text-lg transition-transform duration-200 hover:scale-110",
                          stamp === s ? "border-primary bg-primary/10 ring-2 ring-primary/40" : "border-border bg-card",
                        )}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
                <Button
                  type="submit"
                  data-testid="guestbook-submit-button"
                  disabled={submit.isPending || message.trim().length === 0}
                  className="w-full"
                >
                  {submit.isPending ? "Pinning…" : "Pin my note"}
                </Button>
                {offline && (
                  <p role="status" className="text-xs text-[#B82E24]">
                    Offline mode: notes are pinned on this device only.
                  </p>
                )}
              </div>
            </form>
          </Reveal>

          <div className="lg:col-span-3">
            <div data-testid="guestbook-notes-list" aria-live="polite" aria-label="Guestbook notes" className="grid gap-5 sm:grid-cols-2">
              {showSkeleton
                ? [1, 2, 3, 4].map((n) => (
                    <div key={n} className={cn("h-36 animate-pulse rounded-sm border border-border/60 bg-[#FBF7ED]/70", cardShadow)} />
                  ))
                : notes.map((note, i) => (
                    <article
                      key={note.id}
                      data-testid={`guestbook-note-card-${note.id}`}
                      className={cn(
                        "relative rounded-sm border border-border bg-[#FBF7ED] p-5 pt-7 transition-transform duration-300 ease-out hover:-translate-y-1 hover:rotate-0",
                        cardShadow,
                        i % 2 === 0 ? "-rotate-1" : "rotate-1",
                      )}
                    >
                      <span aria-hidden className="absolute left-1/2 top-2 h-3 w-3 -translate-x-1/2 rounded-full bg-[#D49E35] shadow" />
                      <p className="leading-relaxed text-foreground/90">{note.message}</p>
                      <div className="mt-4 flex items-center justify-between gap-2">
                        <p className="font-heading text-sm font-medium italic text-foreground">— {note.name}</p>
                        <span aria-hidden className="text-lg">{note.stamp_emoji}</span>
                      </div>
                      <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-[#7C6B5E]">
                        {fmtDate(note.created_at)}
                      </p>
                    </article>
                  ))}
              {!showSkeleton && notes.length === 0 && (
                <p className="text-sm text-muted-foreground">No notes yet — be the first to sign.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
