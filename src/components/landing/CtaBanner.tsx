import { Phone } from "lucide-react";

export default function CtaBanner() {
  return (
    <section id="contact" className="py-16">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex flex-col items-center gap-6 rounded-2xl border border-border bg-gradient-to-l from-brand/10 to-surface p-8 md:flex-row md:justify-between">
          <div className="text-center md:text-start">
            <p className="text-xs text-gold">مشاوره رایگان</p>
            <h3 className="mt-2 text-xl font-bold">
              برای شروع، همین حالا مشاوره بگیرید
            </h3>
            <p className="mt-2 text-sm leading-7 text-muted">
              اگر سوالی دارید یا نیاز به راهنمایی بیشتر دارید، تیم پشتیبانی ما
              همیشه آماده کمک به شماست.
            </p>
          </div>

          <a
            href="tel:091213145"
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-gold px-7 py-3 font-semibold text-bg transition hover:brightness-110">
            تماس با ما
            <Phone size={18} />
          </a>
        </div>
      </div>
    </section>
  );
}
