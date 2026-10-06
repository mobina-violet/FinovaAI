import Image from "next/image";

/** مسیر لوگو داخل پوشه public. اگه هنوز نداری، null بذار تا لوگوی SVG موقت نشون داده بشه */
const LOGO_SRC: string | null = "/images/logo.png"; // یا "/logo.svg"

/** ابعاد واقعی فایل لوگوت (پیکسل) */
const LOGO_W = 480;
const LOGO_H = 144;

type Props = {
  size?: "md" | "lg";
};

export default function Logo({ size = "md" }: Props) {
  const big = size === "lg";

  if (LOGO_SRC) {
    return (
      <Image
        src={LOGO_SRC}
        alt="Finova AI"
        width={LOGO_W}
        height={LOGO_H}
        priority
        className={big ? "h-12 w-auto" : "h-9 w-auto md:h-10"}
      />
    );
  }

  return (
    <div dir="ltr" className="flex items-center gap-2">
      <svg viewBox="0 0 40 40" className={big ? "h-10 w-10" : "h-8 w-8"} fill="none" aria-hidden>
        <path d="M6 34 L18 6 L18 22 Z" fill="var(--color-brand)" />
        <path d="M16 34 L28 6 L34 6 L34 34 L28 34 L28 20 Z" fill="var(--color-brand-dark)" />
      </svg>
      <div className="leading-none">
        <div className={`font-bold ${big ? "text-2xl" : "text-xl"}`}>
          Finova <span className="text-brand">AI</span>
        </div>
        <div className="mt-1 text-[9px] text-gold">Smart Finance. Smarter Decisions.</div>
      </div>
    </div>
  );
}