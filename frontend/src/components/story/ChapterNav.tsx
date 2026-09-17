import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "motion/react";

export interface NavItem {
  href: string;
  label: string;
  short: string;
  testid: string;
}

// Fixed reading-progress hairline (top) + bookmark-ribbon chapter nav (right, desktop only).
export function ChapterNav({ items }: { items: NavItem[] }) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });
  const [active, setActive] = useState<string>(items[0]?.href ?? "");

  useEffect(() => {
    const targets = items
      .map((item) => document.getElementById(item.href.slice(1)))
      .filter((el): el is HTMLElement => el !== null);
    if (targets.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        }
      },
      { rootMargin: "-30% 0px -60% 0px" },
    );
    for (const target of targets) observer.observe(target);
    return () => observer.disconnect();
  }, [items]);

  return (
    <>
      <motion.div
        aria-hidden
        className="fixed inset-x-0 top-0 z-50 h-1 origin-left bg-primary"
        style={{ scaleX }}
      />
      <nav
        data-testid="story-nav-bar"
        aria-label="Chapter bookmarks"
        className="fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-2.5 lg:flex"
      >
        {items.map((item) => {
          const isActive = active === item.href;
          return (
            <a
              key={item.href}
              href={item.href}
              title={item.label}
              aria-label={item.label}
              aria-current={isActive ? "true" : undefined}
              data-testid={item.testid}
              className={`[clip-path:polygon(0_0,100%_0,100%_100%,50%_78%,0_100%)] grid h-9 w-7 justify-items-center pt-1.5 font-mono text-[10px] transition-colors duration-200 ${
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-muted-foreground hover:bg-primary/70 hover:text-primary-foreground"
              }`}
            >
              {item.short}
            </a>
          );
        })}
      </nav>
    </>
  );
}
