import AmbientBackground from "@/components/ui/AmbientBackground";

type Props = {
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
  children?: React.ReactNode;
};

/** سربرگ مشترک صفحه‌های داخلی (دیدگاه فینوا، تماس با ما، ...) */
export default function PageHero({ eyebrow, title, description, children }: Props) {
  return (
    <section className="relative isolate overflow-hidden border-b border-border">
      <AmbientBackground />
      <div className="mx-auto max-w-6xl px-4 pb-14 pt-36 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 px-3.5 py-1.5 text-xs text-brand">
          <span className="h-1.5 w-1.5 rounded-full bg-brand" />
          {eyebrow}
        </span>
        <h1 className="mx-auto mt-6 max-w-3xl text-3xl font-bold leading-[1.7] sm:text-4xl">
          {title}
        </h1>
        {description && (
          <p className="mx-auto mt-5 max-w-2xl text-[15px] leading-8 text-muted sm:text-base">
            {description}
          </p>
        )}
        {children}
      </div>
    </section>
  );
}