"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    q: "چگونه می‌توانم حساب خود را ایجاد کنم؟",
    a: "روی دکمه «ورود / ثبت‌نام» بزنید، شماره موبایل‌تان را وارد کنید و کد تأیید را بزنید. حساب شما در چند ثانیه ساخته می‌شود.",
  },
  {
    q: "آیا امکان اتصال به بانک‌ها وجود دارد؟",
    a: "اتصال به سیستم‌های بانکی و حسابداری در نقشه راه ماست و به‌زودی اضافه می‌شود. فعلاً می‌توانید اطلاعات را به‌صورت دستی یا با زبان طبیعی به دستیار بگویید.",
  },
  {
    q: "آیا اطلاعات من در امنیت کامل قرار دارند؟",
    a: "بله. اطلاعات شما رمزگذاری و فقط برای حساب خودتان قابل دسترسی است و با هیچ شخص ثالثی به اشتراک گذاشته نمی‌شود.",
  },
  {
    q: "هزینه استفاده از Finova AI چقدر است؟",
    a: "نسخه‌ی شروع رایگان است و برای امکانات پیشرفته‌تر پلن‌های اشتراکی در نظر گرفته شده است. جزئیات به‌زودی اعلام می‌شود.",
  },
];

export default function Faq() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="border-b border-border py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center">
          <p className="text-xs text-brand">سوالات متداول</p>
          <h2 className="mt-3 text-3xl font-bold">پاسخ به سوالات شما</h2>
        </div>

        <div className="mt-10 grid items-start gap-4 md:grid-cols-2">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q} className="rounded-xl border border-border bg-surface">
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 p-5 text-start text-sm font-medium"
                >
                  {f.q}
                  {isOpen ? (
                    <Minus size={16} className="shrink-0 text-gold" />
                  ) : (
                    <Plus size={16} className="shrink-0 text-muted" />
                  )}
                </button>
                {isOpen && (
                  <p className="px-5 pb-5 text-sm leading-7 text-muted">{f.a}</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}