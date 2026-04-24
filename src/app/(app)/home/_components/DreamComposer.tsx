"use client";

import {
  useCallback,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
  type KeyboardEvent,
} from "react";

import { launchDreamStar } from "./dreamStarLauncher";

export function DreamComposer({
  onSubmit,
}: {
  onSubmit: (prompt: string, files: File[]) => void;
}) {
  const [prompt, setPrompt] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [focused, setFocused] = useState(false);
  const shellRef = useRef<HTMLDivElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const canSend = Boolean(prompt.trim()) || files.length > 0;
  const isTyping = prompt.length > 0 || files.length > 0;

  const resizeTextarea = useCallback(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    const max = 140;
    el.style.height = `${Math.min(el.scrollHeight, max)}px`;
  }, []);

  const onFilesChange = (e: ChangeEvent<HTMLInputElement>) => {
    const list = e.target.files;
    if (!list?.length) return;
    setFiles((prev) => [...prev, ...Array.from(list)]);
    e.target.value = "";
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e?: FormEvent) => {
    e?.preventDefault();
    if (!canSend) return;
    void launchDreamStar({
      fromEl: shellRef.current,
      historyAnchorId: "history",
    });
    onSubmit(prompt, files);
    setPrompt("");
    setFiles([]);
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="dream-composer pointer-events-auto absolute bottom-[16%] left-1/2 z-20 w-[min(94vw,820px)] -translate-x-1/2">
      {files.length > 0 ? (
        <div className="mb-3 flex flex-wrap gap-2 px-1">
          {files.map((f, i) => (
            <span
              key={`${f.name}-${i}`}
              className="dream-upload-chip inline-flex max-w-[200px] items-center gap-2 rounded-full border border-white/12 bg-white/[0.06] px-3 py-1.5 text-xs text-[color:var(--ink-soft)]"
            >
              <span className="truncate">{f.name}</span>
              <button
                type="button"
                onClick={() => removeFile(i)}
                className="shrink-0 rounded-full p-0.5 text-[color:var(--ink-muted)] hover:bg-white/10 hover:text-white"
                aria-label={`移除 ${f.name}`}
              >
                ×
              </button>
            </span>
          ))}
        </div>
      ) : null}

      <div className="dream-composer-aura-wrap relative overflow-visible">
        <div
          ref={shellRef}
          className="dream-composer-aura rounded-full"
          data-active={focused || isTyping}
        >
          <form
            onSubmit={handleSubmit}
            onFocusCapture={() => setFocused(true)}
            onBlurCapture={(e) => {
              const next = e.relatedTarget;
              if (!(next instanceof Node) || !e.currentTarget.contains(next)) {
                setFocused(false);
              }
            }}
            className="dream-composer-shell glass relative flex items-end gap-2 rounded-full border border-white/10 px-2 py-2 pl-3 shadow-[0_0_0_1px_rgba(255,255,255,0.04)_inset]"
          >
            <label className="dream-composer-plus flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-full border border-white/12 bg-white/[0.05] text-lg text-[color:var(--ink-soft)] transition hover:border-[color:var(--moon-rose)]/35 hover:bg-white/[0.08] hover:text-white">
              <span className="sr-only">上传图片或参考视频</span>
              <span aria-hidden>+</span>
              <input
                type="file"
                className="sr-only"
                accept="image/*,video/*"
                multiple
                onChange={onFilesChange}
              />
            </label>

            <textarea
              ref={textareaRef}
              rows={1}
              value={prompt}
              onChange={(e) => {
                setPrompt(e.target.value);
                resizeTextarea();
              }}
              onInput={resizeTextarea}
              onKeyDown={onKeyDown}
              placeholder="向月亮许下一个愿望…"
              className="min-h-[44px] max-h-[140px] flex-1 resize-none bg-transparent py-3 pr-2 text-sm leading-relaxed text-[color:var(--ink)] outline-none placeholder:text-[color:var(--ink-muted)]"
            />

            <button
              type="submit"
              disabled={!canSend}
              className={[
                "dream-composer-send flex h-11 w-11 shrink-0 items-center justify-center rounded-full font-mono text-base transition",
                canSend
                  ? "btn-moon !p-0 !shadow-[0_8px_28px_-8px_rgba(255,142,199,0.55)]"
                  : "cursor-not-allowed border border-white/10 bg-white/[0.04] text-[color:var(--ink-muted)] opacity-60",
              ].join(" ")}
              title="发送"
              aria-label="发送"
            >
              ↵
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
