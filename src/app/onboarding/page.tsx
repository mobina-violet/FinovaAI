import Image from "next/image";
import { redirect } from "next/navigation";
import AmbientBackground from "@/components/ui/AmbientBackground";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/business";
import OnboardingForm from "./OnboardingForm";

export const metadata = { title: "شروع کار | Finova AI" };

export default async function OnboardingPage() {
  const user = await requireUser();
  const existing = await prisma.business.findFirst({
    where: { ownerId: user.id },
    select: { id: true },
  });
  if (existing) redirect("/dashboard");

  return (
    <main className="relative isolate flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-10">
      <AmbientBackground />

      <div className="relative w-full max-w-[460px]">
        <div className="mb-8 flex justify-center">
          <Image
            src="/logo.png"
            alt="Finova AI"
            width={480}
            height={144}
            priority
            className="h-10 w-auto"
          />
        </div>

        <div className="glass relative rounded-3xl p-8 sm:p-9">
          <div className="absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
          <h1 className="text-xl font-semibold">چند اطلاعات ساده</h1>
          <p className="mt-2 text-sm leading-7 text-muted">
            برای شروع، کمی درباره‌ی خودتان و کسب‌وکارتان بگویید.
          </p>
          <OnboardingForm />
        </div>
      </div>
    </main>
  );
}