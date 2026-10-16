"use client";

import { useState } from "react";
import {
  FileSpreadsheet,
  FileText,
  ImageIcon,
  Info,
  SendHorizontal,
  Sparkles,
  X,
  type LucideIcon,
} from "lucide-react";

type Kind = "pdf" | "image" | "excel";

const KINDS: Record<Kind, { label: string; accept: string; icon: LucideIcon; ext: RegExp }> = {
  pdf: { label: "PDF", accept: ".pdf,application/pdf", icon: FileText, ext: /\.pdf$/i },
  image: { label: "عکس فاکتور", accept: "image/*", icon: ImageIcon, ext: /\.(png|jpe?g|webp|heic)$/i },
  excel: { label: "اکسل", accept: ".xlsx,.xls,.csv", icon: FileSpreadsheet, ext: /\.(xlsx|xls|csv)$/i },
};

const MAX_MB = 10;

const SUGGESTIONS = [
  "این ماه چقدر فروش داشتم؟",
  "بزرگ‌ترین هزینه‌ام چیست؟",
  "چک‌های این هفته را نشان بده",
];

type Attachment = { id: string; name: string; kind: Kind };
type Message = { id: number; role: "user" | "system"; text: string; files: Attachment[] };

export default function AssistantComposer() {
  const [text, setText] = useState("");
  const [files, setFiles] = useState<Attachment[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [error, setError] = useState("");

  function addFiles(kind: Kind, list: FileList | null) {
    if (!list) return;
    setError("");
    const next: Attachment[] = [];
    for (const f of Array.from(list)) {
      const k = KINDS[kind];
      const okType = k.ext.test(f.name) || (kind === "image" && f.type.startsWith("image/"));
      if (!okType) {
        setError(`«${f.name}» با نوع انتخاب‌شده (${k.label}) هم‌خوانی ندارد.`);
        continue;
      }
      if (f.size > MAX_MB * 1024 * 1024) {
        setError(`«${f.name}» بزرگ‌تر از ${MAX_MB} مگابایت است.`);
        continue;
      }
      // TODO: وقتی API آماده شد، خود File رو اینجا نگه دار و موقع ارسال با FormData بفرست
      next.push({ id: crypto.randomUUID(), name: f.name, kind });
    }
    setFiles((prev) => [...prev, ...next].slice(0, 5));
  }

  function send() {
    const t = text.trim();
    if (!t && files.length === 0) return;
    setMessages((prev) => [
      ...prev,
      { id: prev.length * 2, role: "user", text: t, files },
      {
        id: prev.length * 2 + 1,
        role: "system",
        text: "پیام شما دریافت شد، ولی دستیار هوشمند هنوز به سرویس متصل نیست. بعد از اتصال، پاسخ‌ها اینجا نمایش داده می‌شوند.",
        files: [],
      },
    ]);
    setText("");
    setFiles([]);
    setError("");
  }

  return (
    <section className="glass flex flex-col rounded-2xl">
      {/* پیام‌ها */}
      <div className="min-h-[200px] flex-1 space-y-3 p-4 sm:p-5">
        {messages.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center gap-4 py-6 text-center">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gold/15 text-gold">
              <Sparkles size={20} />
            </span>
            <p className="max-w-sm text-sm leading-7 text-muted">
              از وضعیت مالی‌تان بپرسید یا فاکتور، فایل PDF و اکسل بفرستید تا دستیار بررسی کند.
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setText(s)}
                  className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-muted transition-colors hover:border-gold/30 hover:text-gold">
                  {s}
                </button>
              ))}
            </div>
          </div>
        ) : (
          messages.map((m) =>
            m.role === "user" ? (
              <div key={m.id} className="flex justify-start">
                <div className="max-w-[85%] rounded-2xl rounded-tr-sm bg-forest/50 px-4 py-2.5 text-sm leading-7">
                  {m.text && <p>{m.text}</p>}
                  {m.files.map((f) => {
                    const Icon = KINDS[f.kind].icon;
                    return (
                      <p key={f.id} className="mt-1 flex items-center gap-2 text-xs text-fg/70">
                        <Icon size={14} /> {f.name}
                      </p>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div key={m.id} className="flex items-start gap-2 text-xs leading-6 text-muted">
                <Info size={14} className="mt-1 shrink-0 text-gold" />
                {m.text}
              </div>
            ),
          )
        )}
      </div>

      {/* ورودی */}
      <div className="border-t border-white/10 p-3 sm:p-4">
        {files.length > 0 && (
          <ul className="mb-3 flex flex-wrap gap-2">
            {files.map((f) => {
              const Icon = KINDS[f.kind].icon;
              return (
                <li
                  key={f.id}
                  className="flex max-w-full items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] py-1 pl-1.5 pr-2.5 text-xs">
                  <Icon size={14} className="shrink-0 text-gold" />
                  <span className="max-w-[160px] truncate">{f.name}</span>
                  <button
                    type="button"
                    aria-label="حذف فایل"
                    onClick={() => setFiles((p) => p.filter((x) => x.id !== f.id))}
                    className="rounded p-0.5 text-muted hover:bg-white/10 hover:text-fg">
                    <X size={12} />
                  </button>
                </li>
              );
            })}
          </ul>
        )}

        <div className="flex items-end gap-2">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                send();
              }
            }}
            rows={2}
            maxLength={1000}
            placeholder="پیام‌تان را بنویسید..."
            className="min-h-[44px] flex-1 resize-none rounded-xl border border-white/10 bg-black/30 px-3.5 py-2.5 text-sm text-fg outline-none transition placeholder:text-muted/50 focus:border-gold/50 focus:ring-4 focus:ring-gold/10"
          />
          <button
            type="button"
            onClick={send}
            aria-label="ارسال"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-b from-gold-light to-gold text-black transition hover:brightness-105">
            <SendHorizontal size={18} className="rotate-180" />
          </button>
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-2">
          {(Object.keys(KINDS) as Kind[]).map((kind) => {
            const { label, accept, icon: Icon } = KINDS[kind];
            return (
              <label
                key={kind}
                className="flex h-8 cursor-pointer items-center gap-1.5 rounded-lg border border-white/10 px-2.5 text-xs text-fg/70 transition-colors focus-within:border-gold/50 hover:border-gold/30 hover:text-gold">
                <input
                  type="file"
                  accept={accept}
                  multiple
                  className="sr-only"
                  onChange={(e) => {
                    addFiles(kind, e.target.files);
                    e.target.value = "";
                  }}
                />
                <Icon size={14} />
                {label}
              </label>
            );
          })}
          <span className="text-[11px] text-muted/70">حداکثر ۵ فایل، هر کدام تا ۱۰ مگابایت</span>
        </div>

        {error && <p className="mt-2 text-xs text-danger">{error}</p>}
      </div>
    </section>
  );
}