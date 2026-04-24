"use client";

import type { UserProfile } from "@/lib/api";

import { AggregateProgressRail } from "./_components/AggregateProgressRail";
import { AvatarDock } from "./_components/AvatarDock";
import { DreamComposer } from "./_components/DreamComposer";
import { DreamField } from "./_components/DreamField";
import { HeroOrnaments } from "./_components/HeroOrnaments";
import { HistorySection } from "./_components/HistorySection";
import { LegacySection } from "./_components/LegacySection";
import { useDreamQueue } from "./useDreamQueue";

export function HomeClient({ initialUser }: { initialUser: UserProfile | null }) {
  const { tasks, aggregate, submit } = useDreamQueue();

  return (
    <>
      <div
        id="top"
        className="dream-hero relative z-10 h-[100svh] w-full overflow-hidden"
      >
        <DreamField />
        <HeroOrnaments />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-32 bg-gradient-to-b from-transparent to-[color:var(--bg-deep)]"
        />
        <AggregateProgressRail
          tasks={tasks}
          aggregate={aggregate}
        />
        <DreamComposer
          onSubmit={(prompt, files) => submit(prompt, files.length)}
        />
      </div>

      <AvatarDock user={initialUser} />

      <HistorySection />
      <LegacySection />
    </>
  );
}
