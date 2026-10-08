export default function AmbientBackground({ fixed = false }: { fixed?: boolean }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none ${
        fixed ? "fixed" : "absolute"
      } inset-0 -z-10 overflow-hidden bg-ambient`}
    >
      <div className="absolute inset-0 [background-image:radial-gradient(rgba(255,255,255,0.07)_1px,transparent_1px)] [background-size:26px_26px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_72%)]" />
      <div className="absolute -top-28 right-[12%] h-80 w-80 rounded-full bg-forest/50 blur-[100px]" />
      <div className="absolute -bottom-28 left-[8%] h-72 w-72 rounded-full bg-gold/10 blur-[110px]" />
    </div>
  );
}