import { Hero } from "./_components/Hero";
import { Reveal } from "./_components/Reveal";
import { SiteHeader } from "./_components/SiteHeader";
import { SpotlightCard } from "./_components/SpotlightCard";
import { StarField } from "./_components/StarField";

const CAPABILITIES = [
  {
    title: "剧本冥思",
    en: "Script Divination",
    desc: "将一句品牌故事，幻化成结构完整、情感饱满的营销脚本；多风格并行生成，供你挑选。",
    icon: (
      <path d="M4 4h12l4 4v12H4V4zm12 0v4h4M8 12h8M8 16h5" strokeWidth="1.6" />
    ),
  },
  {
    title: "分镜织梦",
    en: "Storyboard Weave",
    desc: "AI 自动拆解镜头、运镜、时长与节奏，生成可视化分镜，让每一帧都有它的呼吸。",
    icon: (
      <path
        d="M3 5h18M3 12h18M3 19h18M8 5v14M16 5v14"
        strokeWidth="1.6"
      />
    ),
  },
  {
    title: "画面唤起",
    en: "Scene Summoning",
    desc: "从真实产品到梦境场景，生成式模型唤起每一帧高保真画面，风格一键切换。",
    icon: (
      <path
        d="M3 6h18v12H3zM7 14l3-3 3 3 4-5 4 5"
        strokeWidth="1.6"
      />
    ),
  },
  {
    title: "声语低吟",
    en: "Voice & Score",
    desc: "AI 拟声、配乐与情绪混音同步而生，让声音与画面一同呼吸，让梦更加真实。",
    icon: (
      <path d="M4 10v4M8 6v12M12 3v18M16 7v10M20 10v4" strokeWidth="1.8" />
    ),
  },
  {
    title: "剪辑流转",
    en: "Editing Flow",
    desc: "智能剪辑与节奏校准，把所有素材拼合为符合转化率的成片，秒级迭代。",
    icon: (
      <path
        d="M6 4v16M18 4v16M6 8h12M6 16h12"
        strokeWidth="1.6"
      />
    ),
  },
  {
    title: "多屏投影",
    en: "Multi-screen Cast",
    desc: "同一支视频，自适应竖版、横版、方版；为抖音、TikTok、YouTube 等渠道量身裁切。",
    icon: (
      <path
        d="M4 5h16v10H4zM8 19h8M12 15v4"
        strokeWidth="1.6"
      />
    ),
  },
];

const STEPS = [
  {
    idx: "I",
    title: "倾诉",
    en: "Whisper",
    desc: "告诉 Cresselia 你的品牌、受众与愿望；她倾听每一个细节。",
  },
  {
    idx: "II",
    title: "孵化",
    en: "Weave",
    desc: "AI 在新月之下为你同时孵化多种风格的视频方案，反复推敲细节。",
  },
  {
    idx: "III",
    title: "降临",
    en: "Awaken",
    desc: "一键输出多尺寸成片，投向社媒、门店、直播与品牌官网。",
  },
];

const LEGENDS = [
  {
    tag: "SKINCARE",
    title: "月下柔肤",
    desc: "让护肤品牌化为一场月光漫步，转化率提升 3.2 倍。",
    hue: "from-[#ff8ec7] via-[#b78fff] to-[#7ad8ff]",
  },
  {
    tag: "COFFEE",
    title: "晨梦拿铁",
    desc: "把一杯咖啡拍成一场苏醒仪式，短视频播放破千万。",
    hue: "from-[#f6e6b0] via-[#ff8ec7] to-[#b78fff]",
  },
  {
    tag: "SAAS",
    title: "云端安眠",
    desc: "让 B 端 SaaS 也拥有剧情感的品牌影片，潜客留资翻倍。",
    hue: "from-[#6effcf] via-[#7ad8ff] to-[#b78fff]",
  },
];

const STATS = [
  { num: "72 ×", label: "较传统制片的提速" },
  { num: "1 / 30", label: "成本只要千分之" },
  { num: "120 +", label: "品牌与我们共梦" },
];

