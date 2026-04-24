import { SpotlightCard } from "@/app/(marketing)/_components/SpotlightCard";

export function LegacySection() {
  return (
    <section
      id="legacy"
      className="anchor-offset relative z-10 px-6 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-4xl">
        <h2 className="font-serif-cn text-3xl font-semibold sm:text-4xl text-gradient-aurora">
          我的收藏
        </h2>
        <p className="mt-3 font-serif-cn text-sm tracking-[0.2em] text-[color:var(--ink-muted)]">
          留住那些不愿醒来的片段
        </p>
        <div className="mt-12">
          <SpotlightCard>
            <p className="text-center font-serif-cn text-[color:var(--ink-soft)] leading-relaxed">
              收藏夹还在新月背后沉睡。
              <br />
              很快你就能把心爱的梦境别在衣襟上。
            </p>
          </SpotlightCard>
        </div>
      </div>
    </section>
  );
}