export default function HomePage() {
  return (
    <div className="relative">
      <div className="cosmic-bg" />
      <StarField />
      <SiteHeader />

      <main className="relative z-10">
        <Hero />

        {/* ============ Manifesto ============ */}
        <section
          id="manifesto"
          className="relative px-6 py-28 sm:py-40"
        >
          <div className="mx-auto max-w-6xl">
            <Reveal>
              <div className="flex justify-center">
                <span className="divider-rune font-display text-[color:var(--moon-cyan)]">
                  <span>Manifesto · 神谕</span>
                </span>
              </div>
            </Reveal>
            <Reveal delay={150}>
              <h2 className="mt-8 text-center font-serif-cn text-4xl sm:text-6xl font-semibold leading-tight text-gradient-moon">
                从噩梦，到好梦。
              </h2>
            </Reveal>
            <Reveal delay={250} variant="blur">
              <p className="mx-auto mt-10 max-w-3xl text-center text-lg sm:text-xl leading-relaxed text-[color:var(--ink-soft)]">
                传统的营销视频制片是一场噩梦：冗长的会议、昂贵的剧组、漫长的等待。
                <br className="hidden sm:block" />
                Cresselia 以生成式 AI
                为烛火，在新月之下点亮你的品牌故事——她让每一次「拍片」回归到一次
                <span className="text-white">安稳、梦幻、富有灵感的创造</span>。
              </p>
            </Reveal>

            <div className="mt-20 grid gap-8 sm:grid-cols-3">
              {[
                {
                  k: "无尽灵感",
                  v: "风格、镜头、叙事、色调，一念千生；灵感从此不再枯竭。",
                },
                {
                  k: "以秒交付",
                  v: "从需求到成片，从小时级到分钟级；让创意与市场同步奔跑。",
                },
                {
                  k: "品牌之灵",
                  v: "从 LOGO、色卡到语调，Cresselia 记住你的品牌之神，并一以贯之。",
                },
              ].map((item, i) => (
                <Reveal key={item.k} delay={120 + i * 120}>
                  <SpotlightCard>
                    <div className="flex items-center gap-3 font-display text-xs tracking-[0.4em] text-[color:var(--moon-rose)]">
                      <span>0{i + 1}</span>
                      <span className="h-px w-10 bg-gradient-to-r from-[color:var(--moon-rose)] to-transparent" />
                    </div>
                    <h3 className="mt-5 font-serif-cn text-2xl font-semibold text-white">
                      {item.k}
                    </h3>
                    <p className="mt-3 text-[color:var(--ink-soft)] leading-relaxed">
                      {item.v}
                    </p>
                  </SpotlightCard>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ============ Capabilities ============ */}
        <section id="capabilities" className="relative px-6 py-28 sm:py-40">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
              <div>
                <Reveal variant="left">
                  <span className="divider-rune font-display text-[color:var(--moon-rose)]">
                    <span>Capabilities · 神迹</span>
                  </span>
                </Reveal>
                <Reveal variant="left" delay={120}>
                  <h2 className="mt-6 font-serif-cn text-4xl sm:text-6xl font-semibold leading-tight text-gradient-moon">
                    月之六相
                  </h2>
                </Reveal>
                <Reveal variant="left" delay={220}>
                  <p className="mt-6 max-w-md text-[color:var(--ink-soft)] leading-relaxed">
                    Cresselia 在六个月相中各持一柄法器：从脚本到投放，AI
                    接管整条工作流，让每一支视频都出生于梦，成就于真实。
                  </p>
                </Reveal>
              </div>
              <Reveal variant="right" delay={200}>
                <p className="text-sm tracking-[0.3em] font-display text-[color:var(--ink-muted)]">
                  SIX PHASES · ONE DREAM
                </p>
              </Reveal>
            </div>

            <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {CAPABILITIES.map((c, i) => (
                <Reveal
                  key={c.title}
                  delay={i * 90}
                  variant={i % 2 === 0 ? "up" : "scale"}
                >
                  <SpotlightCard>
                    <div className="flex items-start justify-between">
                      <div
                        className="flex h-12 w-12 items-center justify-center rounded-xl text-white"
                        style={{
                          background:
                            "linear-gradient(135deg, rgba(255,142,199,0.25), rgba(122,216,255,0.18))",
                          border: "1px solid rgba(255,255,255,0.12)",
                        }}
                      >
                        <svg
                          width="22"
                          height="22"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden
                        >
                          {c.icon}
                        </svg>
                      </div>
                      <span className="font-display text-xs tracking-[0.3em] text-[color:var(--ink-muted)]">
                        {c.en}
                      </span>
                    </div>
                    <h3 className="mt-6 font-serif-cn text-2xl font-semibold text-white">
                      {c.title}
                    </h3>
                    <p className="mt-3 text-[color:var(--ink-soft)] leading-relaxed">
                      {c.desc}
                    </p>
                  </SpotlightCard>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ============ Ritual / Workflow ============ */}
        <section id="ritual" className="relative px-6 py-28 sm:py-40">
          <div className="mx-auto max-w-6xl">
            <Reveal>
              <div className="flex justify-center">
                <span className="divider-rune font-display text-[color:var(--moon-violet)]">
                  <span>Ritual · 梦境仪轨</span>
                </span>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <h2 className="mt-8 text-center font-serif-cn text-4xl sm:text-6xl font-semibold leading-tight text-gradient-aurora">
                三步入梦
              </h2>
            </Reveal>
            <Reveal delay={220}>
              <p className="mx-auto mt-6 max-w-2xl text-center text-[color:var(--ink-soft)] leading-relaxed">
                无需导演、无需摄影棚。像许下一个愿望那样简单，让 Cresselia
                在新月之下为你织梦成片。
              </p>
            </Reveal>

            <div className="relative mt-20">
              <div
                aria-hidden
                className="hidden lg:block absolute left-0 right-0 top-16 h-px bg-gradient-to-r from-transparent via-[color:var(--moon-rose)]/40 to-transparent"
              />
              <div className="grid gap-8 lg:grid-cols-3">
                {STEPS.map((s, i) => (
                  <Reveal key={s.idx} delay={i * 180}>
                    <div className="relative text-center lg:text-left">
                      <div className="inline-flex h-32 w-32 items-center justify-center rounded-full border border-white/10 bg-gradient-to-br from-white/5 to-transparent backdrop-blur relative">
                        <span className="font-display text-5xl text-gradient-moon">
                          {s.idx}
                        </span>
                        <span
                          aria-hidden
                          className="absolute inset-0 rounded-full border border-[color:var(--moon-rose)]/30 animate-[halo-pulse_5s_ease-in-out_infinite]"
                        />
                      </div>
                      <p className="mt-6 font-display text-xs tracking-[0.4em] text-[color:var(--moon-cyan)]">
                        {s.en}
                      </p>
                      <h3 className="mt-2 font-serif-cn text-3xl font-semibold text-white">
                        {s.title}
                      </h3>
                      <p className="mt-4 text-[color:var(--ink-soft)] leading-relaxed max-w-xs mx-auto lg:mx-0">
                        {s.desc}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ============ Stats ============ */}
        <section className="relative px-6 py-20">
          <div className="mx-auto max-w-5xl">
            <Reveal>
              <div className="glass rounded-[28px] px-8 py-12 grid grid-cols-1 sm:grid-cols-3 gap-10 sm:divide-x sm:divide-white/10 text-center">
                {STATS.map((s, i) => (
                  <div key={s.label} className="px-4" style={{
                    transitionDelay: `${i * 100}ms`,
                  }}>
                    <div className="stat-number font-display text-5xl sm:text-6xl">
                      {s.num}
                    </div>
                    <div className="mt-3 text-sm tracking-[0.3em] font-serif-cn text-[color:var(--ink-muted)]">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ============ Legends / Showcase ============ */}
        <section id="legends" className="relative px-6 py-28 sm:py-40">
          <div className="mx-auto max-w-6xl">
            <Reveal>
              <div className="flex justify-center">
                <span className="divider-rune font-display text-[color:var(--moon-gold)]">
                  <span>Legends · 传世之作</span>
                </span>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <h2 className="mt-8 text-center font-serif-cn text-4xl sm:text-6xl font-semibold leading-tight text-gradient-moon">
                与品牌共梦
              </h2>
            </Reveal>

            <div className="mt-20 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {LEGENDS.map((l, i) => (
                <Reveal key={l.title} delay={i * 140} variant="scale">
                  <SpotlightCard className="!p-0 overflow-hidden group">
                    <div
                      className={`relative aspect-[4/5] w-full overflow-hidden bg-gradient-to-br ${l.hue}`}
                    >
                      <div className="absolute inset-0 mix-blend-overlay opacity-60 grid-noise" />
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.35),transparent_60%)]" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                      <div className="absolute left-6 top-6 font-display text-xs tracking-[0.4em] text-white/90">
                        {l.tag}
                      </div>

                      <div className="absolute left-6 right-6 bottom-6">
                        <h3 className="font-serif-cn text-2xl font-semibold text-white">
                          {l.title}
                        </h3>
                        <p className="mt-2 text-sm text-white/80 leading-relaxed">
                          {l.desc}
                        </p>
                        <div className="mt-4 inline-flex items-center gap-2 text-xs tracking-[0.3em] text-white/90 opacity-0 translate-x-[-6px] transition-all duration-500 group-hover:opacity-100 group-hover:translate-x-0">
                          VIEW DREAM
                          <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden>
                            <path
                              d="M5 12h14M13 5l7 7-7 7"
                              stroke="currentColor"
                              strokeWidth="1.8"
                              fill="none"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                      </div>

                      <div className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-full bg-white/15 backdrop-blur border border-white/20 text-white">
                        <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden>
                          <path d="M8 5v14l11-7L8 5z" fill="currentColor" />
                        </svg>
                      </div>
                    </div>
                  </SpotlightCard>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ============ Final CTA ============ */}
        <section id="awaken" className="relative px-6 py-28 sm:py-40">
          <div className="mx-auto max-w-4xl">
            <Reveal>
              <div className="relative glass rounded-[36px] overflow-hidden px-8 py-20 sm:py-28 text-center">
                <div
                  aria-hidden
                  className="pointer-events-none absolute -top-24 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(255,142,199,0.35), rgba(183,143,255,0.18) 40%, transparent 70%)",
                    filter: "blur(20px)",
                  }}
                />
                <span className="divider-rune font-display text-[color:var(--moon-rose)] relative">
                  <span>Awaken · 觉醒</span>
                </span>
                <h2 className="relative mt-8 font-serif-cn text-4xl sm:text-6xl font-semibold leading-tight text-gradient-moon">
                  让月光，照进你的品牌。
                </h2>
                <p className="relative mx-auto mt-8 max-w-xl text-[color:var(--ink-soft)] leading-relaxed">
                  留下一个愿望，Cresselia 将在下一个新月，为你织出第一支好梦成片。
                </p>
                <form
                  className="relative mx-auto mt-10 flex max-w-md flex-col sm:flex-row gap-3"
                >
                  <input
                    type="email"
                    placeholder="你的邮箱，像许愿一般留下"
                    className="flex-1 rounded-full bg-white/5 border border-white/10 px-5 py-3 text-sm text-white placeholder:text-[color:var(--ink-muted)] outline-none focus:border-[color:var(--moon-rose)]/60 focus:bg-white/10 transition"
                    required
                  />
                  <button type="submit" className="btn-moon !px-6">
                    召唤新月
                  </button>
                </form>
                <p className="relative mt-4 text-xs tracking-[0.3em] text-[color:var(--ink-muted)]">
                  NO SPAM · ONLY DREAMS
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ============ Footer ============ */}
        <footer className="relative border-t border-white/5 px-6 py-14 text-sm text-[color:var(--ink-muted)]">
          <div className="mx-auto flex max-w-6xl flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <svg
                viewBox="0 0 24 24"
                className="h-6 w-6 text-[color:var(--moon-rose)]"
                aria-hidden
              >
                <path
                  d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z"
                  fill="currentColor"
                />
              </svg>
              <span className="font-display tracking-[0.3em] text-white/80">
                CRESSELIA
              </span>
              <span className="font-serif-cn text-xs tracking-[0.4em]">
                新 月 织 梦
              </span>
            </div>
            <div className="flex items-center gap-6 font-serif-cn text-xs tracking-[0.3em]">
              <a href="#manifesto" className="hover:text-white transition">
                神谕
              </a>
              <a href="#capabilities" className="hover:text-white transition">
                神迹
              </a>
              <a href="#ritual" className="hover:text-white transition">
                仪轨
              </a>
              <a href="#legends" className="hover:text-white transition">
                传世
              </a>
            </div>
            <div className="text-xs tracking-[0.3em] font-display">
              © {new Date().getFullYear()} CRESSELIA
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
